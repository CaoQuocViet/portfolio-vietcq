#!/usr/bin/env bash
# deploy.sh — build both images locally, ship them to the home box, recreate
# containers there. The box never builds and never receives source code: HEAD
# lives on the dev machine and on GitHub, never on the server.
#
# Usage:
#   ./deploy.sh                    # build + ship both
#   ./deploy.sh build [client|server|both]
#   ./deploy.sh ship  [client|server|both]
#
# The client fetches the API from the browser (react-query hooks), so nothing is
# prerendered against a live backend — the box may stay down while building.
#
# Shipping the server replaces the binary that owns the live database, and the
# checked-in server/blog/*.go has drifted from the binary currently running (built
# 2026-02-21 from a branch that only ever existed on the box, now kept as the
# box-snapshot-260716 branch). PocketBase applies collection changes on start, so
# a server ship can migrate real data: back pb_data up and read the drift first.
# That is why the target is selectable — 'ship client' is the routine, safe path.
set -euo pipefail
cd "$(dirname "$0")"

# Box = home server, cùng LAN với máy dev. KHÔNG ssh qua IP nhà mạng (đổi liên tục);
# luôn LAN 192.168.1.200:22 + key.
BOX="vietcq@192.168.1.200"
SSH_PORT=22
SSH_KEY="${SSH_KEY:-$HOME/.ssh/id_ed25519}"
SSH=(ssh -p "${SSH_PORT}" -i "${SSH_KEY}" "${BOX}")

# Địa chỉ TRÌNH DUYỆT của khách gọi tới, nên phải là domain công khai qua Cloudflare
# Tunnel — không phải http://server:8090 (tên nội bộ, máy khách không phân giải được).
API_URL="${NEXT_PUBLIC_API_URL:-https://api.vietcq.com}"
DATE_TAG=$(date +%Y%m%d-%H%M)
STEP="${1:-all}"
TARGET="${2:-both}"
wants() { [ "$TARGET" = both ] || [ "$TARGET" = "$1" ]; }

build_server() {
  echo "==> Building portfolio-server (:latest, :${DATE_TAG})"
  # Cần server/ui/dist (PocketBase //go:embed all:dist). Thư mục CÓ trong git nhưng đã
  # từng khuyết ở cây làm việc → build fail "pattern all:dist: no matching files found".
  # Chữa: git restore server/ui/
  docker build -t portfolio-server:latest -t "portfolio-server:${DATE_TAG}" server/
}

build_client() {
  echo "==> Building portfolio-client (:latest, :${DATE_TAG}) — API baked: ${API_URL}"
  docker build \
    --build-arg NEXT_PUBLIC_API_URL="${API_URL}" \
    -t portfolio-client:latest -t "portfolio-client:${DATE_TAG}" \
    client/

  # NEXT_PUBLIC_* nhúng thẳng vào bundle lúc build, không đọc lúc chạy. Bug cũ: compose
  # khai nhầm hẳn tên biến ở `environment:` ⇒ bundle âm thầm rơi về localhost:8090 ⇒
  # blog/gallery/projects chết 5 tháng trong khi trang chủ vẫn trả 200 nên không ai thấy.
  # Soi bundle ngay sau build để lỗi đó không bao giờ ra tới box lần nữa.
  echo "==> Verifying ${API_URL} is baked into the client bundle"
  docker run --rm --entrypoint sh portfolio-client:latest -c \
    "grep -rq '${API_URL}' .next/static" \
    || { echo "ERROR: ${API_URL} khong co trong bundle — build-arg khong toi duoc next build"; exit 1; }
}

# Trần tài nguyên ở hai hàm dưới: box (16G/4 luồng) DÙNG CHUNG với artemis/howelx/sportis
# nên một container chạy loạn không được bóp chết hàng xóm. Trần đặt cao hơn mức thật rất
# nhiều (đo lúc viết: client 42M, server 68M, cả hai 0% CPU) — là trần chống rò, không
# phải chỗ dự trữ. --init để orphan bị tini thu, không lơ lửng dưới PID 1 của app: con
# miner hồi tháng 7 đúng kiểu orphan đó, làm việc truy vết rối hẳn lên.
ship_server() {
  echo "==> Shipping portfolio-server (save | gzip | ssh | gunzip | load)"
  docker save portfolio-server:latest | gzip | "${SSH[@]}" 'gunzip | docker load'
  "${SSH[@]}" bash -s <<'REMOTE'
set -euo pipefail
# pb_data = TOÀN BỘ nội dung blog/gallery/projects. Volume có sẵn từ thời compose (giữ
# nguyên tên portfolio_pb_data). Nếu tên sai, docker LẶNG LẼ tạo volume rỗng và PocketBase
# dựng DB trắng — site vẫn 200 nhưng sạch nội dung. Chặn thẳng thay vì để nó tự tạo.
docker volume inspect portfolio_pb_data >/dev/null 2>&1 \
  || { echo "ERROR: volume portfolio_pb_data khong ton tai — dung lai, dung de PocketBase tao DB rong"; exit 1; }
docker network inspect portfolio-net >/dev/null 2>&1 || docker network create portfolio-net

echo "--> portfolio-server"
docker rm -f portfolio-server 2>/dev/null || true
docker run -d --name portfolio-server --network portfolio-net --init \
  --restart unless-stopped \
  -v portfolio_pb_data:/app/pb_data \
  --memory=512m --cpus=1 \
  --log-opt max-size=10m --log-opt max-file=3 \
  --health-cmd='wget -qO- http://localhost:8090/api/health || exit 1' \
  --health-interval=30s --health-timeout=5s --health-retries=3 --health-start-period=10s \
  -p 8090:8090 \
  portfolio-server:latest

for i in $(seq 1 20); do
  ST=$(docker inspect -f '{{.State.Health.Status}}' portfolio-server 2>/dev/null || echo starting)
  [ "$ST" = healthy ] && break
  sleep 3
done
docker ps --filter name=portfolio-server --format '{{.Names}}\t{{.Status}}'
REMOTE
}

ship_client() {
  echo "==> Shipping portfolio-client (save | gzip | ssh | gunzip | load)"
  docker save portfolio-client:latest | gzip | "${SSH[@]}" 'gunzip | docker load'
  "${SSH[@]}" bash -s <<'REMOTE'
set -euo pipefail
docker network inspect portfolio-net >/dev/null 2>&1 || docker network create portfolio-net

echo "--> portfolio-client"
docker rm -f portfolio-client 2>/dev/null || true
docker run -d --name portfolio-client --network portfolio-net --init \
  -e NODE_ENV=production \
  --restart unless-stopped \
  --memory=1g --cpus=2 \
  --log-opt max-size=10m --log-opt max-file=3 \
  -p 5678:5678 \
  portfolio-client:latest
docker ps --filter name=portfolio-client --format '{{.Names}}\t{{.Status}}'
REMOTE
}

verify() {
  echo "==> Verifying from outside (qua Cloudflare Tunnel)"
  curl -s -m 15 -o /dev/null -w "api  /api/health : %{http_code} (%{time_total}s)\n" https://api.vietcq.com/api/health
  curl -s -m 20 -o /dev/null -w "site /           : %{http_code} (%{time_total}s)\n" https://vietcq.com
  curl -s -m 20 -o /dev/null -w "site /blog       : %{http_code} (%{time_total}s)\n" https://vietcq.com/blog

  echo "==> Done. Rollback: docker tag portfolio-client:<old-date-tag> portfolio-client:latest && ./deploy.sh ship client"
}

build() { wants server && build_server; wants client && build_client; :; }
ship()  { wants server && ship_server;  wants client && ship_client;  verify; }

case "$STEP" in
  build) build ;;
  ship)  ship ;;
  all)   build; ship ;;
  *) echo "usage: $0 [build|ship|all] [client|server|both]"; exit 1 ;;
esac

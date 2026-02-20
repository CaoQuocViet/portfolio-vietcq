# syntax=docker/dockerfile:1
FROM golang:1.24-alpine AS builder
RUN apk add --no-cache gcc musl-dev
WORKDIR /app

COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod go mod download

COPY . .
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=1 go build \
    -ldflags='-w -s' \
    -trimpath \
    -o pb ./examples/base

FROM alpine:3.21
RUN apk add --no-cache ca-certificates tzdata
ENV TZ=Asia/Ho_Chi_Minh
WORKDIR /app
COPY --from=builder /app/pb .
RUN mkdir -p /app/pb_data
EXPOSE 8090
CMD ["./pb", "serve", "--http=0.0.0.0:8090"]

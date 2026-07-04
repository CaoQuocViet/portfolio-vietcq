/**
 * Host của API (PocketBase) theo môi trường — ảnh gallery/blog nằm trên host này
 * nên trình tối ưu ảnh phải được phép fetch từ đó. Suy ra từ env thay vì hardcode
 * để dev (localhost:8090) và prod (api.vietcq.com) dùng chung một chỗ khai báo.
 */
const API_URL = new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8090")

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    experimental: {
        // Caching all page.jsx files on the client for 5 minutes.
        // Resulting in immediate navigation and no loading time.
        staleTimes: {
            dynamic: 300,
            static: 300
        },
        // Optimize icon imports for better tree-shaking
        optimizePackageImports: ['react-icons', 'lucide-react', '@heroicons/react'],
    },
    env: {
        /** GitHub username loaded in build time. */
        GITHUB_USERNAME: process.env.GITHUB_USERNAME || 'caoquocviet',
    },
    images: {
        // KHÔNG dùng hostname '**'. Wildcard biến /_next/image thành proxy ảnh mở:
        // bất kỳ ai cũng ép server tải ảnh từ host tuỳ ý (tốn băng thông, phục vụ
        // nội dung lạ dưới tên miền của mình). Chỉ khai đúng host thật sự dùng.
        remotePatterns: [
            { protocol: 'https', hostname: '**.githubusercontent.com' },
            { protocol: 'https', hostname: '**.github.com' },
            { protocol: 'http', hostname: 'localhost' },
            {
                protocol: API_URL.protocol.replace(':', ''),
                hostname: API_URL.hostname,
                ...(API_URL.port ? { port: API_URL.port } : {}),
            },
        ],
    },
};

export default (nextConfig);

# Contributing to Portfolio Vietcq

Thanks for taking the time to improve this project!

This document describes how to prepare a PR for a change in the main repository.

- [Prerequisites](#prerequisites)
- [Making changes in the Client](#making-changes-in-the-client)
- [Making changes in the Server](#making-changes-in-the-server)

## Prerequisites

- Node.js 18+ and pnpm 10+ (for client changes)
- Go 1.24+ (for server changes)
- Docker and docker-compose (optional, for containerized development)

If you haven't already, you can fork the main repository and clone your fork so that you can work locally:

```
git clone https://github.com/your_username/portfolio-vietcq.git
```

> [!IMPORTANT]
> It is recommended to create a new branch from `dev` for each of your bugfixes and features.
> This is required if you are planning to submit multiple PRs in order to keep the changes separate for review until they eventually get merged.

## Making changes in the Client

The client is a Next.js 15 application located in the `client/` directory.

To start the development server:

1. Navigate to `client/`
2. Run `pnpm install` to install dependencies
3. Run `pnpm dev` to start the dev server at `http://localhost:5678`

> [!NOTE]
> By default, the client expects the PocketBase server to be running at `http://localhost:8090`. You can change this in your environment configuration.

**Before making a PR:**

- Ensure the production build passes without errors:

  ```sh
  pnpm build
  ```

- Use CSS custom properties (`var(--token)`) instead of hardcoded Tailwind color classes. All design tokens are defined in `global.css`.

- Keep files under 200 lines. Split large components into focused modules.

- Use kebab-case for new file names.

## Making changes in the Server

The server is a PocketBase application (Go) located in the `server/` directory.

To run the server:

1. Navigate to `server/`
2. Build and run:
   ```sh
   go build -o pb ./examples/base
   ./pb serve
   ```

This will start the PocketBase server at `http://localhost:8090`.

**Before making a PR:**

- Run the tests:

  ```sh
  go test ./...
  ```

- Ensure the build compiles without errors:

  ```sh
  go build -o pb ./examples/base
  ```

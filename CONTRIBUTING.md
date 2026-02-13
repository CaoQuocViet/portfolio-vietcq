# Contributing

Thank you for considering contributing to this project! This guide will help you get started.

## Prerequisites

- **Node.js** 20+ and **pnpm** 10.26+
- **Go** 1.24+
- **Docker** + docker-compose *(optional, for containerized development)*
- **Git** with conventional commit knowledge

## Getting Started

### 1. Fork & Clone

```bash
git clone https://github.com/<your-fork>/portfolio.git
cd portfolio
```

### 2. Start the Client (Next.js 15)

```bash
cd client
pnpm install
pnpm dev              # http://localhost:5678
```

### 3. Start the Server (PocketBase)

```bash
cd server
go build -o pb ./examples/base
./pb serve             # http://localhost:8090 (Admin: /\_/)
```

> [!NOTE]
> The admin dashboard is accessible at `http://localhost:8090/_/` after first run. You'll be prompted to create an admin account.

## Project Structure

```
├── client/           # Next.js 15 frontend (React 19, Tailwind CSS 4)
├── server/           # PocketBase backend (Go 1.24, forked source)
│   ├── blog/         # Blog engine (collections, hooks, feeds, search)
│   ├── portfolio/    # Portfolio engine (projects, images, API)
│   └── examples/base/main.go  # Entry point
├── docs/             # Project documentation
│   └── functions/    # Feature specifications (goals, status, next steps)
└── plans/            # Implementation plans
```

## Important: Server Architecture

The `server/` directory contains **forked PocketBase source code (v0.36.2)** from [pocketbase/pocketbase](https://github.com/pocketbase/pocketbase). This is the full source with custom extensions, not a Go module dependency.

Custom code lives in:
- `server/blog/` — Blog engine (~600 LOC)
- `server/portfolio/` — Portfolio engine (~730 LOC)

The Go module path remains `github.com/pocketbase/pocketbase` for upstream compatibility.

> [!IMPORTANT]
> The `server/` directory retains PocketBase's original MIT license. **Do not modify or remove the PocketBase license file** — this is a requirement of the fork.

**Upgrading PocketBase:** Compare releases from upstream, apply patches while preserving custom code in `blog/` and `portfolio/`.

## Development Workflow

### Branch Strategy

```
main ← dev ← feature/your-feature
```

1. Create a feature branch from `dev` (never from `main`)
2. Make changes with focused, conventional commits
3. Open a PR targeting `dev`
4. After review and CI pass, merge to `dev`
5. `dev` merges to `main` via release PR

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(client): add blog comment threading
fix(server): correct tag count sync on post delete
refactor(client): extract blog card into separate components
docs: update blog feature specification
chore: update Go dependencies
```

### Running Tests

```bash
# Server — Go tests
cd server && go test ./...

# Client — build check (no test suite yet)
cd client && pnpm build
```

## Code Conventions

- Follow patterns documented in `docs/` and `CLAUDE.md`
- Keep files under **200 lines**; split into focused modules
- Use **kebab-case** file names with descriptive purpose
- Use CSS custom properties (`var(--token)`) instead of hardcoded colors
- Follow **YAGNI / KISS / DRY** principles
- Add comments only where logic isn't self-evident

### Client-specific

- Use TanStack Query hooks for all API data fetching
- Place API functions in `lib/api.js`, hooks in `hooks/`
- Use `clsx` + `tailwind-merge` for conditional class names
- Respect `prefers-reduced-motion` for animations

### Server-specific

- Follow the `Register(app, cfg)` → hooks → bootstrap → serve pattern
- Place new engines in their own package under `server/`
- Use PocketBase lifecycle hooks (`OnRecordValidate`, `OnRecordCreate`, etc.)
- CORS is centralized in `main.go` — do not add CORS middleware in individual engines

## Before Submitting a PR

- [ ] `pnpm build` passes (client)
- [ ] `go build -o pb ./examples/base` compiles (server)
- [ ] `go test ./...` passes for server changes
- [ ] No `.env` files, API keys, or credentials committed
- [ ] Branch created from `dev`, PR targets `dev`
- [ ] Commits follow conventional commit format
- [ ] Feature specs updated in `docs/functions/` if applicable

## What Not to Commit

- `.env` files, API keys, database credentials
- `pb_data/` (PocketBase runtime data)
- `node_modules/`, `.next/`, build artifacts
- Large binary files (images, models) unless necessary

## Reporting Issues

Use [GitHub Issues](../../issues) with:
- Clear title describing the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS/Node/Go version if relevant

## Questions?

Open a discussion or issue — we're happy to help!

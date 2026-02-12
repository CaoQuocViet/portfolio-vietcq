package blog

import (
	"os"

	"github.com/pocketbase/pocketbase/core"
)

// Config holds blog engine configuration.
type Config struct {
	Title       string
	Description string
	BaseURL     string   // client base URL for feed/sitemap links
	CORSOrigins []string // allowed CORS origins
	BlockedBots []string // AI bots blocked in robots.txt
}

// DefaultConfig returns config with env var overrides.
func DefaultConfig() Config {
	return Config{
		Title:       envOr("BLOG_TITLE", "VietCQ Blog"),
		Description: envOr("BLOG_DESCRIPTION", "Personal blog by VietCQ"),
		BaseURL:     envOr("BLOG_BASE_URL", "http://localhost:3000"),
		CORSOrigins: []string{envOr("CORS_ORIGIN", "http://localhost:3000")},
		BlockedBots: []string{"GPTBot", "CCBot", "Google-Extended", "anthropic-ai", "ClaudeBot"},
	}
}

// Register sets up the entire blog engine on the given PocketBase app.
func Register(app core.App, cfg Config) {
	registerHooks(app)
	registerCron(app)
	registerBootstrap(app)
	registerServe(app, cfg)
}

func envOr(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

package portfolio

import (
	"github.com/pocketbase/pocketbase/core"
	"github.com/spf13/cobra"
)

// Config holds portfolio engine configuration.
type Config struct {
	RootCmd *cobra.Command // optional, for registering migrate-projects command
}

// DefaultConfig returns config with sensible defaults.
func DefaultConfig() Config {
	return Config{}
}

// Register sets up the entire portfolio engine on the given PocketBase app.
func Register(app core.App, cfg Config) {
	registerHooks(app)
	registerBootstrap(app)
	registerServe(app)
	if cfg.RootCmd != nil {
		registerMigrateCommand(app, cfg.RootCmd)
	}
}

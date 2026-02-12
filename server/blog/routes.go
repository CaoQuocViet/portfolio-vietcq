package blog

import (
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/hook"
)

// cacheKeys holds all cache key names for centralized invalidation.
var cacheKeys = []string{
	"rss_cache", "rss_cache_ttl",
	"atom_cache", "atom_cache_ttl",
	"sitemap_cache", "sitemap_cache_ttl",
	"blog_stats", "blog_stats_ttl",
}

func registerServe(app core.App, cfg Config) {
	app.OnServe().BindFunc(func(e *core.ServeEvent) error {
		e.Router.BindFunc(apis.CORS(apis.CORSConfig{
			AllowOrigins: cfg.CORSOrigins,
			AllowHeaders: []string{"Content-Type", "Authorization"},
		}).Func)

		registerFeedRoutes(app, e, cfg)
		registerSitemapRoute(app, e, cfg)
		registerRobotsTxtRoute(e, cfg)
		registerSearchRoute(app, e)
		registerStatsRoute(app, e)

		return e.Next()
	})

	// Single set of hooks to invalidate ALL caches on post changes
	invalidateAll := func(e *core.RecordEvent) error {
		for _, key := range cacheKeys {
			app.Store().Remove(key)
		}
		return e.Next()
	}
	app.OnRecordAfterCreateSuccess("posts").Bind(&hook.Handler[*core.RecordEvent]{Func: invalidateAll, Id: "cache_inv_c"})
	app.OnRecordAfterUpdateSuccess("posts").Bind(&hook.Handler[*core.RecordEvent]{Func: invalidateAll, Id: "cache_inv_u"})
	app.OnRecordAfterDeleteSuccess("posts").Bind(&hook.Handler[*core.RecordEvent]{Func: invalidateAll, Id: "cache_inv_d"})
}

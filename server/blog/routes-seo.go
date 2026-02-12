package blog

import (
	"fmt"
	"html"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gorilla/feeds"
	"github.com/pocketbase/pocketbase/core"
)

const feedLimit = 20

// buildFeed creates a shared Feed object for RSS and Atom.
func buildFeed(app core.App, cfg Config) (*feeds.Feed, error) {
	posts, err := app.FindRecordsByFilter("posts",
		"status = 'published' && visibility = 'public'",
		"-published_at", feedLimit, 0,
	)
	if err != nil {
		return nil, err
	}

	feed := &feeds.Feed{
		Title:       cfg.Title,
		Link:        &feeds.Link{Href: cfg.BaseURL},
		Description: cfg.Description,
		Created:     time.Now(),
	}
	for _, p := range posts {
		feed.Add(&feeds.Item{
			Title:       p.GetString("title"),
			Link:        &feeds.Link{Href: cfg.BaseURL + "/blog/" + p.GetString("slug")},
			Description: p.GetString("excerpt"),
			Content:     p.GetString("content"),
			Id:          p.Id,
			Created:     p.GetDateTime("published_at").Time(),
			Updated:     p.GetDateTime("updated_at").Time(),
		})
	}
	return feed, nil
}

func registerFeedRoutes(app core.App, e *core.ServeEvent, cfg Config) {
	// RSS feed
	e.Router.GET("/feed.xml", func(re *core.RequestEvent) error {
		if cached, ok := app.Store().Get("rss_cache").([]byte); ok {
			if ttl, ok2 := app.Store().Get("rss_cache_ttl").(time.Time); ok2 && time.Now().Before(ttl) {
				setCacheHeaders(re, "application/rss+xml; charset=utf-8")
				re.Response.Write(cached)
				return nil
			}
		}

		feed, err := buildFeed(app, cfg)
		if err != nil {
			return re.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to fetch posts"})
		}
		rss, err := feed.ToRss()
		if err != nil {
			return re.JSON(http.StatusInternalServerError, map[string]string{"error": "RSS generation failed"})
		}

		data := []byte(rss)
		app.Store().Set("rss_cache", data)
		app.Store().Set("rss_cache_ttl", time.Now().Add(10*time.Minute))
		setCacheHeaders(re, "application/rss+xml; charset=utf-8")
		re.Response.Write(data)
		return nil
	})

	// Atom feed
	e.Router.GET("/feed.atom", func(re *core.RequestEvent) error {
		if cached, ok := app.Store().Get("atom_cache").([]byte); ok {
			if ttl, ok2 := app.Store().Get("atom_cache_ttl").(time.Time); ok2 && time.Now().Before(ttl) {
				setCacheHeaders(re, "application/atom+xml; charset=utf-8")
				re.Response.Write(cached)
				return nil
			}
		}

		feed, err := buildFeed(app, cfg)
		if err != nil {
			return re.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to fetch posts"})
		}
		atom, err := feed.ToAtom()
		if err != nil {
			return re.JSON(http.StatusInternalServerError, map[string]string{"error": "Atom generation failed"})
		}

		data := []byte(atom)
		app.Store().Set("atom_cache", data)
		app.Store().Set("atom_cache_ttl", time.Now().Add(10*time.Minute))
		setCacheHeaders(re, "application/atom+xml; charset=utf-8")
		re.Response.Write(data)
		return nil
	})
}

func registerSitemapRoute(app core.App, e *core.ServeEvent, cfg Config) {
	e.Router.GET("/sitemap.xml", func(re *core.RequestEvent) error {
		if cached, ok := app.Store().Get("sitemap_cache").([]byte); ok {
			if ttl, ok2 := app.Store().Get("sitemap_cache_ttl").(time.Time); ok2 && time.Now().Before(ttl) {
				setCacheHeaders(re, "application/xml; charset=utf-8")
				re.Response.Write(cached)
				return nil
			}
		}

		posts, err := app.FindRecordsByFilter("posts",
			"status = 'published' && visibility = 'public'", "-published_at", 0, 0)
		if err != nil {
			log.Printf("[sitemap] failed to fetch posts: %v", err)
		}
		tags, err := app.FindRecordsByFilter("tags", "post_count > 0", "", 0, 0)
		if err != nil {
			log.Printf("[sitemap] failed to fetch tags: %v", err)
		}

		var b strings.Builder
		b.WriteString(`<?xml version="1.0" encoding="UTF-8"?>`)
		b.WriteString("\n")
		b.WriteString(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`)
		b.WriteString("\n")
		b.WriteString(fmt.Sprintf("  <url><loc>%s</loc><changefreq>weekly</changefreq></url>\n", html.EscapeString(cfg.BaseURL)))

		for _, p := range posts {
			loc := html.EscapeString(cfg.BaseURL + "/blog/" + p.GetString("slug"))
			lastmod := p.GetDateTime("updated_at").Time()
			if lastmod.IsZero() {
				lastmod = p.GetDateTime("published_at").Time()
			}
			b.WriteString(fmt.Sprintf("  <url><loc>%s</loc><lastmod>%s</lastmod></url>\n",
				loc, lastmod.Format("2006-01-02")))
		}

		for _, t := range tags {
			b.WriteString(fmt.Sprintf("  <url><loc>%s/tags/%s</loc><changefreq>weekly</changefreq></url>\n",
				html.EscapeString(cfg.BaseURL), html.EscapeString(t.GetString("slug"))))
		}
		b.WriteString("</urlset>")

		data := []byte(b.String())
		app.Store().Set("sitemap_cache", data)
		app.Store().Set("sitemap_cache_ttl", time.Now().Add(time.Hour))
		setCacheHeaders(re, "application/xml; charset=utf-8")
		re.Response.Write(data)
		return nil
	})
}

func registerRobotsTxtRoute(e *core.ServeEvent, cfg Config) {
	e.Router.GET("/robots.txt", func(re *core.RequestEvent) error {
		var b strings.Builder
		b.WriteString("User-agent: *\nAllow: /\n\n")
		for _, bot := range cfg.BlockedBots {
			b.WriteString(fmt.Sprintf("User-agent: %s\nDisallow: /\n\n", bot))
		}
		b.WriteString(fmt.Sprintf("Sitemap: %s/sitemap.xml\n", cfg.BaseURL))
		re.Response.Header().Set("Content-Type", "text/plain; charset=utf-8")
		re.Response.Header().Set("Cache-Control", "public, max-age=86400")
		re.Response.Write([]byte(b.String()))
		return nil
	})
}

// setCacheHeaders sets Content-Type and Cache-Control for cacheable responses.
func setCacheHeaders(re *core.RequestEvent, contentType string) {
	re.Response.Header().Set("Content-Type", contentType)
	re.Response.Header().Set("Cache-Control", "public, max-age=600")
}

package blog

import (
	"net/http"
	"strconv"
	"time"

	"github.com/pocketbase/pocketbase/core"
)

func registerSearchRoute(app core.App, e *core.ServeEvent) {
	e.Router.GET("/api/blog/search", func(re *core.RequestEvent) error {
		q := re.Request.URL.Query().Get("q")
		if q == "" {
			return re.JSON(http.StatusBadRequest, map[string]string{"error": "q parameter required"})
		}

		page, _ := strconv.Atoi(re.Request.URL.Query().Get("page"))
		if page < 1 {
			page = 1
		}
		perPage, _ := strconv.Atoi(re.Request.URL.Query().Get("per_page"))
		if perPage < 1 || perPage > 100 {
			perPage = 20
		}

		filter := "status = 'published' && visibility = 'public' && (title ~ {:q} || content ~ {:q} || excerpt ~ {:q})"
		params := map[string]any{"q": q}

		// Count using same PocketBase filter for consistency
		allResults, _ := app.FindRecordsByFilter("posts", filter, "", 0, 0, params)
		totalItems := len(allResults)

		// Paginated results
		posts, err := app.FindRecordsByFilter("posts", filter, "-published_at", perPage, (page-1)*perPage, params)
		if err != nil {
			return re.JSON(http.StatusInternalServerError, map[string]string{"error": "search failed"})
		}

		results := make([]map[string]any, 0, len(posts))
		for _, p := range posts {
			results = append(results, map[string]any{
				"id":           p.Id,
				"title":        p.GetString("title"),
				"slug":         p.GetString("slug"),
				"excerpt":      p.GetString("excerpt"),
				"published_at": p.GetDateTime("published_at"),
				"category":     p.GetString("category"),
				"read_time":    p.GetInt("read_time"),
			})
		}

		totalPages := (totalItems + perPage - 1) / perPage
		return re.JSON(http.StatusOK, map[string]any{
			"items":       results,
			"total_items": totalItems,
			"total_pages": totalPages,
			"page":        page,
			"per_page":    perPage,
		})
	})
}

func registerStatsRoute(app core.App, e *core.ServeEvent) {
	e.Router.GET("/api/blog/stats", func(re *core.RequestEvent) error {
		if cached, ok := app.Store().Get("blog_stats").(map[string]any); ok {
			if ttl, ok2 := app.Store().Get("blog_stats_ttl").(time.Time); ok2 && time.Now().Before(ttl) {
				return re.JSON(http.StatusOK, cached)
			}
		}

		type statsRow struct {
			Year       int `db:"year"`
			PostCount  int `db:"post_count"`
			TotalWords int `db:"total_words"`
		}

		var rows []statsRow
		err := app.DB().
			NewQuery("SELECT CAST(strftime('%Y', published_at) AS INTEGER) as year, COUNT(*) as post_count, COALESCE(SUM(word_count), 0) as total_words FROM posts WHERE status = 'published' AND published_at != '' GROUP BY year ORDER BY year DESC").
			All(&rows)
		if err != nil {
			return re.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to fetch stats"})
		}

		totalPosts, totalWords := 0, 0
		byYear := map[int]int{}
		for _, r := range rows {
			totalPosts += r.PostCount
			totalWords += r.TotalWords
			byYear[r.Year] = r.PostCount
		}

		stats := map[string]any{
			"total_posts": totalPosts,
			"total_words": totalWords,
			"by_year":     byYear,
		}
		app.Store().Set("blog_stats", stats)
		app.Store().Set("blog_stats_ttl", time.Now().Add(time.Hour))
		return re.JSON(http.StatusOK, stats)
	})
}

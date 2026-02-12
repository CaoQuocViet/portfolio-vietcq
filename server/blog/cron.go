package blog

import (
	"log"
	"time"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
)

func registerCron(app core.App) {
	// Publish scheduled posts every minute
	app.Cron().MustAdd("publishScheduledPosts", "* * * * *", func() {
		posts, err := app.FindRecordsByFilter("posts",
			"status = 'scheduled' && published_at <= {:now}",
			"", 0, 0,
			dbx.Params{"now": time.Now().UTC().Format(time.RFC3339)},
		)
		if err != nil {
			log.Printf("[cron] publishScheduledPosts error: %v", err)
			return
		}
		for _, p := range posts {
			p.Set("status", "published")
			if err := app.Save(p); err != nil {
				log.Printf("[cron] failed to publish post %s: %v", p.Id, err)
			}
		}
		if len(posts) > 0 {
			log.Printf("[cron] published %d scheduled posts", len(posts))
		}
	})

	// Sync tag counts hourly using SQL to avoid N+1
	app.Cron().MustAdd("syncTagCounts", "0 * * * *", func() {
		type tagCount struct {
			TagId string `db:"tag_id"`
			Count int    `db:"cnt"`
		}

		var counts []tagCount
		err := app.DB().
			NewQuery("SELECT json_each.value as tag_id, COUNT(*) as cnt FROM posts, json_each(posts.tags) WHERE posts.status = 'published' GROUP BY json_each.value").
			All(&counts)
		if err != nil {
			log.Printf("[cron] syncTagCounts query error: %v", err)
			return
		}

		// Build lookup
		countMap := make(map[string]int, len(counts))
		for _, c := range counts {
			countMap[c.TagId] = c.Count
		}

		// Update tags that differ
		tags, err := app.FindRecordsByFilter("tags", "", "", 0, 0)
		if err != nil {
			log.Printf("[cron] syncTagCounts fetch tags error: %v", err)
			return
		}
		for _, tag := range tags {
			expected := countMap[tag.Id]
			if tag.GetInt("post_count") != expected {
				tag.Set("post_count", expected)
				app.Save(tag)
			}
		}
	})
}

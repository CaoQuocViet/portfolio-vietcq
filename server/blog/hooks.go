package blog

import (
	"errors"
	"fmt"
	"log"
	"math"
	"regexp"
	"strings"
	"time"
	"unicode"

	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/hook"
	"github.com/pocketbase/pocketbase/tools/types"
)

// Pre-compiled regexes
var (
	htmlTagRe     = regexp.MustCompile(`<[^>]*>`)
	nonAlphanumRe = regexp.MustCompile(`[^a-z0-9]+`)
	multiDashRe   = regexp.MustCompile(`-{2,}`)

	errScheduledNeedsFutureDate = errors.New("scheduled posts must have a future published_at date")
)

func registerHooks(app core.App) {
	registerPostHooks(app)
	registerTagHooks(app)
	registerCommentHooks(app)
}

func registerPostHooks(app core.App) {
	app.OnRecordCreate("posts").Bind(&hook.Handler[*core.RecordEvent]{
		Func: func(e *core.RecordEvent) error {
			r := e.Record
			if r.GetString("slug") == "" {
				r.Set("slug", slugify(r.GetString("title")))
			}
			if r.GetString("status") == "published" && r.GetDateTime("published_at").IsZero() {
				r.Set("published_at", types.NowDateTime())
			}
			computeTextMetrics(r)
			autoExcerpt(r)
			return e.Next()
		},
		Priority: -10,
	})

	app.OnRecordUpdate("posts").Bind(&hook.Handler[*core.RecordEvent]{
		Func: func(e *core.RecordEvent) error {
			r := e.Record
			computeTextMetrics(r)
			autoExcerpt(r)
			if r.GetString("status") == "published" && r.GetDateTime("published_at").IsZero() {
				r.Set("published_at", types.NowDateTime())
			}
			return e.Next()
		},
		Priority: -10,
	})

	app.OnRecordValidate("posts").Bind(&hook.Handler[*core.RecordEvent]{
		Func: func(e *core.RecordEvent) error {
			r := e.Record
			if r.GetString("status") == "scheduled" {
				pub := r.GetDateTime("published_at")
				if pub.IsZero() || pub.Time().Before(time.Now()) {
					return errScheduledNeedsFutureDate
				}
			}
			// Friendly slug collision error
			if slug := r.GetString("slug"); slug != "" {
				existing, err := app.FindFirstRecordByFilter("posts",
					"slug = {:slug} && id != {:id}",
					map[string]any{"slug": slug, "id": r.Id},
				)
				if err == nil && existing != nil {
					return fmt.Errorf("slug '%s' is already taken", slug)
				}
			}
			return e.Next()
		},
		Priority: -5,
	})

	// Update tag counts after post changes (sync, with SQL aggregation)
	updateTags := func(e *core.RecordEvent) error {
		updateTagCountsSQL(e.App, e.Record.GetStringSlice("tags"))
		return e.Next()
	}
	app.OnRecordAfterCreateSuccess("posts").BindFunc(updateTags)
	app.OnRecordAfterUpdateSuccess("posts").BindFunc(updateTags)
	app.OnRecordAfterDeleteSuccess("posts").BindFunc(updateTags)
}

func registerTagHooks(app core.App) {
	app.OnRecordCreate("tags").Bind(&hook.Handler[*core.RecordEvent]{
		Func: func(e *core.RecordEvent) error {
			if e.Record.GetString("slug") == "" {
				e.Record.Set("slug", slugify(e.Record.GetString("name")))
			}
			return e.Next()
		},
		Priority: -10,
	})
}

func registerCommentHooks(app core.App) {
	// Default author_name to "Anonymous" and status to "approved"
	app.OnRecordCreate("comments").Bind(&hook.Handler[*core.RecordEvent]{
		Func: func(e *core.RecordEvent) error {
			if strings.TrimSpace(e.Record.GetString("author_name")) == "" {
				e.Record.Set("author_name", "Anonymous")
			}
			if e.Record.GetString("status") == "" {
				e.Record.Set("status", "approved")
			}
			return e.Next()
		},
		Priority: -10,
	})
}

// --- Helpers ---

func slugify(s string) string {
	s = strings.ToLower(strings.TrimSpace(s))
	s = nonAlphanumRe.ReplaceAllString(s, "-")
	s = multiDashRe.ReplaceAllString(s, "-")
	s = strings.Trim(s, "-")
	if s == "" {
		s = "untitled"
	}
	return s
}

func computeTextMetrics(r *core.Record) {
	text := stripHTML(r.GetString("content"))
	words := countWords(text)
	r.Set("word_count", words)
	r.Set("read_time", int(math.Ceil(float64(words)/200.0)))
}

func stripHTML(s string) string {
	return strings.TrimSpace(htmlTagRe.ReplaceAllString(s, " "))
}

// autoExcerpt generates excerpt from content if empty (~160 chars at word boundary).
func autoExcerpt(r *core.Record) {
	if strings.TrimSpace(r.GetString("excerpt")) != "" {
		return
	}
	text := stripHTML(r.GetString("content"))
	if len(text) <= 160 {
		r.Set("excerpt", text)
		return
	}
	cut := strings.LastIndex(text[:160], " ")
	if cut < 80 {
		cut = 160
	}
	r.Set("excerpt", text[:cut]+"...")
}

func countWords(s string) int {
	count := 0
	inWord := false
	for _, r := range s {
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			if !inWord {
				count++
				inWord = true
			}
		} else {
			inWord = false
		}
	}
	return count
}

// updateTagCountsSQL uses SQL count for affected tags (avoids N+1)
func updateTagCountsSQL(app core.App, tagIds []string) {
	for _, tagId := range tagIds {
		tag, err := app.FindRecordById("tags", tagId)
		if err != nil {
			continue
		}
		var result struct {
			Count int `db:"cnt"`
		}
		err = app.DB().
			NewQuery("SELECT COUNT(*) as cnt FROM posts, json_each(posts.tags) WHERE json_each.value = {:tagId} AND posts.status = 'published'").
			Bind(map[string]any{"tagId": tagId}).
			One(&result)
		if err != nil {
			log.Printf("[hooks] tag count query failed for %s: %v", tagId, err)
			continue
		}
		if tag.GetInt("post_count") != result.Count {
			tag.Set("post_count", result.Count)
			if err := app.Save(tag); err != nil {
				log.Printf("[hooks] failed to update tag %s: %v", tagId, err)
			}
		}
	}
}

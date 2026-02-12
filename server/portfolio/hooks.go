package portfolio

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/hook"
)

var (
	nonAlphanumRe = regexp.MustCompile(`[^a-z0-9]+`)
	multiDashRe   = regexp.MustCompile(`-{2,}`)
)

func registerHooks(app core.App) {
	registerProjectHooks(app)
	registerProjectImageHooks(app)
}

func registerProjectHooks(app core.App) {
	// Auto-slug on create (before validation)
	app.OnRecordCreate("projects").Bind(&hook.Handler[*core.RecordEvent]{
		Func: func(e *core.RecordEvent) error {
			if e.Record.GetString("slug") == "" {
				e.Record.Set("slug", slugify(e.Record.GetString("name")))
			}
			return e.Next()
		},
		Priority: -10,
	})

	// Slug uniqueness on validate
	app.OnRecordValidate("projects").Bind(&hook.Handler[*core.RecordEvent]{
		Func: func(e *core.RecordEvent) error {
			slug := e.Record.GetString("slug")
			if slug == "" {
				return e.Next()
			}
			existing, err := app.FindFirstRecordByFilter("projects",
				"slug = {:slug} && id != {:id}",
				map[string]any{"slug": slug, "id": e.Record.Id},
			)
			if err == nil && existing != nil {
				return fmt.Errorf("slug '%s' is already taken", slug)
			}
			return e.Next()
		},
		Priority: -5,
	})
}

func registerProjectImageHooks(app core.App) {
	// Auto display_order on create
	app.OnRecordCreate("project_images").Bind(&hook.Handler[*core.RecordEvent]{
		Func: func(e *core.RecordEvent) error {
			if e.Record.GetInt("display_order") > 0 {
				return e.Next()
			}
			projectId := e.Record.GetString("project")
			images, _ := app.FindRecordsByFilter("project_images",
				"project = {:pid}",
				"-display_order", 1, 0,
				map[string]any{"pid": projectId},
			)
			maxOrder := 0
			if len(images) > 0 {
				maxOrder = images[0].GetInt("display_order")
			}
			e.Record.Set("display_order", maxOrder+1)
			return e.Next()
		},
		Priority: -10,
	})
}

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

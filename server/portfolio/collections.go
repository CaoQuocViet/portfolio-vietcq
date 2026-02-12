package portfolio

import (
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/hook"
)

func registerBootstrap(app core.App) {
	app.OnBootstrap().Bind(&hook.Handler[*core.BootstrapEvent]{
		Func: func(e *core.BootstrapEvent) error {
			if err := e.Next(); err != nil {
				return err
			}
			return ensureCollections(e.App)
		},
	})
}

func ensureCollections(app core.App) error {
	if err := ensureProjectsCollection(app); err != nil {
		return err
	}
	return ensureProjectImagesCollection(app)
}

func ensureProjectsCollection(app core.App) error {
	// If collection exists, apply schema migrations
	if existing, err := app.FindCollectionByNameOrId("projects"); err == nil {
		changed := false

		// Ensure slug is not required (allows auto-slug hook)
		if slugField := existing.Fields.GetByName("slug"); slugField != nil {
			if tf, ok := slugField.(*core.TextField); ok && tf.Required {
				tf.Required = false
				tf.Min = 0
				changed = true
			}
		}

		// Remove redundant fields (URL fields replaced by links JSON, unused project_type)
		for _, name := range []string{"github_url", "live_url", "demo_url", "project_type"} {
			if f := existing.Fields.GetByName(name); f != nil {
				existing.Fields.RemoveById(f.GetId())
				changed = true
			}
		}

		if changed {
			return app.Save(existing)
		}
		return nil
	}

	c := core.NewBaseCollection("projects")

	// Core fields
	c.Fields.Add(&core.TextField{Name: "name", Required: true, Max: 300, Presentable: true})
	c.Fields.Add(&core.TextField{Name: "slug", Max: 300})

	// Bilingual content (JSON)
	c.Fields.Add(&core.JSONField{Name: "content_en", MaxSize: 2 * 1024 * 1024})
	c.Fields.Add(&core.JSONField{Name: "content_vi", MaxSize: 2 * 1024 * 1024})

	// Technologies as JSON (e.g. {"frontend":["React"],"backend":["Go"]})
	c.Fields.Add(&core.JSONField{Name: "technologies", MaxSize: 512 * 1024})

	// Timeline
	c.Fields.Add(&core.TextField{Name: "start_date", Max: 20})
	c.Fields.Add(&core.TextField{Name: "end_date", Max: 20})

	// Status and visibility
	c.Fields.Add(&core.SelectField{
		Name: "status", Required: true,
		Values:    []string{"planning", "in_progress", "completed", "archived"},
		MaxSelect: 1,
	})
	c.Fields.Add(&core.SelectField{
		Name: "visibility", Required: true,
		Values:    []string{"public", "unlisted", "private"},
		MaxSelect: 1,
	})

	// Metadata
	c.Fields.Add(&core.BoolField{Name: "featured"})
	c.Fields.Add(&core.NumberField{Name: "priority", OnlyInt: true})
	c.Fields.Add(&core.NumberField{Name: "team_size", OnlyInt: true})
	c.Fields.Add(&core.TextField{Name: "version", Max: 50})
	c.Fields.Add(&core.TextField{Name: "license", Max: 100})
	c.Fields.Add(&core.TextField{Name: "development_time", Max: 100})

	// JSON fields (color, links)
	c.Fields.Add(&core.JSONField{Name: "color", MaxSize: 4096})
	c.Fields.Add(&core.JSONField{Name: "links", MaxSize: 4096})

	// Access rules
	pub := "visibility = 'public'"
	auth := "@request.auth.id != ''"
	c.ListRule = &pub
	c.ViewRule = &pub
	c.CreateRule = &auth
	c.UpdateRule = &auth
	c.DeleteRule = &auth

	// Indexes
	c.AddIndex("idx_projects_slug", true, "slug", "")
	c.AddIndex("idx_projects_status", false, "status, visibility", "")
	c.AddIndex("idx_projects_featured", false, "featured, priority DESC", "")

	return app.Save(c)
}

func ensureProjectImagesCollection(app core.App) error {
	if _, err := app.FindCollectionByNameOrId("project_images"); err == nil {
		return nil
	}

	projectsCol, err := app.FindCollectionByNameOrId("projects")
	if err != nil {
		return err
	}

	c := core.NewBaseCollection("project_images")

	c.Fields.Add(&core.RelationField{
		Name:          "project",
		CollectionId:  projectsCol.Id,
		Required:      true,
		CascadeDelete: true,
		MaxSelect:     1,
	})
	c.Fields.Add(&core.FileField{
		Name:      "image",
		Required:  true,
		MaxSelect: 1,
		MaxSize:   5 * 1024 * 1024,
		MimeTypes: []string{"image/jpeg", "image/png", "image/webp"},
	})
	c.Fields.Add(&core.TextField{Name: "alt_text", Max: 500})
	c.Fields.Add(&core.TextField{Name: "caption", Max: 1000})
	c.Fields.Add(&core.NumberField{Name: "display_order", OnlyInt: true})

	pub := ""
	auth := "@request.auth.id != ''"
	c.ListRule = &pub
	c.ViewRule = &pub
	c.CreateRule = &auth
	c.UpdateRule = &auth
	c.DeleteRule = &auth

	c.AddIndex("idx_project_images_project", false, "project", "")
	c.AddIndex("idx_project_images_order", false, "project, display_order", "")

	return app.Save(c)
}

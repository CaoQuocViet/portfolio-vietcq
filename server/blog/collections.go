package blog

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
	if err := ensureTagsCollection(app); err != nil {
		return err
	}
	if err := ensurePostsCollection(app); err != nil {
		return err
	}
	if err := ensureCommentsCollection(app); err != nil {
		return err
	}
	return ensureMediaCollection(app)
}

func ensureTagsCollection(app core.App) error {
	if _, err := app.FindCollectionByNameOrId("tags"); err == nil {
		return nil
	}

	c := core.NewBaseCollection("tags")
	c.Fields.Add(&core.TextField{Name: "name", Required: true, Min: 1, Max: 100, Presentable: true})
	c.Fields.Add(&core.TextField{Name: "slug", Required: true, Min: 1, Max: 100})
	c.Fields.Add(&core.TextField{Name: "description", Max: 500})
	c.Fields.Add(&core.NumberField{Name: "post_count", OnlyInt: true})

	pub := ""
	auth := "@request.auth.id != ''"
	c.ListRule = &pub
	c.ViewRule = &pub
	c.CreateRule = &auth
	c.UpdateRule = &auth
	c.DeleteRule = &auth
	c.AddIndex("idx_tags_slug", true, "slug", "")
	c.AddIndex("idx_tags_name", true, "name", "")
	return app.Save(c)
}

func ensurePostsCollection(app core.App) error {
	if _, err := app.FindCollectionByNameOrId("posts"); err == nil {
		return nil
	}

	tagsCol, err := app.FindCollectionByNameOrId("tags")
	if err != nil {
		return err
	}

	c := core.NewBaseCollection("posts")

	c.Fields.Add(&core.TextField{Name: "title", Required: true, Max: 500, Presentable: true})
	c.Fields.Add(&core.TextField{Name: "slug", Required: true, Min: 1, Max: 500})
	c.Fields.Add(&core.EditorField{Name: "content", Required: true, MaxSize: 10 * 1024 * 1024})
	c.Fields.Add(&core.TextField{Name: "excerpt", Max: 1000})
	c.Fields.Add(&core.SelectField{
		Name: "status", Required: true,
		Values: []string{"draft", "published", "scheduled", "deleted"}, MaxSelect: 1,
	})
	c.Fields.Add(&core.SelectField{
		Name: "visibility", Required: true,
		Values: []string{"public", "unlisted", "private"}, MaxSelect: 1,
	})
	c.Fields.Add(&core.DateField{Name: "published_at"})
	c.Fields.Add(&core.AutodateField{Name: "updated_at", OnCreate: true, OnUpdate: true})
	c.Fields.Add(&core.NumberField{Name: "priority", OnlyInt: true})
	c.Fields.Add(&core.BoolField{Name: "featured"})
	c.Fields.Add(&core.RelationField{
		Name: "tags", CollectionId: tagsCol.Id, MaxSelect: 100,
	})
	c.Fields.Add(&core.SelectField{
		Name: "category",
		Values: []string{
			"technology", "programming", "design", "tutorial",
			"devops", "career", "project", "other",
		},
		MaxSelect: 1,
	})
	if su, err := app.FindCollectionByNameOrId("_superusers"); err == nil {
		c.Fields.Add(&core.RelationField{
			Name: "author", CollectionId: su.Id,
			MaxSelect: 1,
		})
	}
	c.Fields.Add(&core.FileField{Name: "cover_image", MaxSelect: 1, MaxSize: 10 * 1024 * 1024})
	c.Fields.Add(&core.FileField{Name: "images", MaxSelect: 20, MaxSize: 10 * 1024 * 1024})
	c.Fields.Add(&core.NumberField{Name: "read_time", OnlyInt: true})
	c.Fields.Add(&core.NumberField{Name: "word_count", OnlyInt: true})
	c.Fields.Add(&core.JSONField{Name: "parameters", MaxSize: 1024 * 1024})

	listRule := "(status = 'published' && visibility = 'public') || @request.auth.id != ''"
	viewRule := "(status = 'published' && (visibility = 'public' || visibility = 'unlisted')) || @request.auth.id != ''"
	auth := "@request.auth.id != ''"
	c.ListRule = &listRule
	c.ViewRule = &viewRule
	c.CreateRule = &auth
	c.UpdateRule = &auth
	c.DeleteRule = &auth

	c.AddIndex("idx_posts_slug", true, "slug", "")
	c.AddIndex("idx_posts_status_visibility", false, "status, visibility", "")
	c.AddIndex("idx_posts_published_at", false, "published_at DESC", "")
	c.AddIndex("idx_posts_status_published", false, "status, published_at DESC", "")
	return app.Save(c)
}

func ensureCommentsCollection(app core.App) error {
	if c, err := app.FindCollectionByNameOrId("comments"); err == nil {
		// migrate: if old schema (has "name" field but no "author_name"), drop and recreate
		if c.Fields.GetByName("author_name") == nil && c.Fields.GetByName("name") != nil {
			if err := app.Delete(c); err != nil {
				return err
			}
		} else {
			// migrate: add created_at if missing
			if c.Fields.GetByName("created_at") == nil {
				c.Fields.Add(&core.AutodateField{Name: "created_at", OnCreate: true})
				if err := app.Save(c); err != nil {
					return err
				}
			}
			return nil
		}
	}

	postsCol, err := app.FindCollectionByNameOrId("posts")
	if err != nil {
		return err
	}

	c := core.NewBaseCollection("comments")
	c.Fields.Add(&core.RelationField{
		Name: "post", CollectionId: postsCol.Id, Required: true,
		CascadeDelete: true, MaxSelect: 1,
	})
	// parent_id is a self-relation; set after initial save
	c.Fields.Add(&core.TextField{Name: "author_name", Required: true, Max: 100})
	c.Fields.Add(&core.EmailField{Name: "author_email"})
	c.Fields.Add(&core.TextField{Name: "content", Required: true, Max: 2000})
	c.Fields.Add(&core.SelectField{
		Name: "status", Required: true,
		Values: []string{"approved", "pending", "spam"}, MaxSelect: 1,
	})
	c.Fields.Add(&core.NumberField{Name: "likes", OnlyInt: true})
	c.Fields.Add(&core.AutodateField{Name: "created_at", OnCreate: true})

	listRule := "status = 'approved' && post.status = 'published'"
	viewRule := "status = 'approved'"
	pub := ""
	auth := "@request.auth.id != ''"
	c.ListRule = &listRule
	c.ViewRule = &viewRule
	c.CreateRule = &pub // anyone can comment
	c.UpdateRule = &auth
	c.DeleteRule = &auth

	c.AddIndex("idx_comments_post", false, "post", "")
	c.AddIndex("idx_comments_status_post", false, "status, post", "")

	if err := app.Save(c); err != nil {
		return err
	}

	// add self-relation for replies (needs collection ID)
	c.Fields.Add(&core.RelationField{
		Name: "parent_id", CollectionId: c.Id,
		MaxSelect: 1, CascadeDelete: true,
	})
	return app.Save(c)
}

func ensureMediaCollection(app core.App) error {
	if _, err := app.FindCollectionByNameOrId("media"); err == nil {
		return nil
	}

	c := core.NewBaseCollection("media")
	c.Fields.Add(&core.FileField{Name: "file", Required: true, MaxSelect: 1, MaxSize: 50 * 1024 * 1024})
	c.Fields.Add(&core.TextField{Name: "name", Required: true, Presentable: true, Max: 500})
	c.Fields.Add(&core.TextField{Name: "alt_text", Max: 500})
	c.Fields.Add(&core.SelectField{
		Name: "type", Required: true,
		Values: []string{"image", "video", "document", "other"}, MaxSelect: 1,
	})
	c.Fields.Add(&core.NumberField{Name: "size", OnlyInt: true}) // bytes, computed via hook

	pub := ""
	auth := "@request.auth.id != ''"
	c.ListRule = &pub
	c.ViewRule = &pub
	c.CreateRule = &auth
	c.UpdateRule = &auth
	c.DeleteRule = &auth
	return app.Save(c)
}

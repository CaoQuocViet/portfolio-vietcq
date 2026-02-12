package portfolio

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
)

func registerProjectRoutes(app core.App, e *core.ServeEvent) {
	// List projects
	e.Router.GET("/api/portfolio/projects", func(re *core.RequestEvent) error {
		lang := re.Request.URL.Query().Get("lang")
		if lang != "vi" {
			lang = "en"
		}

		page, _ := strconv.Atoi(re.Request.URL.Query().Get("page"))
		if page < 1 {
			page = 1
		}
		perPage, _ := strconv.Atoi(re.Request.URL.Query().Get("per_page"))
		if perPage < 1 || perPage > 100 {
			perPage = 20
		}

		// Build SQL WHERE clause for count + filter
		where := "visibility = 'public'"
		sqlParams := dbx.Params{}

		if re.Request.URL.Query().Get("featured") == "true" {
			where += " AND featured = 1"
		}
		if status := re.Request.URL.Query().Get("status"); status != "" {
			where += " AND status = {:status}"
			sqlParams["status"] = status
		}

		// Count via SQL (efficient, doesn't load all records)
		var countResult struct {
			Count int `db:"cnt"`
		}
		countErr := app.DB().
			NewQuery("SELECT COUNT(*) as cnt FROM projects WHERE " + where).
			Bind(sqlParams).
			One(&countResult)
		if countErr != nil {
			log.Printf("[portfolio] count error: %v", countErr)
		}
		totalItems := countResult.Count

		// Build PocketBase filter for actual records
		filter := "visibility = 'public'"
		var params []dbx.Params

		if re.Request.URL.Query().Get("featured") == "true" {
			filter += " && featured = true"
		}
		if status := re.Request.URL.Query().Get("status"); status != "" {
			filter += " && status = {:status}"
			params = append(params, dbx.Params{"status": status})
		}

		records, err := app.FindRecordsByFilter("projects",
			filter, "-priority", perPage, (page-1)*perPage, params...)
		if err != nil {
			log.Printf("[portfolio] list error: %v", err)
			return re.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to fetch projects"})
		}

		projects := make([]map[string]any, 0, len(records))
		for _, r := range records {
			projects = append(projects, transformProject(r, lang))
		}

		totalPages := (totalItems + perPage - 1) / perPage
		return re.JSON(http.StatusOK, map[string]any{
			"projects":    projects,
			"total_items": totalItems,
			"total_pages": totalPages,
			"page":        page,
			"per_page":    perPage,
		})
	})

	// Project detail
	e.Router.GET("/api/portfolio/projects/{slug}", func(re *core.RequestEvent) error {
		slug := re.Request.PathValue("slug")
		lang := re.Request.URL.Query().Get("lang")
		if lang != "vi" {
			lang = "en"
		}

		record, err := app.FindFirstRecordByFilter("projects",
			"slug = {:slug} && visibility = 'public'",
			map[string]any{"slug": slug},
		)
		if err != nil {
			return re.JSON(http.StatusNotFound, map[string]string{"error": "project not found"})
		}

		project := transformProject(record, lang)

		// Query images separately (project_images → project relation)
		images, imgErr := app.FindRecordsByFilter("project_images",
			"project = {:pid}",
			"display_order", 0, 0,
			map[string]any{"pid": record.Id},
		)
		if imgErr != nil {
			log.Printf("[portfolio] images query error: %v", imgErr)
		}
		if len(images) > 0 {
			project["images"] = transformImages(images)
		}

		return re.JSON(http.StatusOK, project)
	})
}

func transformProject(r *core.Record, lang string) map[string]any {
	result := map[string]any{
		"id":       r.Id,
		"name":     r.GetString("name"),
		"slug":     r.GetString("slug"),
		"featured": r.GetBool("featured"),
	}

	// Merge localized content into top-level
	mergeJSONField(r, "content_"+lang, result)

	// Technologies, color, links (JSON fields)
	setJSONField(r, "technologies", result)
	setJSONField(r, "color", result)
	setJSONField(r, "links", result)

	// Timeline
	result["timeline"] = map[string]any{
		"startDate": r.GetString("start_date"),
		"endDate":   r.GetString("end_date"),
		"status":    r.GetString("status"),
	}

	return result
}

func transformImages(records []*core.Record) []map[string]any {
	images := make([]map[string]any, 0, len(records))
	for _, r := range records {
		filename := r.GetString("image")
		if filename == "" {
			continue
		}
		images = append(images, map[string]any{
			"url":     fmt.Sprintf("/api/files/%s/%s/%s", r.Collection().Id, r.Id, filename),
			"alt":     r.GetString("alt_text"),
			"caption": r.GetString("caption"),
			"order":   r.GetInt("display_order"),
		})
	}
	return images
}

// getJSONValue extracts value from a PocketBase JSON field (types.JSONRaw = []byte).
func getJSONValue(r *core.Record, field string) any {
	raw := r.GetRaw(field)
	if raw == nil {
		return nil
	}
	var data []byte
	switch v := raw.(type) {
	case []byte:
		data = v
	default:
		d, err := json.Marshal(raw)
		if err != nil {
			return nil
		}
		data = d
	}
	if len(data) == 0 {
		return nil
	}
	var parsed any
	if json.Unmarshal(data, &parsed) != nil {
		return nil
	}
	return parsed
}

func mergeJSONField(r *core.Record, field string, result map[string]any) {
	if m, ok := getJSONValue(r, field).(map[string]any); ok {
		for k, v := range m {
			result[k] = v
		}
	}
}

func setJSONField(r *core.Record, field string, result map[string]any) {
	if v := getJSONValue(r, field); v != nil {
		result[field] = v
	}
}

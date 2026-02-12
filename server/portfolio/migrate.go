package portfolio

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/filesystem"
	"github.com/spf13/cobra"
)

type projectJSON struct {
	ID           string              `json:"id"`
	Name         string              `json:"name"`
	Tagline      string              `json:"tagline"`
	Description  string              `json:"description"`
	Role         map[string]any      `json:"role"`
	Features     []any               `json:"features"`
	Achievements map[string]any      `json:"achievements"`
	Timeline     timelineJSON        `json:"timeline"`
	Technologies map[string][]string `json:"technologies"`
	Links        map[string]string   `json:"links"`
	Color        map[string]string   `json:"color"`
}

type timelineJSON struct {
	StartDate string `json:"startDate"`
	EndDate   string `json:"endDate"`
	Status    string `json:"status"`
}

func registerMigrateCommand(app core.App, rootCmd *cobra.Command) {
	cmd := &cobra.Command{
		Use:   "migrate-projects",
		Short: "Import projects from JSON files into PocketBase",
		RunE: func(cmd *cobra.Command, args []string) error {
			dataPath, _ := cmd.Flags().GetString("data-path")
			imagesPath, _ := cmd.Flags().GetString("images-path")
			dryRun, _ := cmd.Flags().GetBool("dry-run")

			if err := app.Bootstrap(); err != nil {
				return err
			}

			return migrateProjects(app, dataPath, imagesPath, dryRun)
		},
	}
	cmd.Flags().String("data-path", "./client/public/data/project-detail", "Path to project JSON files")
	cmd.Flags().String("images-path", "./client/public/data/project-demo", "Path to project demo images")
	cmd.Flags().Bool("dry-run", false, "Preview changes without writing")

	rootCmd.AddCommand(cmd)
}

func readProjectPairs(dataPath string) (map[string][2]*projectJSON, error) {
	pairs := map[string][2]*projectJSON{}

	for i, lang := range []string{"en", "vi"} {
		pattern := filepath.Join(dataPath, lang, "*.json")
		files, err := filepath.Glob(pattern)
		if err != nil {
			return nil, err
		}
		for _, f := range files {
			data, err := os.ReadFile(f)
			if err != nil {
				log.Printf("[WARN] cannot read %s: %v", f, err)
				continue
			}
			var p projectJSON
			if err := json.Unmarshal(data, &p); err != nil {
				log.Printf("[WARN] cannot parse %s: %v", f, err)
				continue
			}
			key := p.ID
			if key == "" {
				key = strings.TrimSuffix(filepath.Base(f), ".json")
			}
			pair := pairs[key]
			pair[i] = &p
			pairs[key] = pair
		}
	}
	return pairs, nil
}

func migrateProjects(app core.App, dataPath, imagesPath string, dryRun bool) error {
	pairs, err := readProjectPairs(dataPath)
	if err != nil {
		return err
	}

	collection, err := app.FindCollectionByNameOrId("projects")
	if err != nil {
		return err
	}

	created, skipped, failed := 0, 0, 0

	for slug, pair := range pairs {
		en := pair[0]
		if en == nil {
			log.Printf("[SKIP] %s: missing English version", slug)
			skipped++
			continue
		}

		if _, err := app.FindFirstRecordByFilter("projects",
			"slug = {:slug}", map[string]any{"slug": slug}); err == nil {
			log.Printf("[SKIP] %s: already exists", slug)
			skipped++
			continue
		}

		if dryRun {
			log.Printf("[DRY] Would create: %s", en.Name)
			created++
			continue
		}

		contentEN := map[string]any{
			"tagline":      en.Tagline,
			"description":  en.Description,
			"role":         en.Role,
			"features":     en.Features,
			"achievements": en.Achievements,
		}
		// Fallback: use EN content for VI if no Vietnamese version exists
		contentVI := map[string]any{
			"tagline":      en.Tagline,
			"description":  en.Description,
			"role":         en.Role,
			"features":     en.Features,
			"achievements": en.Achievements,
		}
		if vi := pair[1]; vi != nil {
			contentVI = map[string]any{
				"tagline":      vi.Tagline,
				"description":  vi.Description,
				"role":         vi.Role,
				"features":     vi.Features,
				"achievements": vi.Achievements,
			}
		}

		record := core.NewRecord(collection)
		record.Set("name", en.Name)
		record.Set("slug", slug)
		record.Set("content_en", contentEN)
		record.Set("content_vi", contentVI)
		record.Set("technologies", en.Technologies)
		record.Set("start_date", en.Timeline.StartDate)
		record.Set("end_date", en.Timeline.EndDate)
		record.Set("status", mapStatus(en.Timeline.Status))
		record.Set("visibility", "public")
		record.Set("featured", true)
		record.Set("color", en.Color)
		record.Set("links", en.Links)

		if err := app.Save(record); err != nil {
			log.Printf("[FAIL] %s: %v", en.Name, err)
			failed++
			continue
		}

		uploadProjectImages(app, imagesPath, slug, record.Id)
		log.Printf("[OK] Created: %s", en.Name)
		created++
	}

	log.Printf("Migration complete: %d created, %d skipped, %d failed", created, skipped, failed)
	if failed > 0 {
		return fmt.Errorf("%d projects failed to import", failed)
	}
	return nil
}

func uploadProjectImages(app core.App, imagesPath, slug, projectId string) {
	// Images are directly in project-demo/{slug}/ (no "images" subdir)
	imgDir := filepath.Join(imagesPath, slug)
	if _, err := os.Stat(imgDir); os.IsNotExist(err) {
		return
	}

	collection, err := app.FindCollectionByNameOrId("project_images")
	if err != nil {
		return
	}

	files, err := os.ReadDir(imgDir)
	if err != nil {
		return
	}

	order := 1
	for _, f := range files {
		if f.IsDir() {
			continue
		}
		ext := strings.ToLower(filepath.Ext(f.Name()))
		if ext != ".jpg" && ext != ".jpeg" && ext != ".png" && ext != ".webp" {
			continue
		}

		filePath := filepath.Join(imgDir, f.Name())
		file, err := filesystem.NewFileFromPath(filePath)
		if err != nil {
			log.Printf("[FAIL] Image %s/%s: %v", slug, f.Name(), err)
			continue
		}

		record := core.NewRecord(collection)
		record.Set("project", projectId)
		record.Set("display_order", order)
		record.Set("alt_text", strings.TrimSuffix(f.Name(), ext))
		record.Set("image", file)

		if err := app.Save(record); err != nil {
			log.Printf("[FAIL] Image %s/%s: %v", slug, f.Name(), err)
			continue
		}
		order++
	}
}

func mapStatus(s string) string {
	switch strings.ToLower(s) {
	case "completed", "complete":
		return "completed"
	case "in progress", "in_progress", "active development", "active":
		return "in_progress"
	case "planning", "planned":
		return "planning"
	case "archived":
		return "archived"
	default:
		log.Printf("[WARN] unknown status %q, defaulting to completed", s)
		return "completed"
	}
}

package portfolio

import (
	"github.com/pocketbase/pocketbase/core"
)

func registerServe(app core.App) {
	app.OnServe().BindFunc(func(e *core.ServeEvent) error {
		registerProjectRoutes(app, e)
		return e.Next()
	})
}

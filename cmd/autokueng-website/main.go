package main

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/natrongmbh/autokueng-website/pkg/backend"
	"github.com/natrongmbh/autokueng-website/pkg/env"
	"github.com/pocketbase/pocketbase/core"
)

func init() {
	err := env.Init()
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	server := backend.Setup()

	server.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		// add route /api/contactmail
		_, err := e.Router.AddRoute(echo.Route{
			Method: http.MethodPost,
			Path:   "/api/contactmail",
			Handler: func(c echo.Context) error {
				return backend.SendContactFormMail(c)
			},
		})

		return err
	})

	// start the pocketbase server
	if err := server.Start(); err != nil {
		log.Fatal(err)
	}
}

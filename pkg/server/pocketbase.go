package server

import (
	"github.com/natrongmbh/autokueng-website/pkg/env"
	"github.com/natrongmbh/autokueng-website/pkg/migrations"
	"github.com/pocketbase/pocketbase"
)

// Setup initializes the pocketbase server
func Setup() *pocketbase.PocketBase {

	// initialize pocketbase collections
	migrations.InitCollections()

	// initialize pocketbase server
	app := pocketbase.NewWithConfig(pocketbase.Config{
		DefaultDataDir:       env.POCKETBASE_DATA_DIR,
		DefaultEncryptionEnv: env.POCKETBASE_ENCRYPTION_KEY,
	})

	return app
}

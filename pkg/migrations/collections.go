package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

// Auto generated migration with the most recent collections configuration.
func InitCollections() {
	m.Register(func(db dbx.Builder) error {
		jsonData := `[
			{
				"id": "systemprofiles0",
				"name": "profiles",
				"system": true,
				"listRule": "userId = @request.user.id",
				"viewRule": "userId = @request.user.id",
				"createRule": "userId = @request.user.id",
				"updateRule": "userId = @request.user.id",
				"deleteRule": null,
				"schema": [
					{
						"id": "pbfielduser",
						"name": "userId",
						"type": "user",
						"system": true,
						"required": true,
						"unique": true,
						"options": {
							"maxSelect": 1,
							"cascadeDelete": true
						}
					},
					{
						"id": "pbfieldname",
						"name": "name",
						"type": "text",
						"system": false,
						"required": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"id": "pbfieldavatar",
						"name": "avatar",
						"type": "file",
						"system": false,
						"required": false,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"maxSize": 5242880,
							"mimeTypes": [
								"image/jpg",
								"image/jpeg",
								"image/png",
								"image/svg+xml",
								"image/gif"
							],
							"thumbs": null
						}
					}
				]
			},
			{
				"id": "0wslyx293f2d754",
				"name": "news",
				"system": false,
				"listRule": "",
				"viewRule": "",
				"createRule": "@request.user.id!=\"\"",
				"updateRule": "@request.user.id!=\"\"",
				"deleteRule": "@request.user.id!=\"\"",
				"schema": [
					{
						"id": "pgdutn72",
						"name": "title",
						"type": "text",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"id": "wlrujpju",
						"name": "content",
						"type": "text",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"id": "rpls8ukb",
						"name": "image",
						"type": "file",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"maxSize": 5242880,
							"mimeTypes": [
								"image/jpg",
								"image/jpeg",
								"image/png",
								"image/svg+xml",
								"image/gif"
							],
							"thumbs": []
						}
					}
				]
			},
			{
				"id": "022mdh5w178a6ts",
				"name": "services",
				"system": false,
				"listRule": "",
				"viewRule": "",
				"createRule": "@request.user.id!=\"\"",
				"updateRule": "@request.user.id!=\"\"",
				"deleteRule": "@request.user.id!=\"\"",
				"schema": [
					{
						"id": "n5rub7rh",
						"name": "title",
						"type": "text",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"id": "wmv1dlrr",
						"name": "content",
						"type": "text",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"id": "nse0bviw",
						"name": "image",
						"type": "file",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"maxSize": 5242880,
							"mimeTypes": [
								"image/jpg",
								"image/jpeg",
								"image/png",
								"image/svg+xml",
								"image/gif"
							],
							"thumbs": []
						}
					}
				]
			},
			{
				"id": "ckmo75max0ihu7j",
				"name": "members",
				"system": false,
				"listRule": "",
				"viewRule": "",
				"createRule": "@request.user.id!=\"\"",
				"updateRule": "@request.user.id!=\"\"",
				"deleteRule": "@request.user.id!=\"\"",
				"schema": [
					{
						"id": "enma0f09",
						"name": "name",
						"type": "text",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"id": "ykzsctar",
						"name": "role",
						"type": "text",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"id": "h3uyw4gu",
						"name": "quote",
						"type": "text",
						"system": false,
						"required": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"id": "yzsvuj8g",
						"name": "field",
						"type": "file",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"maxSize": 5242880,
							"mimeTypes": [
								"image/jpg",
								"image/jpeg",
								"image/png",
								"image/svg+xml",
								"image/gif"
							],
							"thumbs": []
						}
					}
				]
			},
			{
				"id": "310srq3d5dsicpt",
				"name": "links",
				"system": false,
				"listRule": "",
				"viewRule": "",
				"createRule": "@request.user.id!=\"\"",
				"updateRule": "@request.user.id!=\"\"",
				"deleteRule": "@request.user.id!=\"\"",
				"schema": [
					{
						"id": "upmwxz2d",
						"name": "title",
						"type": "text",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"id": "ppudttfl",
						"name": "description",
						"type": "text",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"id": "r6tokkw5",
						"name": "url",
						"type": "url",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"exceptDomains": null,
							"onlyDomains": null
						}
					},
					{
						"id": "wsemuive",
						"name": "image",
						"type": "file",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"maxSize": 5242880,
							"mimeTypes": [
								"image/jpg",
								"image/jpeg",
								"image/png",
								"image/svg+xml",
								"image/gif"
							],
							"thumbs": []
						}
					}
				]
			},
			{
				"id": "vsky0miumsnwew0",
				"name": "gallery",
				"system": false,
				"listRule": "",
				"viewRule": "",
				"createRule": "@request.user.id!=\"\"",
				"updateRule": "@request.user.id!=\"\"",
				"deleteRule": "@request.user.id!=\"\"",
				"schema": [
					{
						"id": "7iorzlhu",
						"name": "title",
						"type": "text",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"id": "fifh97x7",
						"name": "image",
						"type": "file",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"maxSize": 5242880,
							"mimeTypes": [
								"image/jpg",
								"image/jpeg",
								"image/png",
								"image/svg+xml",
								"image/gif"
							],
							"thumbs": []
						}
					}
				]
			},
			{
				"id": "a4ylg2a4a994obf",
				"name": "vehicles",
				"system": false,
				"listRule": "",
				"viewRule": "",
				"createRule": "@request.user.id!=\"\"",
				"updateRule": "@request.user.id!=\"\"",
				"deleteRule": "@request.user.id!=\"\"",
				"schema": [
					{
						"id": "bo0csowj",
						"name": "name",
						"type": "text",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"id": "czwqtyrj",
						"name": "km",
						"type": "number",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null
						}
					},
					{
						"id": "xaky5f4u",
						"name": "price",
						"type": "number",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"min": 0,
							"max": null
						}
					},
					{
						"id": "huancsoa",
						"name": "image",
						"type": "file",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"maxSize": 5242880,
							"mimeTypes": [
								"image/jpg",
								"image/jpeg",
								"image/png",
								"image/svg+xml",
								"image/gif"
							],
							"thumbs": []
						}
					}
				]
			}
		]`

		collections := []*models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collections); err != nil {
			return err
		}

		return daos.New(db).ImportCollections(collections, true, nil)
	}, func(db dbx.Builder) error {
		// no revert since the configuration on the environment, on which
		// the migration was executed, could have changed via the UI/API
		return nil
	})
}

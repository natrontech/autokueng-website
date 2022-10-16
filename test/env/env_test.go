package env_test

import (
	"os"
	"testing"

	"github.com/natrongmbh/autokueng-website/pkg/env"
)

func TestInit(t *testing.T) {

	tests := []struct {
		description string
		env         map[string]string
	}{
		{
			description: "Test with valid env",
			env: map[string]string{
				"POCKETBASE_DATA_DIR":       "/tmp/pb_data",
				"POCKETBASE_ENCRYPTION_KEY": "POCKETBASE_ENCRYPTION_KEY",
				"SMTP_USERNAME":             "SMTP_USERNAME",
				"SMTP_PASSWORD":             "SMTP_PASSWORD",
				"SMTP_HOST":                 "SMTP_HOST",
				"SMTP_PORT":                 "SMTP_PORT",
				"SMTP_FROM":                 "SMTP_FROM",
				"SMTP_TO":                   "SMTP_TO",
				"SMTP_SSL":                  "true",
				"CAPTCHA_SECRET":            "CAPTCHA_SECRET",
			},
		},
		{
			description: "Test with invalid env",
			env: map[string]string{
				"POCKETBASE_DATA_DIR":       "",
				"POCKETBASE_ENCRYPTION_KEY": "",
				"SMTP_USERNAME":             "",
				"SMTP_PASSWORD":             "",
				"SMTP_HOST":                 "",
				"SMTP_PORT":                 "",
				"SMTP_FROM":                 "",
				"SMTP_TO":                   "",
				"SMTP_SSL":                  "",
			},
		},
	}

	for _, test := range tests {
		t.Run(test.description, func(t *testing.T) {
			// set env
			for key, value := range test.env {
				os.Setenv(key, value)
			}

			// run test
			err := env.Init()
			if err != nil {
				t.Errorf("Expected no error, got %s", err)
			}

			// check if envs are set correctly
			if env.POCKETBASE_DATA_DIR != test.env["POCKETBASE_DATA_DIR"] && env.POCKETBASE_DATA_DIR != "/pb_data" {
				t.Errorf("Expected POCKETBASE_DATA_DIR to be %s, got %s", test.env["POCKETBASE_DATA_DIR"], env.POCKETBASE_DATA_DIR)
			}

			if env.POCKETBASE_ENCRYPTION_KEY != test.env["POCKETBASE_ENCRYPTION_KEY"] && env.POCKETBASE_ENCRYPTION_KEY != "POCKETBASE_ENCRYPTION_KEY" {
				t.Errorf("Expected POCKETBASE_ENCRYPTION_KEY to be %s, got %s", test.env["POCKETBASE_ENCRYPTION_KEY"], env.POCKETBASE_ENCRYPTION_KEY)
			}
		})
	}
}

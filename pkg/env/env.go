package env

import (
	"os"
)

var (
	// POCKETBASE_DATA_DIR is the default data directory
	POCKETBASE_DATA_DIR string
	// POCKETBASE_ENCRYPTION_KEY is the default encryption key
	POCKETBASE_ENCRYPTION_KEY string
	// SMTP_USERNAME is the username for the SMTP server
	SMTP_USERNAME string
	// SMTP_PASSWORD is the password for the SMTP server
	SMTP_PASSWORD string
	// SMTP_HOST is the host for the SMTP server
	SMTP_HOST string
	// SMTP_PORT is the port for the SMTP server
	SMTP_PORT string
	// SMTP_FROM is the from address for the SMTP server
	SMTP_FROM string
	// SMTP_TO is the to address for the SMTP server
	SMTP_TO string
	// SMTP_SSL is the SSL flag for the SMTP server
	SMTP_SSL bool
	// CAPTCHA_SECRET is the secret for the captcha
	CAPTCHA_SECRET string
)

// Init initializes the environment variables
func Init() error {
	if POCKETBASE_DATA_DIR = os.Getenv("POCKETBASE_DATA_DIR"); POCKETBASE_DATA_DIR == "" {
		POCKETBASE_DATA_DIR = "/pb_data"
	}

	if POCKETBASE_ENCRYPTION_KEY = os.Getenv("POCKETBASE_ENCRYPTION_KEY"); POCKETBASE_ENCRYPTION_KEY == "" {
		POCKETBASE_ENCRYPTION_KEY = "POCKETBASE_ENCRYPTION_KEY"
	}

	if SMTP_USERNAME = os.Getenv("SMTP_USERNAME"); SMTP_USERNAME == "" {
		SMTP_USERNAME = "SMTP_USERNAME"
	}

	if SMTP_PASSWORD = os.Getenv("SMTP_PASSWORD"); SMTP_PASSWORD == "" {
		SMTP_PASSWORD = "SMTP_PASSWORD"
	}

	if SMTP_HOST = os.Getenv("SMTP_HOST"); SMTP_HOST == "" {
		SMTP_HOST = "SMTP_HOST"
	}

	if SMTP_PORT = os.Getenv("SMTP_PORT"); SMTP_PORT == "" {
		SMTP_PORT = "SMTP_PORT"
	}

	if SMTP_FROM = os.Getenv("SMTP_FROM"); SMTP_FROM == "" {
		SMTP_FROM = "SMTP_FROM"
	}

	if SMTP_TO = os.Getenv("SMTP_TO"); SMTP_TO == "" {
		SMTP_TO = "SMTP_TO"
	}

	if SMTP_SSL = os.Getenv("SMTP_SSL") == "true"; !SMTP_SSL {
		SMTP_SSL = false
	}

	if CAPTCHA_SECRET = os.Getenv("CAPTCHA_SECRET"); CAPTCHA_SECRET == "" {
		CAPTCHA_SECRET = "CAPTCHA_SECRET"
	}

	return nil
}

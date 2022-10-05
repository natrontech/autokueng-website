package util

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

var (
	CaptchaSecret string
)

const siteVerifyURL = "https://www.google.com/recaptcha/api/siteverify"

func CheckRecaptcha(response string) error {
	req, err := http.NewRequest("POST", siteVerifyURL,
		strings.NewReader(fmt.Sprintf("secret=%s&response=%s", CaptchaSecret, response)))
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{}

	resp, err := client.Do(req)
	if err != nil {
		return err
	}

	defer resp.Body.Close()

	var result map[string]interface{}

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return err
	}

	if result["success"] != true {
		return fmt.Errorf("recaptcha failed")
	}

	return nil
}

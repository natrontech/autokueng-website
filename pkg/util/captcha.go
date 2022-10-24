package util

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"time"

	"github.com/natrongmbh/autokueng-website/pkg/env"
)

const siteVerifyURL = "https://www.google.com/recaptcha/api/siteverify"

type SiteVerifyResponse struct {
	Success     bool      `json:"success"`
	Score       float64   `json:"score"`
	Action      string    `json:"action"`
	ChallengeTS time.Time `json:"challenge_ts"`
	Hostname    string    `json:"hostname"`
	ErrorCodes  []string  `json:"error-codes"`
}

func CheckRecaptcha(recaptchaResponse string) error {
	req, err := http.NewRequest("POST", siteVerifyURL, nil)
	if err != nil {
		return err
	}

	q := req.URL.Query()
	q.Add("secret", env.CAPTCHA_SECRET)
	q.Add("response", recaptchaResponse)
	req.URL.RawQuery = q.Encode()

	// Make request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Decode response.
	var body SiteVerifyResponse
	if err = json.NewDecoder(resp.Body).Decode(&body); err != nil {
		return err
	}

	log.Println(body.Success)

	// Check recaptcha verification success.
	if !body.Success {
		return errors.New("unsuccessful recaptcha verify request")
	}

	// Check response score.
	if body.Score < 0.5 {
		return errors.New("lower received score than expected")
	}

	return nil
}

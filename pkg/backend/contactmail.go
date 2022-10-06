package backend

import (
	"crypto/tls"
	"fmt"
	"net"
	"net/mail"
	"net/smtp"

	"github.com/labstack/echo/v5"
	"github.com/natrongmbh/autokueng-website/pkg/env"
	"github.com/natrongmbh/autokueng-website/pkg/util"
)

type ContactRequest struct {
	Firstname         string `json:"firstname"`
	Lastname          string `json:"lastname"`
	Email             string `json:"email"`
	Phone             string `json:"phone"`
	Subject           string `json:"subject"`
	Message           string `json:"message"`
	RecaptchaResponse string `json:"g-recaptcha-response"`
}

func SendContactFormMail(c echo.Context) error {

	var reqBody ContactRequest

	jsonBody := c.Request().Body
	defer jsonBody.Close()

	if err := c.Bind(&reqBody); err != nil {
		return err
	}

	// check recaptcha
	if err := util.CheckRecaptcha(reqBody.RecaptchaResponse); err != nil {
		return err
	}

	// send mail
	from := mail.Address{Name: "(Kontaktformular) " + env.SMTP_FROM, Address: env.SMTP_FROM}
	to := mail.Address{Name: "", Address: env.SMTP_TO}
	subject := reqBody.Subject + " (" + reqBody.Firstname + " " + reqBody.Lastname + ") <" + reqBody.Email + ">"
	body := fmt.Sprintf("Vorname: %s\nNachname: %s\nE-Mail: %s\nTelefon: %s\n\nNachricht: \n%s", reqBody.Firstname, reqBody.Lastname, reqBody.Email, reqBody.Phone, reqBody.Message)

	headers := make(map[string]string)
	headers["From"] = from.String()
	headers["To"] = to.String()
	headers["Subject"] = subject

	message := ""
	for k, v := range headers {
		message += fmt.Sprintf("%s: %s\r\n", k, v)
	}
	message += "\r\n" + body

	servername := fmt.Sprintf("%s:%s", env.SMTP_HOST, env.SMTP_PORT)

	host, _, _ := net.SplitHostPort(servername)

	auth := smtp.PlainAuth("", env.SMTP_USERNAME, env.SMTP_PASSWORD, host)

	if env.SMTP_SSL {
		tlsconfig := &tls.Config{
			InsecureSkipVerify: true,
			ServerName:         host,
		}
		conn, err := tls.Dial("tcp", servername, tlsconfig)
		if err != nil {
			return err
		}

		con, err := smtp.NewClient(conn, host)
		if err != nil {
			return err
		}

		if err := con.Auth(auth); err != nil {
			return err
		}

		if err := con.Mail(from.Address); err != nil {
			return err
		}

		if err := con.Rcpt(to.Address); err != nil {
			return err
		}

		wdata, err := con.Data()
		if err != nil {
			return err
		}

		_, err = wdata.Write([]byte(message))
		if err != nil {
			return err
		}

		err = wdata.Close()
		if err != nil {
			return err
		}

		err = con.Quit()
		if err != nil {
			return err
		}
	} else {
		// Connect to the server, authenticate, set the sender and recipient,
		// and send the email all in one step.
		if err := smtp.SendMail(servername, auth, from.Address, []string{to.Address}, []byte(message)); err != nil {
			return err
		}
	}

	return nil
}

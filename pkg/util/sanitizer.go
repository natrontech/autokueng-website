package util

import "strings"

func SanitizeSMTPBody(body string) string {
	// sanitize the message body for SMTP; replace \r\n with \n and
	// ensure lines are no longer than 998 characters (SMTP max line length is 1000)
	body = strings.Replace(body, "\r\n", " ", -1)
	body = strings.Replace(body, "\n", " ", -1)
	body = strings.Replace(body, "\r", " ", -1)

	// split the body into lines
	lines := strings.Split(body, " ")

	// rejoin the lines, ensuring they are no longer than 998 characters
	var newbody string
	for _, line := range lines {
		if len(newbody)+len(line) > 998 {
			newbody += "\r"
		}
		newbody += line + " "
	}

	return newbody
}

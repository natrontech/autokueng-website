# Pocketbase backend build
FROM golang:1.19 as build
WORKDIR /go/src/github.com/natrongmbh/autokueng-website
# RUN go get -d -v golang.org/x/net/html
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o autokueng-website ./cmd/autokueng-website

# Production build
FROM alpine:3.16

WORKDIR /app

RUN addgroup -g 1001 -S autokueng-website
RUN adduser -S autokueng-website -u 1001

RUN apk --no-cache add ca-certificates

COPY --from=build --chown=autokueng-website:autokueng-website /go/src/github.com/natrongmbh/autokueng-website/autokueng-website ./
COPY --from=build --chown=autokueng-website:autokueng-website /go/src/github.com/natrongmbh/autokueng-website/templates ./templates

RUN ls -la

EXPOSE 8090

CMD ["./autokueng-website", "serve", "--http=0.0.0.0:8090"]

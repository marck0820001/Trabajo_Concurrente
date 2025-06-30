# ---------- build stage ----------
FROM golang:1.22 AS build
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o trainer ./cmd/trainer

# ---------- runtime stage ----------
FROM gcr.io/distroless/base-debian12
WORKDIR /app

# Binario compilado
COPY --from=build /app/trainer /app/trainer

# Solo los artefactos necesarios para el binario
COPY data/matrix.csv   /app/data/
COPY data/scaler.json  /app/data/

ENTRYPOINT ["/app/trainer"]

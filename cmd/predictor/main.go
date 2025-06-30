package main

import (
	"context"
	"encoding/json"
	"log"
	"math"
	"net/http"

	"github.com/redis/go-redis/v9"
	"github.com/tuusuario/plantaciones/internal/data"
	"github.com/tuusuario/plantaciones/internal/ml"
)

const (
	redisCentros = "ml:dbscan:centroids"
	scalerPath   = "scaler.json"
)

var (
	centroids [][]float64
	scaler    data.Scaler
	numIdx    = map[string]int{"PERIODO": 0, "SUPERFICIE PLANTACION": 10}
)

type req struct {
	Features []float64 `json:"features"`
}
type resp struct {
	Cluster int `json:"cluster"`
}

func main() {
	log.SetFlags(0)

	// ---- carga scaler ----
	var err error
	scaler, err = data.LoadScaler(scalerPath)
	if err != nil {
		log.Fatal(err)
	}

	// ---- carga centroids desde Redis ----
	rdb := redis.NewClient(&redis.Options{Addr: "redis:6379"})
	ctx := context.Background()
	b, err := rdb.Get(ctx, redisCentros).Bytes()
	if err != nil {
		log.Fatal("centroids no encontrados en Redis: ", err)
	}
	if err := json.Unmarshal(b, &centroids); err != nil {
		log.Fatal(err)
	}

	http.HandleFunc("/predict", predictHandler)
	log.Println("🟢 predictor escuchando :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func predictHandler(w http.ResponseWriter, r *http.Request) {
	var q req
	if err := json.NewDecoder(r.Body).Decode(&q); err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	if len(q.Features) != len(centroids[1]) {
		http.Error(w, "dimensión incorrecta", 400)
		return
	}

	// copia para no mutar input
	vec := append([]float64(nil), q.Features...)
	scaler.Transform(vec, numIdx)

	// nearest centroid
	best := -1
	bestDist := math.MaxFloat64
	for c, ctr := range centroids {
		if c == 0 || ctr == nil {
			continue
		}
		d := dist(vec, ctr)
		if d < bestDist {
			bestDist = d
			best = c
		}
	}
	json.NewEncoder(w).Encode(resp{Cluster: best})
}

func dist(a, b []float64) float64 { // reutiliza la de ml si prefieres
	s := 0.0
	for i := range a {
		d := a[i] - b[i]
		s += d * d
	}
	return math.Sqrt(s)
}

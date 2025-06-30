package main

import (
	"context"
	"encoding/json"
	"log"

	"github.com/redis/go-redis/v9"
	"../../internal/loader"
	"../../internal/ml"
)

const (
	matrixPath   = "matrix.csv"
	redisLabels  = "ml:dbscan:labels"
	redisCentros = "ml:dbscan:centroids"
)

func main() {
	log.SetFlags(0)

	X, err := loader.LoadMatrix(matrixPath)
	if err != nil {
		log.Fatal(err)
	}

	model := ml.DBSCAN{Eps: 0.7, MinPts: 5}
	labels := model.FitConcurrent(X, 8)
	centroids := ml.Centroids(X, labels)

	// serializa
	lblBytes, _ := json.Marshal(labels)
	ctrBytes, _ := json.Marshal(centroids)

	rdb := redis.NewClient(&redis.Options{Addr: "redis:6379"})
	ctx := context.Background()
	if err := rdb.Set(ctx, redisLabels, lblBytes, 0).Err(); err != nil {
		log.Fatal(err)
	}
	if err := rdb.Set(ctx, redisCentros, ctrBytes, 0).Err(); err != nil {
		log.Fatal(err)
	}
	log.Printf("✅ Entrenamiento terminado: %d clusters", len(centroids)-1)
}

package data

import (
	"encoding/json"
	"os"
)

// Scaler aplica z-score a columnas numéricas
type Scaler struct {
	Cols []string  `json:"cols"`
	Mean []float64 `json:"mean"`
	Std  []float64 `json:"std"`
}

// LoadScaler lee scaler.json
func LoadScaler(path string) (Scaler, error) {
	var s Scaler
	b, err := os.ReadFile(path)
	if err != nil {
		return s, err
	}
	return s, json.Unmarshal(b, &s)
}

// Transform IN-PLACE según índice de columnas numéricas
func (s Scaler) Transform(vec []float64, idx map[string]int) {
	for k, name := range s.Cols {
		j := idx[name]
		vec[j] = (vec[j] - s.Mean[k]) / s.Std[k]
	}
}

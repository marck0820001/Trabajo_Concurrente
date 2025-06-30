package loader
import (
	"encoding/csv"
	"os"
	"strconv"
)

// LoadMatrix lee matrix.csv a [][]float64
func LoadMatrix(path string) ([][]float64, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	r := csv.NewReader(f)
	recs, err := r.ReadAll()
	if err != nil {
		return nil, err
	}

	data := make([][]float64, len(recs)-1)
	for i, row := range recs[1:] {
		vec := make([]float64, len(row))
		for j, v := range row {
			vec[j], _ = strconv.ParseFloat(v, 64)
		}
		data[i] = vec
	}
	return data, nil
}

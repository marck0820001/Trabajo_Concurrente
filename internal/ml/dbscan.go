package ml

import (
	"math"
	"sync"
)

// ---------- util ----------
func dist(a, b []float64) float64 {
	d := 0.0
	for i := range a {
		x := a[i] - b[i]
		d += x * x
	}
	return math.Sqrt(d)
}

// ---------- DBSCAN ----------
type DBSCAN struct {
	Eps    float64
	MinPts int
}

// etiquetas: -1 = ruido, 0 = sin visitar, 1..k = cluster
func (d DBSCAN) FitConcurrent(X [][]float64, workers int) []int {
	n := len(X)
	labels := make([]int, n)
	var cid int
	var cidMu sync.Mutex

	type job struct{ idx int }
	taskCh := make(chan job, n)
	wg := sync.WaitGroup{}

	for w := 0; w < workers; w++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for t := range taskCh {
				i := t.idx
				if labels[i] != 0 {
					continue
				}
				neigh := region(X, i, d.Eps)
				if len(neigh) < d.MinPts {
					labels[i] = -1
					continue
				}
				cidMu.Lock()
				cid++
				c := cid
				cidMu.Unlock()

				labels[i] = c
				seeds := append([]int(nil), neigh...)
				for len(seeds) > 0 {
					j := seeds[0]
					seeds = seeds[1:]
					if labels[j] == -1 {
						labels[j] = c
					}
					if labels[j] != 0 {
						continue
					}
					labels[j] = c
					neigh2 := region(X, j, d.Eps)
					if len(neigh2) >= d.MinPts {
						seeds = append(seeds, neigh2...)
					}
				}
			}
		}()
	}

	for i := range X {
		taskCh <- job{idx: i}
	}
	close(taskCh)
	wg.Wait()
	return labels
}

// ---------- centroides ----------
func Centroids(X [][]float64, labels []int) [][]float64 {
	var k int
	for _, l := range labels {
		if l > k {
			k = l
		}
	}
	sums := make([][]float64, k+1)
	cnt := make([]int, k+1)
	for i, l := range labels {
		if l < 1 {
			continue
		}
		if sums[l] == nil {
			sums[l] = make([]float64, len(X[0]))
		}
		for j, v := range X[i] {
			sums[l][j] += v
		}
		cnt[l]++
	}
	cent := make([][]float64, k+1)
	for c := 1; c <= k; c++ {
		if cnt[c] == 0 {
			continue
		}
		v := make([]float64, len(X[0]))
		for j := range v {
			v[j] = sums[c][j] / float64(cnt[c])
		}
		cent[c] = v
	}
	return cent
}

// ---------- helper ----------
func region(X [][]float64, i int, eps float64) []int {
	res := make([]int, 0, 8)
	for j := range X {
		if dist(X[i], X[j]) <= eps {
			res = append(res, j)
		}
	}
	return res
}

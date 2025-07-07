package main

import (
	"fmt"
	"net/http"
	"backend/handlers"
)

// Función middleware para agregar CORS automáticamente
func withCORS(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(w)
		if r.Method == http.MethodOptions {
			return
		}
		handler(w, r)
	}
}

func enableCors(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:80")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func main() {
	http.HandleFunc("/login", withCORS(handlers.LoginHandler))
	http.HandleFunc("/signup", withCORS(handlers.SignupHandler))

	// Esta ruta maneja múltiples métodos
	http.HandleFunc("/plantaciones", withCORS(func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodPost:
			handlers.RegistrarPlantacionHandler(w, r)
		case http.MethodGet:
			handlers.ListarPlantacionesHandler(w, r)
		default:
			http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		}
	}))

	fmt.Println("Servidor escuchando en http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}

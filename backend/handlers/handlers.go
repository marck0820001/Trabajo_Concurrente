package handlers

import (
	"backend/models"
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
)

var users = map[string]string{
	"admin@example.com": "123456",
}

var plantaciones []models.Plantacion
var mu sync.Mutex // Para concurrencia segura

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}

	password, ok := users[user.Email]
	if !ok || password != user.Password {
		http.Error(w, "Credenciales incorrectas", http.StatusUnauthorized)
		return
	}

	w.Write([]byte("Login exitoso"))
}

func SignupHandler(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	if _, exists := users[user.Email]; exists {
		http.Error(w, "Usuario ya existe", http.StatusConflict)
		return
	}

	users[user.Email] = user.Password
	w.Write([]byte("Registro exitoso"))
}

func RegistrarPlantacionHandler(w http.ResponseWriter, r *http.Request) {
	var plantacion models.Plantacion
	err := json.NewDecoder(r.Body).Decode(&plantacion)
	if err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}

	go func() { // CONCURRENCIA: Registro en background
		mu.Lock()
		defer mu.Unlock()
		plantaciones = append(plantaciones, plantacion)
		fmt.Printf("Plantación registrada: %+v\n", plantacion)
	}()

	w.Write([]byte("Registro en proceso"))
}

func ListarPlantacionesHandler(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()
	json.NewEncoder(w).Encode(plantaciones)
}

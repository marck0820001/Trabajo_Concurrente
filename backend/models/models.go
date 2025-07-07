package models

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Plantacion struct {
	Departamento   string  `json:"departamento"`
	Finalidad      string  `json:"finalidad"`
	Especie        string  `json:"especie"`
	Superficie     float64 `json:"superficie"`
	RegimenTenencia string `json:"regimen_tenencia"`
}
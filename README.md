
# 🌲 Clustering Concurrente en Go - Registro Nacional de Plantaciones Forestales por Especies

Este proyecto tiene como objetivo aplicar técnicas de **Machine Learning (Clustering)** sobre el dataset del [Registro Nacional de Plantaciones Forestales por Especies](https://www.datosabiertos.gob.pe/dataset/registro-nacional-de-plantaciones-forestales-por-especies), utilizando el lenguaje de programación **Go** y aprovechando la **concurrencia** para optimizar el procesamiento de datos.

---

## 📂 Dataset

El dataset contiene información detallada sobre las plantaciones forestales registradas en el Perú, incluyendo:

- Número de certificado
- Titular y tipo de documento
- Régimen de tenencia
- Superficie (en hectáreas)
- Especie registrada
- Año del certificado
- Autoridad regional (ARFFS)
- Finalidad de la plantación
- Fecha de corte (publicación)

📥 Fuente: [datosabiertos.gob.pe](https://www.datosabiertos.gob.pe/dataset/registro-nacional-de-plantaciones-forestales-por-especies)

---

## 🧠 Objetivo del Proyecto

- **Preprocesamiento** del dataset: limpieza, normalización y codificación de variables.
- **Aplicación de algoritmos de clustering** como K-Means o DBSCAN para encontrar patrones y grupos en los datos.
- **Implementación concurrente en Go**: utilización de goroutines y canales para acelerar el procesamiento.
- **Exportación de resultados** para análisis y visualización.

---

## 🛠️ Estructura del Proyecto

```
/
├── data/                        # Dataset original
│   └── plantaciones.csv
├── cmd/
│   └── main.go                  # Punto de entrada principal
├── pkg/
│   ├── preproc/                 # Funciones de limpieza y transformación
│   ├── model/                   # Algoritmos de clustering
│   └── io/                      # Lectura y escritura de archivos
├── results/
│   └── clusters.json            # Resultados del clustering
├── go.mod
├── go.sum
└── README.md
```

---

## 🚀 Ejecución

1. **Clona el repositorio:**
```bash
git clone https://github.com/marck0820001/Trabajo_Concurrente.git
cd Trabajo_Concurrente
```

2. **Descarga el dataset** desde el portal oficial y guárdalo como `data/plantaciones.csv`.

3. **Ejecuta el modelo:**
```bash
go run cmd/main.go --input data/plantaciones.csv --clusters 5 --output results/clusters.json
```

> Puedes configurar el número de clusters, tipo de algoritmo y parámetros de concurrencia.

---

## 🔧 Requisitos

- Go 1.20 o superior
- Paquetes estándar de Go (`encoding/csv`, `sync`, etc.)
- Opcional: bibliotecas externas para clustering (`gonum`, etc.)

---

## 📈 Resultados Esperados

- Agrupación de registros por especies, regiones, superficie, etc.
- Mejora del rendimiento al procesar grandes volúmenes de datos mediante concurrencia.
- Exportación de los clusters para visualización en Python o herramientas GIS.

---

## 📌 TODO

- [ ] Optimizar rendimiento en datasets grandes
- [ ] Añadir visualización de clusters
- [ ] Automatizar tests y validaciones
- [ ] Documentar funciones y API

---

## 📝 Licencia

Este proyecto es de código abierto bajo la licencia MIT.

---

## 🙌 Agradecimientos

- [Datos Abiertos Perú](https://www.datosabiertos.gob.pe/)
- Comunidad de Go y proyectos open source de ML en Go

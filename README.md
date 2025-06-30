# 🌲 Clustering Concurrente en Go – Registro Nacional de Plantaciones Forestales por Especies

Proyecto que entrena un **DBSCAN concurrente en Go** sobre el Registro Nacional de Plantaciones Forestales (RNFP) y expone una **API HTTP** para predecir el cluster de nuevos registros.  
El modelo y el *scaler* se almacenan temporalmente en **Redis**; todo se despliega con **Docker Compose**.

---

## 📁 Dataset y artefactos

| Archivo                           | Tamaño | Dónde obtenerlo | Para qué se usa |
|----------------------------------|--------|-----------------|-----------------|
| `data/raw/Plantaciones_TOTAL.csv`| 1 GB   | Portal de Datos Abiertos | Fuente original (solo referencia) |
| `data/matrix.csv`                | 282 MB | **Google Drive** – [carpeta pública](https://drive.google.com/drive/folders/1WCHD_TGvFteB7-ALYDt-OmAZXBS9lJsW?usp=sharing) | Matriz preprocesada (11 features) – insumo del *trainer* |
| `data/scaler.json`               | 200 B  | Misma carpeta   | Media / σ de las columnas numéricas |

> Solo necesitas `matrix.csv` y `scaler.json` para reproducir el flujo completo; el CSV bruto se excluye del repo por tamaño.

---

## 🧠 Flujo del proyecto

1. **Trainer** – carga `matrix.csv`, aplica scaler, ejecuta DBSCAN concurrente y guarda modelo en Redis.  
2. **Predictor** – lee modelo y scaler, expone `POST /predict` → `{ "cluster": N }`.  
3. **Redis** – almacén temporal para modelo.

---

## 🛠️ Estructura principal

```
.
├─ cmd/
│  ├─ trainer/
│  └─ predictor/
├─ internal/
├─ data/            ← matrix.csv, scaler.json
├─ docker-compose.yaml
└─ go.mod
```

---

## 🔧 Requisitos

* Docker Desktop + Docker Compose v2  
* Go ≥ 1.22 (solo si compilas afuera)  

---

## 🚀 Paso a paso

```bash
# 1) clona
git clone https://github.com/marck0820001/Trabajo_Concurrente.git
cd Trabajo_Concurrente

# 2) descarga artefactos (matrix.csv, scaler.json)
#    desde la carpeta de Google Drive:
#    https://drive.google.com/drive/folders/1WCHD_TGvFteB7-ALYDt-OmAZXBS9lJsW?usp=sharing
mkdir -p data
# Copia los archivos descargados a ./data

# 3) construye imágenes
docker compose build

# 4) levanta pila
docker compose up -d

# 5) prueba
curl -X POST http://localhost:8080/predict      -H "Content-Type: application/json"      -d '{"features":[2018,0,160,313,26,0,2,5,0,395,0.61]}'

# 6) escalar predictor
docker compose up -d --scale predictor=3

# 7) detener
docker compose down --volumes
```

---

## ⚙️ Comandos útiles

```bash
docker compose ps
docker compose logs trainer
docker compose logs predictor -f
docker compose exec redis redis-cli KEYS ml:dbscan:*
```

---

## .gitignore clave

```
data/*.csv
data/raw/
data/processed/
!data/scaler.json
/bin/
/pkg/
.vscode/
.idea/
.DS_Store
```

---

MIT © 2025 Marco FRO.

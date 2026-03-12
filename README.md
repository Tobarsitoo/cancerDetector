# 🧬 Detector de Cáncer de Mama con Inteligencia Artificial

Sistema web para **apoyo al diagnóstico de cáncer de mama** utilizando **Machine Learning** y visualización interactiva de resultados.

El sistema analiza **30 características morfológicas de un tumor** y predice si el tumor es:

* **Benigno**
* **Maligno**

Además muestra:

* 📊 Probabilidad de malignidad
* 🧠 Interpretación del modelo de IA
* 🔎 Variables que más influyen en el diagnóstico

---

# 📸 Interfaz del sistema

El sistema cuenta con dos vistas principales:

### 1️⃣ Formulario de diagnóstico

El usuario introduce las características del tumor.

### 2️⃣ Resultado del análisis

El sistema muestra:

* Diagnóstico
* Probabilidad
* Interpretación del modelo
* Variables más importantes

---

# 🧠 Tecnologías utilizadas

## Backend

* Python
* Flask
* Scikit-learn
* SHAP

## Frontend

* HTML5
* CSS3
* Bootstrap
* JavaScript
* Chart.js
* SweetAlert2

---

# 📊 Dataset utilizado

El modelo fue entrenado con el dataset:

**Wisconsin Diagnostic Breast Cancer (WDBC)**

Contiene:

* 569 muestras de tumores
* 30 características numéricas
* Clasificación:

  * Maligno
  * Benigno

Dataset proveniente del repositorio de Machine Learning de:

UCI Machine Learning Repository.

---

# 🧬 Características analizadas

El modelo analiza variables como:

* Radio medio del tumor
* Textura
* Perímetro
* Área
* Suavidad
* Compacidad
* Concavidad
* Simetría
* Dimensión fractal

Cada característica describe **propiedades geométricas del tumor** obtenidas mediante imágenes médicas.

---

# ⚙️ Arquitectura del proyecto

```
cancer-detector
│
├── backend
│   ├── app.py
│   ├── train_model.py
│   ├── model.pkl
│   ├── wdbc.data
│   └── wdbc.names
│
└── frontend
    ├── index.html
    │
    ├── css
    │   └── styles.css
    │
    └── js
        └── app.js
```

---

# 🚀 Instalación

## 1️⃣ Clonar repositorio

```bash
git clone https://github.com/tuusuario/cancer-detector-ai.git
cd cancer-detector-ai
```

---

## 2️⃣ Instalar dependencias

```bash
pip install -r requirements.txt
```

---

## 3️⃣ Ejecutar backend

```bash
cd backend
python app.py
```

El servidor iniciará en:

```
http://127.0.0.1:5000
```

---

## 4️⃣ Ejecutar frontend

Abrir el archivo:

```
frontend/index.html
```

en el navegador.

---

# 📈 Funcionalidades

✔ Predicción de tumor benigno o maligno
✔ Probabilidad de malignidad
✔ Interpretación del modelo con SHAP
✔ Visualización de variables más influyentes
✔ Interfaz web interactiva
✔ Flujo dinámico de diagnóstico

---

# 🎯 Objetivo del proyecto

Este proyecto tiene como objetivo demostrar cómo los **modelos de Machine Learning pueden apoyar el diagnóstico médico**, proporcionando interpretaciones y visualizaciones que ayuden a comprender las predicciones.

⚠️ **Este sistema es únicamente educativo y no reemplaza el diagnóstico médico profesional.**

---

# 👨‍💻 Autor

Desarrollado por:

**Allan Tobar Perlaza**


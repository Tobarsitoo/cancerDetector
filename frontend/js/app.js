const container = document.getElementById("inputs");

const features = [
  { label: "Radio medio del tumor", example: 14.1 },
  { label: "Textura media", example: 20.3 },
  { label: "Perímetro medio", example: 92.1 },
  { label: "Área media", example: 654 },
  { label: "Suavidad media", example: 0.09 },
  { label: "Compacidad media", example: 0.1 },
  { label: "Concavidad media", example: 0.08 },
  { label: "Puntos cóncavos medios", example: 0.05 },
  { label: "Simetría media", example: 0.18 },
  { label: "Dimensión fractal media", example: 0.06 },

  { label: "Error estándar del radio", example: 0.4 },
  { label: "Error estándar de textura", example: 1.2 },
  { label: "Error estándar del perímetro", example: 2.9 },
  { label: "Error estándar del área", example: 40 },
  { label: "Error estándar de suavidad", example: 0.007 },
  { label: "Error estándar de compacidad", example: 0.02 },
  { label: "Error estándar de concavidad", example: 0.03 },
  { label: "Error estándar de puntos cóncavos", example: 0.01 },
  { label: "Error estándar de simetría", example: 0.02 },
  { label: "Error estándar de dimensión fractal", example: 0.003 },

  { label: "Peor radio detectado", example: 16.5 },
  { label: "Peor textura detectada", example: 25.4 },
  { label: "Peor perímetro detectado", example: 110 },
  { label: "Peor área detectada", example: 880 },
  { label: "Peor suavidad detectada", example: 0.12 },
  { label: "Peor compacidad detectada", example: 0.25 },
  { label: "Peor concavidad detectada", example: 0.3 },
  { label: "Peor puntos cóncavos detectados", example: 0.15 },
  { label: "Peor simetría detectada", example: 0.28 },
  { label: "Peor dimensión fractal", example: 0.08 },
];

features.forEach((f, i) => {
  container.innerHTML += `

<div class="col-md-6 mb-3">

<label class="form-label fw-semibold">

${f.label}

</label>

<input

type="number"
step="any"
class="form-control"
id="f${i}"
placeholder="Ejemplo: ${f.example}"

>

</div>

`;
});

let probChart;
let shapChart;

async function predict() {
  let values = [];

  for (let i = 0; i < features.length; i++) {
    let v = document.getElementById(`f${i}`).value;

    if (v === "") {
      Swal.fire("Faltan datos", "Debes llenar todos los campos", "warning");

      return;
    }

    values.push(parseFloat(v));
  }

  Swal.fire({
    title: "Analizando...",
    text: "La IA está evaluando los datos",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const res = await fetch("https://cancerdetector-dsk4.onrender.com/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features: values }),
  });

  const data = await res.json();

  Swal.close();

  document.getElementById("form-section").style.display = "none";

  document.getElementById("result-section").style.display = "block";

  document.getElementById("result").innerHTML = `

<div class="alert alert-info">

<h4>Diagnóstico: ${data.prediction}</h4>

<p>

Probabilidad de cáncer:

<b>${data.probabilidad.toFixed(2)}%</b>

</p>

</div>

`;

  drawProbability(data.probabilidad);

  drawSHAP(data.explanation);

  showTopVariables(data.explanation);
}

function drawProbability(prob) {
  const ctx = document.getElementById("probChart");

  if (probChart) probChart.destroy();

  probChart = new Chart(ctx, {
    type: "bar",

    data: {
      labels: ["Probabilidad de malignidad"],

      datasets: [
        {
          data: [prob],
        },
      ],
    },

    options: {
      scales: {
        y: { beginAtZero: true, max: 100 },
      },
    },
  });
}

function drawSHAP(values) {
  const ctx = document.getElementById("shapChart");

  if (shapChart) shapChart.destroy();

  shapChart = new Chart(ctx, {
    type: "bar",

    data: {
      labels: features.map((f) => f.label),

      datasets: [
        {
          label: "Impacto en la predicción",

          data: values,
        },
      ],
    },
  });
}

function showTopVariables(values) {
  let list = document.getElementById("topVariables");

  list.innerHTML = "";

  let sorted = values
    .map((v, i) => ({ value: Math.abs(v), name: features[i].label }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  sorted.forEach((v) => {
    list.innerHTML += `<li>${v.name}</li>`;
  });
}

function resetApp() {
  document.getElementById("result-section").style.display = "none";

  document.getElementById("form-section").style.display = "block";

  window.scrollTo(0, 0);
}

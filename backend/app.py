from flask import Flask, request, jsonify
import numpy as np
import pickle
import json
import shap
import pandas as pd

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "model.pkl")
importance_path = os.path.join(BASE_DIR, "importance.json")
metrics_path = os.path.join(BASE_DIR, "metrics.json")

model = pickle.load(open(model_path, "rb"))
importance = json.load(open(importance_path))
metrics = json.load(open(metrics_path))

explainer = shap.TreeExplainer(model)

@app.route("/")
def home():
    return "API funcionando"

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json["features"]

    X = np.array(data).reshape(1,-1)

    prediction = model.predict(X)[0]
    prob = model.predict_proba(X)[0][1] * 100

    shap_values = explainer.shap_values(X)

    # corregir estructura shap dependiendo versión
    if isinstance(shap_values, list):
        explanation = shap_values[1][0].tolist()
    else:
        explanation = shap_values[0].tolist()

    result = "Maligno" if prediction == 1 else "Benigno"

    return jsonify({
        "prediction": result,
        "probabilidad": prob,
        "explanation": explanation
    })


@app.route("/metrics")
def get_metrics():
    return jsonify(metrics)


@app.route("/importance")
def get_importance():
    return jsonify(importance)


@app.route("/upload_csv",methods=["POST"])
def upload_csv():

    file = request.files["file"]

    df = pd.read_csv(file)

    predictions = model.predict(df)

    return jsonify({
        "predictions":predictions.tolist()
    })


if __name__ == "__main__":
    app.run(debug=True)
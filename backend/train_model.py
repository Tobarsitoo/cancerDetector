import pandas as pd
import pickle
import json

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix

data = pd.read_csv("wdbc.data", header=None)

y = data[1]
X = data.drop([0,1], axis=1)

X_train, X_test, y_train, y_test = train_test_split(
    X,y,test_size=0.2,random_state=42
)

model = RandomForestClassifier(
    n_estimators=400,
    max_depth=12,
    random_state=42
)

model.fit(X_train,y_train)

pred = model.predict(X_test)

accuracy = accuracy_score(y_test,pred)

cm = confusion_matrix(y_test,pred)

pickle.dump(model,open("model.pkl","wb"))

importance = model.feature_importances_

with open("importance.json","w") as f:
    json.dump({"features":importance.tolist()},f)

with open("metrics.json","w") as f:
    json.dump({
        "accuracy":float(accuracy),
        "confusion_matrix":cm.tolist()
    },f)

print("Modelo entrenado")
print("Accuracy:",accuracy)
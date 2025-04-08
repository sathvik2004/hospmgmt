import joblib

# Load model and encoder
model = joblib.load('disease_predictor_model.joblib')
mlb = joblib.load('symptom_encoder.joblib')

# Input symptoms
input_symptoms = ['fever', 'cough', 'sore throat']

# Preprocess
input_encoded = mlb.transform([input_symptoms])

# Predict
prediction = model.predict(input_encoded)

print(f"🧠 Predicted Disease: {prediction[0]}")

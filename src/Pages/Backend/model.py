import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Load dataset
df = pd.read_csv('symptom_disease_dataset.csv')

# Combine symptoms into list
symptom_cols = [col for col in df.columns if col.startswith('Symptom')]
df['symptoms'] = df[symptom_cols].values.tolist()

# Remove empty strings and convert to set
df['symptoms'] = df['symptoms'].apply(lambda x: list(set([s.strip().lower() for s in x if isinstance(s, str) and s.strip() != ''])))

# Encode symptoms
mlb = MultiLabelBinarizer()
X = mlb.fit_transform(df['symptoms'])

# Encode disease
y = df['Disease'].astype(str)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save model and encoder
joblib.dump(model, 'disease_predictor_model.joblib')
joblib.dump(mlb, 'symptom_encoder.joblib')

print("✅ Model and encoder saved successfully.")

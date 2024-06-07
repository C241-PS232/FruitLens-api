import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import sys
import json
import os

# Suppress TensorFlow logging
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
tf.get_logger().setLevel('ERROR')

# Load the model
model_path = os.path.join(os.path.dirname(__file__), '../models/model.h5')
model = load_model(model_path)

# Define class names
class_names = [
    'apple', 'apricot', 'avocado', 'banana', 'blackberry', 'blueberry', 'boysenberry', 'cantaloupe', 'cherry', 'clementine', 'coconut', 'cranberry', 'cucumber', 'currant', 'date', 'elderberry'
]

# Preprocess the image to match the model input shape
def preprocess_image(image_path):
    img = Image.open(image_path).convert('RGB').resize((150, 150))  # Resize to 150x150 to match model training
    img = np.array(img) / 255.0  # Normalize the image
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

# Predict the class of the fruit
def classify_fruit(image_path):
    img = preprocess_image(image_path)
    prediction = model.predict(img)
    class_idx = int(np.argmax(prediction, axis=1)[0])  # Convert to int
    class_name = class_names[class_idx]  # Get the class name
    confidence = round(100 * np.max(tf.nn.softmax(prediction)[0]), 2)  # Calculate confidence
    return class_idx, class_name, confidence

# Main function to handle command line arguments
if __name__ == "__main__":
    image_path = sys.argv[1]
    class_idx, class_name, confidence = classify_fruit(image_path)
    # Print only the JSON result
    print(json.dumps({"ClassID": class_idx, "ClassName": class_name, "Confidence": confidence}))

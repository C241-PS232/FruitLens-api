import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress TensorFlow logging

import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import sys
import json
import logging

# Suppress TensorFlow logging
tf.get_logger().setLevel('ERROR')

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Load the model
model_path = os.path.join(script_dir, '../models/model.h5')
model = load_model(model_path)

# Define class names
class_names = [
    'Apple', 'Banana', 'Carambola', 'Guava', 'Kiwi', 'Mango', 'Orange', 'Peach', 
    'Pear', 'Persimmon', 'Pitaya', 'Plum', 'Pomegranate', 'Tomatoes', 'Muskmelon'
]

# Define a function to preprocess the image
def preprocess_image(image_path):
    img = Image.open(image_path).convert('RGB').resize((150, 150))  # Convert to RGB and resize to the input size of the model
    img = np.array(img) / 255.0  # Normalize the image
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

# Define a function to predict the class of the fruit
def classify_fruit(image_path):
    img = preprocess_image(image_path)
    prediction = model.predict(img)
    class_idx = int(np.argmax(prediction, axis=1)[0])  # Convert to int
    class_name = class_names[class_idx]  # Get the class name
    return class_idx, class_name

# Main function to handle command line arguments
if __name__ == "__main__":
    image_path = sys.argv[1]
    class_idx, class_name = classify_fruit(image_path)
    # Print only the JSON result
    print(json.dumps({"class_id": class_idx, "class_name": class_name}))

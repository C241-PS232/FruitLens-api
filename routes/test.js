const tf = require('@tensorflow/tfjs-node');
const path = require('path');

async function loadModel() {
  const modelPath = `file://${path.join(__dirname, '..', 'models', 'model.json')}`;
  try {
    const model = await tf.loadLayersModel(modelPath);
    console.log('Model loaded successfully');
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
  }
}

loadModel();

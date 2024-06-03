import sys
import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image

# Define the model architecture (should match the one used in training)
class CorrectModel(nn.Module):
    def __init__(self):
        super(CorrectModel, self).__init__()
        self.linear1 = nn.Linear(3 * 248 * 248, 128)  # Adjusted based on the new size
        self.linear2 = nn.Linear(128, 32)
        self.linear3 = nn.Linear(32, 7)

    def forward(self, x):
        x = x.view(-1, 3 * 248 * 248)  # Flatten the input tensor based on the new size
        x = nn.functional.relu(self.linear1(x))
        x = nn.functional.relu(self.linear2(x))
        x = self.linear3(x)
        return x

# Load the model with the correct architecture
model = CorrectModel()
model.load_state_dict(torch.load('models/model.pth', map_location=torch.device('cpu')))
model.eval()

# Preprocess the image
def preprocess_image(img_path):
    transform = transforms.Compose([
        transforms.Resize((248, 248)),  # Adjust size as needed
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    img = Image.open(img_path).convert('RGB')  # Ensure the image is in RGB format
    img_tensor = transform(img)
    img_tensor = img_tensor.unsqueeze(0)  # Add batch dimension
    return img_tensor

# Get the image path from command line arguments
img_path = sys.argv[1]

# Preprocess the image
img_tensor = preprocess_image(img_path)

# Perform inference
with torch.no_grad():
    output = model(img_tensor)
    predicted_class = output.argmax(dim=1).item()

# Print the result
print(predicted_class)  # Adjust according to your class labels

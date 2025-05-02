from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torchvision.models as models
import torchvision.transforms as transforms
import torch.nn as nn
import joblib
from PIL import Image
import numpy as np
import io
import base64

from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
from pytorch_grad_cam.utils.image import show_cam_on_image

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Device
device = torch.device("cpu")

# Load model
model = models.resnet18(pretrained=False)
label_encoder = joblib.load("label_encoder.pkl")
model.fc = nn.Linear(model.fc.in_features, len(label_encoder.classes_))
model.load_state_dict(torch.load("model.pth", map_location=device))
model = model.to(device)
model.eval()

# Captions for each class
captions = {
    "glioma": "MRI indicates the presence of a glioma, a type of tumor originating from glial cells.",
    "meningioma": "MRI suggests a meningioma, typically a slow-growing tumor arising from the meninges.",
    "pituitary": "MRI reveals a pituitary tumor, possibly affecting hormone secretion and nearby structures.",
    "notumor": "MRI shows no evidence of a tumor, indicating a normal brain scan."
}

# Image transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

# Prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    image = Image.open(io.BytesIO(file.read())).convert("RGB")
    input_tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(input_tensor)
        pred = torch.argmax(outputs, dim=1).item()

    pred_label = label_encoder.classes_[pred]
    caption = captions[pred_label]

    # Grad-CAM
    target_layers = [model.layer4[-1]]
    cam = GradCAM(model=model, target_layers=target_layers)
    grayscale_cam = cam(input_tensor=input_tensor, targets=[ClassifierOutputTarget(pred)])[0]

    image_resized = image.resize((grayscale_cam.shape[1], grayscale_cam.shape[0]))
    rgb_img = np.array(image_resized).astype(np.float32) / 255.0
    cam_image = show_cam_on_image(rgb_img, grayscale_cam, use_rgb=True)

    # Convert Grad-CAM to base64
    cam_pil = Image.fromarray(cam_image)
    buffered = io.BytesIO()
    cam_pil.save(buffered, format="PNG")
    cam_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return jsonify({
        'predicted_label': pred_label,
        'caption': caption,
        'gradcam_image': cam_base64
    })

# Entry point
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

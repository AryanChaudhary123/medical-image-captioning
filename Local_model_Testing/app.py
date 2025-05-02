import streamlit as st
import torch
import torchvision.transforms as transforms
import torchvision.models as models
import torch.nn as nn
from PIL import Image
import joblib
import numpy as np
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
from pytorch_grad_cam.utils.image import show_cam_on_image
import matplotlib.pyplot as plt

# Set device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load model and encoder
model_path = "model.pth"
encoder_path = "label_encoder.pkl"

label_encoder = joblib.load(encoder_path)
model = models.resnet18(pretrained=False)
model.fc = nn.Linear(model.fc.in_features, len(label_encoder.classes_))
model.load_state_dict(torch.load(model_path, map_location=device))
model = model.to(device)
model.eval()

# Define captions
captions = {
    "glioma": "MRI indicates the presence of a glioma, a type of tumor originating from glial cells.",
    "meningioma": "MRI suggests a meningioma, typically a slow-growing tumor arising from the meninges.",
    "pituitary": "MRI reveals a pituitary tumor, possibly affecting hormone secretion and nearby structures.",
    "notumor": "MRI shows no evidence of a tumor, indicating a normal brain scan."
}

# Image transforms
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

# Prediction + GradCAM function
def predict_and_explain(image):
    img = Image.open(image).convert("RGB")
    input_tensor = transform(img).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(input_tensor)
        pred = torch.argmax(output, dim=1).item()

    pred_label = label_encoder.classes_[pred]
    caption = captions[pred_label]

    # Grad-CAM
    target_layers = [model.layer4[-1]]
    cam = GradCAM(model=model, target_layers=target_layers)
    grayscale_cam = cam(input_tensor=input_tensor, targets=[ClassifierOutputTarget(pred)])[0]

    img_resized = img.resize((grayscale_cam.shape[1], grayscale_cam.shape[0]))
    rgb_img = np.array(img_resized).astype(np.float32) / 255.0
    visualization = show_cam_on_image(rgb_img, grayscale_cam, use_rgb=True)

    return pred_label, caption, visualization

# Streamlit UI
st.set_page_config(page_title="Brain MRI Tumor Classifier", layout="centered")
st.title("🧠 Brain MRI Tumor Prediction")
st.write("Upload an MRI scan to detect and explain tumor type.")

uploaded_file = st.file_uploader("📁 Upload Image", type=["jpg", "jpeg", "png"])

if uploaded_file:
    st.image(uploaded_file, caption="🖼️ Uploaded MRI Image", use_column_width=True)

    if st.button("🩺 Predict"):
        pred_label, caption, cam_img = predict_and_explain(uploaded_file)

        st.success(f"**Prediction:** {pred_label.upper()}")
        st.markdown(f"**Interpretation:** {caption}")
        st.image(cam_img, caption="🔬 Grad-CAM Visualization", use_column_width=True)

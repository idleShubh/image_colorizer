# Image Colorization using Deep Learning

This project utilizes a deep learning model to colorize black-and-white images using OpenCV's DNN module. The model is based on a pre-trained Caffe model for image colorization.

<img width="1470" alt="2-_March Colorising_b w_images" src="https://github.com/user-attachments/assets/28b7a9af-484f-48ed-bd47-e4813c4b30e4" />

## Overview

The script loads a black-and-white image, processes it using a deep neural network, and outputs a colorized version of the image. It leverages the LAB color space, where the L channel represents lightness, and the A & B channels represent color components. The deep learning model predicts the missing A & B channels and combines them with the L channel to reconstruct the colorized image.

## Model Details

- The colorization model is based on the research by Richard Zhang, Phillip Isola, and Alexei A. Efros.
- It uses a deep convolutional neural network trained on large-scale datasets to predict color information for grayscale images.
- The model uses a fixed set of color clusters to estimate the probable colors of objects in the image.

## Key Features

- Automatic colorization of grayscale images.
- Uses OpenCV’s deep neural network module (cv2.dnn) to load and process the model.
- Supports high-resolution image colorization.
- Pre-trained on ImageNet dataset.

## Output Example

The script reads an input black-and-white image and generates a colorized output. The result is displayed using OpenCV, comparing the original and the colorized images.

## Credits

- Model by Richard Zhang et al.
- Implementation and modifications by idleShubh.


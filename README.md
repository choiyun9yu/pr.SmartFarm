![Auto Farming](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/project.png)
[![roboflow](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/roboflow.svg)](https://app.roboflow.com/yungyu-choi-urac0)
[![colab](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/colab.svg)](https://colab.research.google.com/drive/1oOt1ESaCDMBZyef1I7tjePFKp-Rl15sv)
[![yolov5](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/yolo.svg)](https://github.com/choiyun9yu/yolov5)

## Overview
This days, the issue of deteriorating climate conditions and a shortage of agricultural workforce is getting increasingly prominent.
So we try to solve this problem with Smart-farm.
We created **'Automatic Planting Device for Ginseng Using Vision System and Robot Arm'**.
![front](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/front%20view.png)

## Transfer Learning
We created **'Automatic Planting Device for Ginseng Using Vision System and Robot Arm'**.
The device use [YOLOv5](https://github.com/choiyun9yu/yolov5) which was modified to predict angles of objects to detect ginsengs.

This object detect model was trained with the data we collected ourselves. And the datasets was labeled through roboflow.
If you want to know detail code [here](https://colab.research.google.com/drive/1oOt1ESaCDMBZyef1I7tjePFKp-Rl15sv).
![roboflow2](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/roboflow2.png)

## Process
![process](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/process.png)
### Ginseng, head object detection
![img1](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/img1.png)

### Counting, object congestion
![img2](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/img2.png)

### Nearset object
![img3](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/img3.png)

### Angle inference
![img4](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/img4.png)
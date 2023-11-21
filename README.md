![Auto Farming](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/project.png)  
<a href="https://app.roboflow.com/yungyu-choi-urac0"><img src="https://img.shields.io/badge/Roboflow-#A901DB?style=plastic"/></>  
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
First, the YOLOv5 model detects objects from the video data received from the camera. If the number of detected ginseng is less than or equal to 3, it activates the conveyor to receive more ginseng. However, if there are 4 or more ginseng detected, it sends the coordinates and angles of the ginseng closest to the robotic arm to the robotic arm.
![img1](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/img1.png)

### Counting, object congestion
We utilized the fact that when ginseng is gathered together, the bounding box of the detected object is larger than when a single ginseng is detected. If a bounding box larger than the usual size of a regular object is formed, the flexhing feeder is activated. When the flexing feeder operates, the table where ginseng is present vibrates to separate the ginseng.
![img2](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/img2.png)

### Nearset object
First, we calculate the Euclidean distance between the four corners of the bounding box and the centroid of the head.
We have developed an algorithm to predict the angle of the ginseng based on the closest corner.
Additionally, if the difference in Euclidean distance between the closest point and the second closest point is below a threshold value, we consider the angle of the ginseng to be a right angle.
![img3](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/img3.png)

### Angle inference
We can utilize YOLOv5 to infer eight different angles at 45-degree intervals, ranging from 0 degrees to 315 degrees.
![img4](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/img4.png)

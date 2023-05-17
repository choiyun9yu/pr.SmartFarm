![Auto Farming](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/project.png)
[![roboflow](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/roboflow.svg)](https://app.roboflow.com/yungyu-choi-urac0)
[![colab](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/colab.svg)](https://colab.research.google.com/drive/1oOt1ESaCDMBZyef1I7tjePFKp-Rl15sv)
[![yolov5](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/yolo.svg)](https://github.com/choiyun9yu/yolov5)

## Overview
This days, the issue of deteriorating climate conditions and a shortage of agricultural workforce is getting increasingly prominent.
So we try to solve this problem with Smart-farm.
We created **'Automatic Planting Device for Ginseng Using Vision System and Robot Arm'**.
![front](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/front%20view.png)

## Contents
We created **'Automatic Planting Device for Ginseng Using Vision System and Robot Arm'**.
The device use [YOLOv5](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/yolo.svg)](https://github.com/choiyun9yu/yolov5) which was modified to predict angles of objects to detect ginsengs.

This object detect model was trained with the data we collected ourselves. And the datasets was labeled through roboflow.
If you want to know detail code [here](https://colab.research.google.com/drive/1oOt1ESaCDMBZyef1I7tjePFKp-Rl15sv).

![roboflow2](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/roboflow2.png)

![process](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/process.png)
###
![img1](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/img1.png)
![img2](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/img2.png)
![img3](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/img3.png)
![img4](https://github.com/choiyun9yu/pr.Auto-Farming/blob/main/Document/img4.png)




1. 개요 : 기후 악화, 농업 인력 부족을 3세대 스마트 팜으로 해소
2. 목표 : 비전 시스템과 로봇팔을 활용한 묘삼 자동 식재 장치 개발
3. 팀원 : 박진우(하드웨어, 프론트엔드), 윤승욱(백엔드), 이범기(로봇팔), 문영철(컨베이어) 외 5인
4. 기간 : 22. 11. 7 ~ 22. 12. 14

# 나의 역할 : 딥러닝, 데이터베이스
1. 내가 사용한 기술 : Yolo v5, OpenCV, MySQL 등

2. 수행 업무
    - 묘삼의 좌표 및 각도 도출 알고리즘 설계 및 구현,
    - 데이터 수집 및 전처리, 모델 전이학습,
    - 데이터베이스 ERD작성 및 데이터베이스 구축,
    - 요구사항 분석 도출, SW 구조 설계,
    - Flask 테스트 서버 구현  


# 핵심 개발 내용
1. 객체탐지 모델 학습
    - 데이터 수집 : 새싹삼 재배 농장에서 묘삼을 촬영
    - 데이터 라벨링 : Roboflow를 사용하여 이미지 라벨링
    - 모델 전이 학습 : Colab 환경에서 pretrianed된 Yolo v5s 모델에 전이학습
    - 결과 : mAP50(0.99) / mAP50-95(0.58) 

2. 객체 수와 객체 뭉침 파악하여 컨베이어베트와 플렉싱 피더 제어 
    - 카메라로부터 받은 영상을 Yolo v5를 사용하여 객체탐지
    - 탐지된 객체가 3개 이하이면 수평 컨베이어 벨트 작동 신호 발생
    - 묘상이 뭉쳐 있는 경우 바운딩 박스가 일반적인 객체보다 더 큰 것을 활용  
      정상 객체보다 큰 바운딩 박스가 형성되면 플랙싱 비더 작동 신호 발생

3. 최근접 객체 도출 및 해당 객체 각도 예측
    - 묘삼의 바운딩 박스안에 하나의 뇌두가 들어있는 객체를 정상 객체로 상정,  
      y절편과 가장 가까운 뇌두의 좌표를 최근접 객체로 판단
    - 각도 도출을 위해 묘삼의 바운딩 박스 네 꼭짓점과 뇌두의 중심좌표간의 유클리드 거리 계산,  
      가장 가까운 바운딩 박스에 따라 묘삼의 각도를 예측
    - 0도 90도 180도 270도의 직각인 경우 최근접점과 차근접점의 유클리더 거리차가  
      일정거리 이하가 되면 직각으로 예측
    - 위 알고리즘을 적용하여 0도부터 315도까지 8까지 각도로 예측 가능

4. 어려웠던 부분
    - 그리퍼가 묘삼을 잡기 위해서는 묘삼의 각도를 도출해야했다. 하지만 기존 모델들 중에서는
      객체의 각도를 추론하는 모델이 없었다. 그래서 기존 모델을 튜닝하여 각도를 도출하는
      알고리즘을 개발해야 했던 부분이 어려웠다.

5. 아쉬운 부분
    - 카메라와 컨베이어 벨트사이의 좌표 맵핑  
    - 45도 단위보다 정교한 각도 도출 알고리즘 개발
    
- yolo v5 포크 (https://github.com/choiyun9yu/yolov5)

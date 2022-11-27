# 동영상 내의 얼굴 인식

import cv2
import numpy as np
import face_recognition as fr
import os

# 얼굴 특징을 추출하는 함수
def encodeFun(img_paths):
    ecode_list = []
    for img_path in img_paths:
        encode = fr.face_encodings(img_path)[0]
        encode_list.append(encode)
    return encode_list

path='./image/face_info/'

# 이미지 데이터베이스의 이미지 리스트
images = []
# 이미지 라벨
className = []

# 폴더의 이미지 목록 가져오기
myList = os.listdir(path)

# 이미지 목록을 읽어서 파일명과 클래스 이름을 저장
for c in myList:
    curimg = cv2.imread(f'{path}/{c}')
    curimg = cv2.cvtColor(curimg, cv2.COLOR_BGR2RGB)
    images.append(curimg)
    #파이명에서 확장자 제거하고 파일명만 클래스 이름으로 저장
    className.append(os.path.splitext(c)[0])
    
# 폴더에 있는 얼굴 이미지 인코딩 (얼굴 DB)
encodeListKnown = encodeFun(images)


# print(className)

cap = cv2.VideoCapture("./image/ellon.mp4")

while cap.isOpened():
    ret, frame=cap.read()
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    if not ret:
        continue
    
    # 얼굴 크기 25%로 리사이즈
    imgS = cv2.resize(frame, (0,0), None, 0.25, 0,25)
    
    #동영상에서 얼굴 위치정보를 추출하고 해당 얼굴을 비교하기 위해서 인코딩
    faceCurFrame = fr.face_locations(imgS)
    encodesCurFrame = fr.face_encodings(imgS, faceCurFrame)
    
    # 동영상의 얼굴과 얼굴 DB의 정보를 비교
    for encodeFace, faceLoc in zip(encodesCurFrame, faceCurFrame):
        matches = fr.compare_faces(encodeListKnown, encodeFace)
        faceDis = fr.face_distance(encodeListKnown, encodeFace)
        
        # argmin() : 거리값이 최소인 값의 인덱스를 반환
        matchindex = np.argmin(faceDis)
        
        # DB의 얼굴과 동일한 얼굴이 있다면
        if matches[matchindex] :
            y1, x2, y2, x1 = faceLoc
            # 25%로 줄였기 때문에 좌표를 원래대로 복구 (계산하려고 줄였고 계산 끝났으니까 원래로 복구)
            y1, x2, y2, x1 = y1*4, x2*4, y2*4, x1*4
            
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0,255,0), 2)
            
            cv2.putText(frame, className[matchindex], (x1+6, y2-6),
                        cv2.FONT_HERSHEY_COMPLEX, 1, (255,255,255), 2)
            
            cv2.imshow("detect face", frame)
            
            key = cv2.waitKey(33)
            
            if key == 49:
                break
    
cap.release()
cv2.destroyAllWindows()
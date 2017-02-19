import cv2

webcam = cv2.VideoCapture(0)
webcam.set(cv2.cv.CV_CAP_PROP_FRAME_WIDTH,320)
webcam.set(cv2.cv.CV_CAP_PROP_FRAME_HEIGHT,240)

#等待webcam開機黑屏
for j in range(1,15):
    img = webcam.read()[1]

img = webcam.read()[1]
cv2.imwrite('./img.png', img)

print("photo taken")

import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const WebcamPage = () => {
    const modelLoaded = useRef(false);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [initialTime, setInitialTime] = useState(null);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const capturePhoto = (photoNumber) => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (window.opener && !window.opener.closed) {
            window.opener.receivePhotoFromWebcam(imageSrc,photoNumber);
        }
    };

    useEffect(() => {
        let countdown = 3;
        let photoCount = 0;
        let countdownStarted = false;
        let timeoutId = null;

        const loadModels = async () => {
            await faceapi.loadTinyFaceDetectorModel('/models');
        };

        const video = webcamRef.current.video;
        const canvas = canvasRef.current;
        // const displaySize = faceapi.matchDimensions(canvas, { width: video.videoWidth, height: video.videoHeight });
        const displaySize = { width: video.offsetWidth, height: video.offsetHeight };
        faceapi.matchDimensions(canvas, displaySize);

        const detectAndDraw = async () => {
            if (!webcamRef.current || !canvasRef.current) return;

            if (video.readyState >= 4) {
                const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
                const resizedDetections = faceapi.resizeResults(detections, displaySize);

                // 清除上一帧的绘制
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

                if (detections.length > 0 && photoCount < 3) {
                    if (!countdownStarted) {
                        countdownStarted = true;

                        // 每秒更新倒计时并重新检测人脸
                        timeoutId = setInterval(() => {
                            if (countdown > 0) {
                                countdown -= 1;
                                console.log(countdown);
                            } else {
                                clearInterval(timeoutId);
                                capturePhoto(photoCount);
                                photoCount += 1;
                                countdown = 3;
                                countdownStarted = false;
                                console.log('Photo captured',photoCount);
                                if (photoCount === 3) {
                                    if (window.opener && !window.opener.closed) {
                                        window.close();  // 拍摄完成后关闭窗口
                                    }
                                    return;
                                }
                            }
                        }, 1000);
                    }
                    // 绘制边界框
                    faceapi.draw.drawDetections(canvas, resizedDetections);
                } else {
                    // 如果没有检测到人脸，重置倒计时和状态
                    if (countdownStarted) {
                        clearInterval(timeoutId);
                        countdown = 3;
                        countdownStarted = false;
                        console.log('Countdown reset');
                    }
                }
            }
            // 请求下一帧
            requestAnimationFrame(detectAndDraw);
        };

        loadModels().then(detectAndDraw);

        return () => {
            clearInterval(timeoutId); // 清理定时器
        };
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh", width:"100vw"}}>
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/png"
                style={{ width: "100%", height: "100%" }}
                videoConstraints={videoConstraints}
            />
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }}
            />
            {/* <button onClick={capturePhoto}>Capture Photo</button> */}
        </div>
    );
};

export default WebcamPage;

import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const WebcamPage = () => {
    const webcamRef = useRef(null);
    const [initialTime, setInitialTime] = useState(null);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const capturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (window.opener && !window.opener.closed) {
            window.opener.receivePhotoFromWebcam(imageSrc);
            window.close();
        }
    };

    useEffect(() => {
        const loadModels = async () => {
            console.log(faceapi.nets)
            // await faceapi.nets.mtcnn.load('/models');
            // await faceapi.loadMtcnnModel('/models');
            // await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
            // await faceapi.nets.mtcnn.loadFromUri('/models');
            // await faceapi.nets.ssdMobilenetv1.load('/models');
            await faceapi.loadTinyFaceDetectorModel('/models');
            // const MODEL_URL = process.env.PUBLIC_URL + '/models';
            // await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
            // await faceapi.nets.loadTinyFaceDetectorModel.loadFromDisk('./models')
        //   await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        };

        loadModels();
        let timeoutId;
        let countdown = 5; // 初始倒计时时间为 5 秒
        const intervalId = setInterval(async () => {
            if (!webcamRef.current) return;
            const video = webcamRef.current.video;
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
            console.log(detections)
            if (detections.length > 0) {
                if (!timeoutId) {
                    // 如果没有设置过定时器，则设置一个在 5 秒后触发的定时器
                    timeoutId = setInterval(() => {
                        countdown -= 1;
                        console.log(countdown);
                        if (countdown === 0) {
                            clearInterval(timeoutId);
                            capturePhoto();
                            clearInterval(intervalId);
                        }
                    }, 1000);
                    console.log('Countdown started');
                }
            } else {
                // 如果没有检测到人脸，则取消定时器
                clearInterval(timeoutId);
                timeoutId = null;
                countdown = 5;
                console.log('Countdown stopped');
            }
        }, 1000);

        return () => clearInterval(intervalId); // Clean up
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh", width:"100vw"}}>
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/png"
                style={{ width: "100%", height: "auto" }}
                videoConstraints={videoConstraints}
            />
            {/* <button onClick={capturePhoto}>Capture Photo</button> */}
        </div>
    );
};

export default WebcamPage;

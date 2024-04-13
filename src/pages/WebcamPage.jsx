import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const WebcamPage = () => {
    const modelLoaded = useRef(false);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [initialTime, setInitialTime] = useState(null);

    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const capturePhoto = (photoNumber) => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (window.opener && !window.opener.closed) {
            if(type === "register") window.opener.receivePhotoFromWebcam(imageSrc,photoNumber);
            else if(type === "recognition"){
                window.opener.receivePhotoFromWebcam(imageSrc,photoNumber);
            }
        }
    };

    useEffect(() => {
        let countdown = 3;
        let photoCount = 3;
        if(type === "recognition") photoCount = 1;
        let countdownStarted = false;
        let timeoutId = null;

        const loadModels = async () => {
            await faceapi.loadTinyFaceDetectorModel('/models');
        };

        const video = webcamRef.current.video;
        const canvas = canvasRef.current;
        const displaySize = { width: video.offsetWidth, height: video.offsetHeight };
        faceapi.matchDimensions(canvas, displaySize);

        const detectAndDraw = async () => {
            if (!webcamRef.current || !canvasRef.current) return;

            if (video.readyState >= 4) {
                const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
                const resizedDetections = faceapi.resizeResults(detections, displaySize);

                // clear previous draw
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

                if (detections.length > 0 && photoCount > 0) {
                    if (!countdownStarted) {
                        countdownStarted = true;

                        // if the count reset then redo the detection
                        timeoutId = setInterval(() => {
                            if (countdown > 0) {
                                countdown -= 1;
                                // console.log(countdown);
                            } else {
                                clearInterval(timeoutId);
                                capturePhoto(photoCount);
                                // console.log('Photo captured',photoCount);
                                photoCount -= 1;
                                countdown = 3;
                                countdownStarted = false;
                                if (photoCount === 0) {
                                    if (window.opener && !window.opener.closed) {
                                        window.close();
                                    }
                                    return;
                                }
                            }
                        }, 1000);
                    }
                    faceapi.draw.drawDetections(canvas, resizedDetections);
                } else {
                    // if didn't detect face, reset countdown
                    if (countdownStarted) {
                        clearInterval(timeoutId);
                        countdown = 3;
                        countdownStarted = false;
                        // console.log('Countdown reset');
                    }
                }
            }
            // Request for next frame
            requestAnimationFrame(detectAndDraw);
        };

        loadModels().then(detectAndDraw);

        return () => {
            clearInterval(timeoutId);
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
        </div>
    );
};

export default WebcamPage;

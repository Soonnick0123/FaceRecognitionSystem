import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamPage = () => {

    const webcamRef = useRef(null);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const capturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (window.opener && !window.opener.closed) {
            window.opener.receivePhotoFromWebcam(imageSrc);
            window.close(); // 可选，拍照后关闭窗口
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh", width:"100vw"}}>
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/png"
                style={{ width: "100%", height: "auto" }}
                
            />
            <button onClick={capturePhoto}>Capture Photo</button>
        </div>
    );
};

export default WebcamPage;

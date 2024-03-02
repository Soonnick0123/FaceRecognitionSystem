import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function About() {
    const [message, setMessage] = useState('');
    const [hostName, setHostName] = useState('');


    useEffect(() => {
        setHostName(window.location.hostname);
        axios.post('http://127.0.0.1:8000/RecognitionApp/secondFunction')
            .then(response => {
                setMessage(response.data.message);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div>
        <h1>About Page</h1>
        <p>{message}</p>
        </div>
    );
}
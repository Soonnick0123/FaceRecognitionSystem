import { useState, useEffect } from 'react'
import { FiAlignJustify } from "react-icons/fi";
import '../App.css';
import LoadingScreen from '../assets/components/LoadingScreen';
import SideBar from '../assets/components/SideBar';
import axios from 'axios';


export default function About() {
    const [message, setMessage] = useState('');
    const [hostName, setHostName] = useState('');
    const [mounted, setMounted] = useState(false);
    const serverURL = "http://127.0.0.1:8000/RecognitionApp"

    const secondFunction=()=>{
        setHostName(window.location.hostname);
        axios.post(`${serverURL}/secondFunction`)
            .then(response => {
                setMessage(response.data.message);
        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        secondFunction();
        setMounted(true);
    }, []);

    if(mounted){
        return(
            <div className='container'>
                <SideBar />
            </div>
        )
    }
}
import { useState, useEffect } from 'react'
import '../App.css';
import LoadingScreen from '../assets/components/LoadingScreen';
import SideBar from '../assets/components/SideBar';
import Illustration from '../assets/illustration/illustation1.png';
import axios from 'axios';


export default function About() {
    const [message, setMessage] = useState('');
    const [hostName, setHostName] = useState('');
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
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
            <>
                <style>
                    {`
                        .box {
                            width: 50%;
                            height: 100%;
                            position: relative;
                            display: flex;
                            justify-content: center;
                            flex-direction: column;
                            padding-left: 2%;

                        .title {
                            width: 100%;
                            position: relative;
                            display: flex;
                            align-items: center;
                            height: 50px;

                            .block {
                                width: 0%;
                                height: inherit;
                                background: #ad99fb;
                                position: absolute;
                                animation: mainBlock 2s cubic-bezier(.74, .06, .4, .92) forwards;
                                display: flex;
                            }

                            h1 {
                                font-family: 'Poppins';
                                color: #fff;
                                -webkit-animation: mainFadeIn 2s forwards;
                                -o-animation: mainFadeIn 2s forwards;
                                animation: mainFadeIn 2s forwards;
                                animation-delay: 1.6s;
                                opacity: 0;
                                display: flex;
                                align-items: baseline;
                                position: relative;

                                span {
                                    width:0px;
                                    height: 0px;
                                    -webkit-border-radius: 50%;
                                    -moz-border-radius: 50%;
                                    border-radius: 50%;

                                    background: #ad99fb;
                                    -webkit-animation: load 0.6s cubic-bezier(.74, .06, .4, .92) forwards;
                                    animation: popIn 0.8s cubic-bezier(.74, .06, .4, .92) forwards;
                                    animation-delay: 2s;
                                    margin-left: 5px;
                                    margin-top: -10px;
                                    position: absolute;
                                    bottom: 13px;
                                    right: -12px;

                                }
                            }
                        }

                        .role {
                            position: relative;
                            display: flex;
                            align-items: center;
                            height: 30px;

                            .block {
                                width: 0%;
                                height: inherit;
                                background: #ad99fb;
                                position: absolute;
                                animation: secBlock 2s cubic-bezier(.74, .06, .4, .92) forwards;
                                animation-delay: 2s;
                                display: flex;
                            }

                            p {
                                animation: secFadeIn 2s forwards;
                                animation-delay: 3.2s;
                                opacity: 0;
                                    font-weight: 400;
                                font-family: 'Lato';
                                color: #ffffff;
                                font-size: 12px;
                                text-transform: uppercase;
                                letter-spacing: 5px;
                            }
                        }
                        }

                        .illustration {
                            opacity: 0;
                            animation: thirdFadeIn 2s forwards;
                            animation-delay: 4.2s;
                        }


                        .material-symbols-outlined {
                            font-size: 25px;
                        }

                        .btn-1 {
                            background: #0F0F6D;
                            color: #ffffff;
                            font-family: 'Poppins';
                            font-weight: bold;
                            cursor: pointer;
                            font-size: 1em;
                            padding: 1.5rem;
                            border: 0;
                            transition: all 0.5s;
                            border-radius: 10px;
                            width: auto;
                            position: relative;
                            user-select: none;
                            animation: thirdFadeIn 2s forwards;
                            animation-delay: 4.2s;
                            opacity: 0;

                            span {
                                position: absolute;
                                left: 75%;
                                top: 31%;
                                right: 5%;
                                bottom: 0;
                                opacity: 0;
                            }

                            &:hover {
                                background: #2b2bff;
                                transition: all 0.5s;
                                border-radius: 10px;
                                box-shadow: 0px 6px 15px #0000ff61;
                                padding: 1.5rem 3.5rem 1.5rem 1.5rem;

                                span {
                                    opacity: 1;
                                    transition: all 0.5s;
                                }
                            }


                        }

                        @keyframes mainBlock {
                            0% {
                                width: 0%;
                                left: 0;

                            }
                            50% {
                                width: 100%;
                                left: 0;

                            }
                            100% {
                                width: 0;
                                left: 100%;
                            }
                        }

                        @keyframes secBlock {
                            0% {
                                width: 0%;
                                left: 0;

                            }
                            50% {
                                width: 100%;
                                left: 0;

                            }
                            100% {
                                width: 0;
                                left: 100%;
                            }
                        }

                        @keyframes mainFadeIn {
                            0% {
                                opacity: 0;
                            }
                            100% {
                                opacity: 1;
                            }
                        }


                        @keyframes popIn {
                            0% {
                                width: 0px;
                                height: 0px;
                                border: 0px solid #ddd;
                                opacity: 0;
                            }
                            50% {
                                width: 10px;
                                height: 10px;
                                opacity: 1;
                                bottom: 45px;
                            }
                                65% {
                                width: 7px;
                                height: 7px;
                                bottom: 0px;
                                width: 15px
                                }
                                80% {
                                width: 10px;
                                height: 10px;
                                bottom: 20px
                                }
                            100% {
                                width: 7px;
                                height: 7px;
                                border: 0px solid #222;
                                bottom: 13px;

                            }
                        }

                        @keyframes secFadeIn {
                            0% {
                                opacity: 0;
                            }
                            100% {
                                opacity: 0.8;
                            }
                        }

                        @keyframes thirdFadeIn {
                            0% {
                                opacity: 0;
                            }
                            100% {
                                opacity: 0.8;
                            }
                        }
                    `}
                </style>

                <div className='container'>
                    {loading && <LoadingScreen zIndex={2}/>}
                    <SideBar currentPage={'home'} />

                    <div className='second-container'>
                        <div className='box'>
                            <div className="title">
                                <span className="block"></span>
                                <h1 style={{fontSize: window.innerWidth<1700?"30px":"45px"}}>Face Recognition Authentication<span></span></h1>
                            </div>

                            <div className="role" style={{width: window.innerWidth<1700?"75%":"60%"}}>
                                <div className="block"></div>
                                <p>In Customer Relationship Management</p>
                            </div>

                            <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"5%"}}>
                                <div className="btn-1">Learn More<span className="material-symbols-outlined">book</span></div>
                            </div>

                        </div>

                        <div style={{width:"50%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <img className='illustration' src={Illustration} style={{userSelect:"none"}}/>
                        </div>
                    </div>

                    <ul className="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>

                </div>
            </>
        )
    }
}
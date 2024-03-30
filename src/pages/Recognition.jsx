import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Modal, Button, Form} from 'react-bootstrap';
import { MdLinkedCamera, MdCameraAlt } from "react-icons/md";
import LoadingScreen from '../assets/components/LoadingScreen';
import Illustration from '../assets/illustration/illustation1.png';
import SideBar from '../assets/components/SideBar';

export default function About() {
    const [message, setMessage] = useState('');
    const [hostName, setHostName] = useState('');
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cameraIsHovered, setCameraIsHovered] = useState(false);
    const [startCapture, setStartCapture] = useState(false);
    const [viewInfo, setViewInfo] = useState(false);
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
        return (
            <>
                <style jsx>
                    {`
                        .camera-button{
                            transition: all 0.5s;
                            padding:30px;
                            width:300px;
                            height:300px;
                            box-shadow:0 0 32px 7.5px #11a9ec;

                            &:hover {
                                box-shadow:0 0 32px 7.5px #2b2bff;
                                padding: 50px;
                                scale:1.5;
                            }
                        }

                        .fade-in {
                            opacity: 1;
                        }

                        .fade-out {
                            opacity: 0;
                        }

                        .container-fade-in{
                            z-index: 1;
                            opacity: 1;
                        }

                        .container-fade-out{
                            opacity: 0;
                            z-index: 0;
                        }

                        .waitingdot{
                            display: flex;
                            flex-direction: row;
                            gap: 15px;
                            margin-bottom: 0px;
                            margin-top: auto;
                            color: gray;
                        }

                        .waitingdot li{
                            animation: pop 1s infinite;
                        }

                        .waitingdot li:nth-child(1){
                            animation-delay: 0s;
                        }

                        .waitingdot li:nth-child(2){
                            animation-delay: 0.25s;
                        }

                        .waitingdot li:nth-child(3){
                            animation-delay: 0.5s;
                        }


                        @keyframes pop {

                            0%{
                                opacity: 1;
                            }

                            100%{
                                opacity: 0;
                            }

                          }
                    `}
                </style>

                {loading && <LoadingScreen zIndex={2}/>}

                <div className='frs-container'>
                    <SideBar currentPage={'recognition'}/>

                    <div className='frs-second-container'>

                        <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",overflowX:"hidden"}}>

                            <div className={`${startCapture ? 'container-fade-out' : 'container-fade-in'}`} style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"15%",position:"absolute",left:0,transition:"all 0.5s",paddingLeft:60}}>
                                <div className='camera-button' style={{borderRadius:"50%",background:"rgba(255, 255, 255, 0.4)",position:"relative",cursor:"pointer"}} onMouseOver={()=>setCameraIsHovered(true)} onMouseLeave={()=>setCameraIsHovered(false)} onClick={()=>setStartCapture(true)}>
                                    <MdLinkedCamera className={`${cameraIsHovered ? 'fade-in' : 'fade-out'}`} style={{width:150,height:150,alignSelf:"center",color:"#2b2bff",position:"absolute",top:"25%",left:"25%"}}/>
                                    <MdCameraAlt className={`${cameraIsHovered ? 'fade-out' : 'fade-in'}`} style={{width:150,height:150,alignSelf:"center",color:"#0F0F6D",position:"absolute",top:"25%",left:"25%"}}/>
                                </div>

                                <div style={{fontSize: window.innerWidth<1700?"30px":"45px",fontWeight:"bold",fontFamily:"Poppins",color: "#fff"}}>Start Recognition</div>
                            </div>

                            <div className={`${startCapture ? 'container-fade-in' : 'container-fade-out'}`} style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"absolute",left:0,transition:"all 0.5s",paddingLeft:60}}>
                                <div style={{height:"86%",background:"rgba(255, 255, 255, 0.85)",borderRadius:"20px",padding:25,position:"absolute"}}>
                                    {/* 待定 */}
                                    {/* <div style={{width:"50vw",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                        <div style={{display:"flex",flexDirection:"row"}}>
                                            <div style={{fontSize:"2rem",fontWeight:"bold",color:"gray",fontFamily:"Poppins"}}>Wait for Recognition</div>
                                            <ul className='waitingdot'>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                    </div> */}

                                    <div style={{height:"100%",display:"flex",flexDirection:"row",gap:10,transition:"all 0.5s"}}>
                                        <div style={{width:"40vw",display:"flex",flexDirection:"column",gap:20,padding:15,overflow:"auto"}}>

                                            <div style={{width:"100%",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                                                <Button variant="secondary" onClick={()=>setStartCapture(false)}>
                                                    &lt; Back
                                                </Button>
                                                <Button variant="primary" disabled>
                                                    <MdCameraAlt/> Reopen Camera
                                                </Button>
                                            </div>

                                            <div style={{display:"flex",flexDirection:"row",gap:5,boxShadow:"rgba(0, 0, 0, 0.1) 5px 3px 12px 3px",padding:10,borderRadius:10}}>
                                                <img src={Illustration} style={{userSelect:"none",width:"80px",height:"80px",borderRadius:"50%",alignSelf:"center"}}/>

                                                <div style={{display:"flex",flexDirection:"row",width:"84%",height:"100%",alignItems:"center",justifyContent:"space-between",paddingLeft:10}}>
                                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontWeight:"bold",fontSize:"1.3rem"}}>
                                                        Name
                                                    </div>

                                                    <div style={{display:"flex",flexDirection:"column",gap:5,padding:"10px 0px"}}>
                                                        <Button variant="primary" onClick={()=>setViewInfo(true)}>
                                                            View
                                                        </Button>
                                                        <Button variant="danger">
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{width:viewInfo?"25vw":0,transition:"width 0.5s, opacity 0.3s",opacity:viewInfo?1:0,borderLeft:"solid lightgrey",padding:10,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                                            <img className='illustration' src={Illustration} style={{userSelect:"none",maxWidth:"90%",maxHeight:"50%"}}/>

                                            <div style={{display:"flex",flexDirection:"column",gap:5}}>
                                                <div style={{fontWeight:"bold",fontSize:"1.5rem"}}>Name:</div>
                                                <div>John Bryan Leee</div>
                                            </div>

                                            <div style={{display:"flex",flexDirection:"column",gap:5}}>
                                                <div style={{fontWeight:"bold",fontSize:"1.5rem"}}>Email:</div>
                                                <div>example@.gmail.com</div>
                                            </div>

                                            <div style={{display:"flex",flexDirection:"column",gap:5}}>
                                                <div style={{fontWeight:"bold",fontSize:"1.5rem"}}>Phone:</div>
                                                <div>+60123456789</div>
                                            </div>

                                            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"flex-end"}}>
                                                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                                                    <div style={{fontWeight:"bold",fontSize:"1.5rem"}}>Gender:</div>
                                                    <div>Male</div>
                                                </div>

                                                <Button variant="secondary" style={{height:"65%"}} onClick={()=>setViewInfo(false)}>
                                                    Close
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul class="frs-circles">
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
        );
    }
}
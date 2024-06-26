import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {Modal, Button, Form} from 'react-bootstrap';
import { MdLinkedCamera, MdCameraAlt } from "react-icons/md";
import LoadingScreen from '../assets/components/LoadingScreen';
import SideBar from '../assets/components/SideBar';
import toastr from 'toastr';
import qs from 'qs';

export default function About() {
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [cameraIsHovered, setCameraIsHovered] = useState(false);
    const [startCapture, setStartCapture] = useState(false);
    const [viewInfo, setViewInfo] = useState(false);
    const [openCameraHover, setOpenCameraHover] = useState(false);

    const [recordList, setRecordList] = useState([]);
    const [customerInfo, setCustomerInfo] = useState([]);
    // const [waitingForRecognition, setWaitingForRecognition] = useState(false);

    const hostName = window.location.hostname;

    let serverURL;
    if(["localhost", "127.0.0.1"].includes(hostName)){
        serverURL = 'http://127.0.0.1:8000/RecognitionApp'
    }
    else{
        serverURL = 'https://soonnick.com/RecognitionApp'
    }

    const webcamWindowRef = useRef(null);
    let waitingForRecognition = false;

    const webcamWindowControl = (control) => {
        setWaiting(true);
        if (control === "open" && !webcamWindowRef.current) {
            webcamWindowRef.current = window.open('/webcam?type=recognition', 'webcamWindow', 'width=950,height=530');
            waitingForRecognition = true;
        } else if (control === "close" && webcamWindowRef.current) {
            webcamWindowRef.current.close();
            webcamWindowRef.current = null;
            setWaiting(false);
        } else{
            setWaiting(false);
        }
    };

    const getLoginRecord=()=>{
        setWaiting(true);
        axios.post(`${serverURL}/getLoginRecord`)
            .then(response => {
                setRecordList(response.data.recordList);
                setWaiting(false);
        })
        .catch(error => {
            if(error.response){
                toastr.error(error, 'Something went Wrong!');
                setWaiting(false);
                return
            }
            toastr.error(error, 'Something went Wrong!');
            setWaiting(false);
        });
    }

    const timeSince=(dateString)=> {
        const date = new Date(dateString);
        const seconds = Math.floor((Date.now() - date) / 1000);

        let interval = seconds / 3600;
        if (interval < 1) {
            interval = seconds / 60;
            if (interval < 1) {
                if(seconds <= 1) return seconds + " second ago";
                return seconds + " seconds ago";
            }
            if (interval < 2) return Math.floor(interval) + " minute ago";
            return Math.floor(interval) + " minutes ago";
        }
        if (interval < 2) return Math.floor(interval) + " hour ago";
        return Math.floor(interval) + " hours ago";
    }

    const deleteRecord=(recordId)=> {
        setLoading(true);
        const payload = {
            recordId: recordId
        };
        axios
            .post(`${serverURL}/deleteRecord`,qs.stringify(payload),{timeout:15000})
            .then(async response => {
                getLoginRecord();
                setLoading(false);
                toastr.success('Delete Record Successful!', 'Success');
            })
            .catch(error => {
                if(error.response){
                    if (error.response.status == 420) {
                        toastr.error("Record not exist!", 'Something went Wrong!');
                        setLoading(false);
                        return
                    }
                    else {
                        toastr.error(error, 'Something went Wrong!');
                        setLoading(false);
                        return
                    }
                }
                toastr.error(error, 'Something went Wrong!');
                setLoading(false)
            });
    }

    useEffect(() => {
        getLoginRecord();

        window.receivePhotoFromWebcam = (photoData) => {
            waitingForRecognition = true;
            const formData = new FormData();
            formData.append("photo", photoData);

            axios
                .post(`${serverURL}/webcamRecognition`,formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },timeout:15000})
                .then(async response => {
                    getLoginRecord();
                    toastr.success('Our Member!', 'Welcome');
                    setWaiting(false);
                    waitingForRecognition = false;
                })
                .catch(error => {
                    if(error.response){
                        if (error.response.status == 420) {
                            toastr.error("Not a Member", 'Recognigtion Fail!');
                            setWaiting(false);
                            waitingForRecognition = false;
                            return
                        }
                        else if (error.response.status == 440) {
                            toastr.error(error.response.data.error, 'Something went Wrong!');
                            setWaiting(false);
                            waitingForRecognition = false;
                            return
                        }
                        else {
                            toastr.error(error, 'Something went Wrong!');
                            setWaiting(false);
                            waitingForRecognition = false;
                            return
                        }
                    }
                    toastr.error(error, 'Something went Wrong!');
                    setWaiting(false);
                    waitingForRecognition = false;
            });
        };
        setMounted(true);
        return () => {
            delete window.receivePhotoFromWebcam;
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (webcamWindowRef.current && webcamWindowRef.current.closed && !waitingForRecognition) {
                setWaiting(false);
                webcamWindowRef.current = null;
            }
        }, 1000);

        return () => clearInterval(interval);
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

                        .bubble {
                            height: auto;
                            width: 355px;
                            background: white;
                            display: block;
                            border-radius: 20px;
                            text-align: center;
                            color: black;
                            z-index: 1;
                            padding: 5px;
                            font-size: 0.8rem;

                            p {
                                margin: 0px;
                            }
                        }

                        .pointer {
                            height: 20px;
                            width: 20px;
                            background: white;
                            margin: 0 auto;
                            transform: rotate(45deg);
                            border-radius: 0 0 2px 0;
                            margin-top: -10px;
                            position: relative;
                            left: 0.5vw;
                            z-index: -1;
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

                                <div className='camera-button' style={{borderRadius:"50%",background:"rgba(255, 255, 255, 0.4)",position:"relative",cursor:"pointer"}} onMouseOver={()=>setCameraIsHovered(true)} onMouseLeave={()=>setCameraIsHovered(false)} onClick={()=>{setStartCapture(true);getLoginRecord()}}>
                                    <MdLinkedCamera className={`${cameraIsHovered ? 'fade-in' : 'fade-out'}`} style={{width:150,height:150,alignSelf:"center",color:"#2b2bff",position:"absolute",top:"25%",left:"25%"}}/>
                                    <MdCameraAlt className={`${cameraIsHovered ? 'fade-out' : 'fade-in'}`} style={{width:150,height:150,alignSelf:"center",color:"#0F0F6D",position:"absolute",top:"25%",left:"25%"}}/>
                                </div>

                                <div style={{fontSize: window.innerWidth<1700?"30px":"45px",fontWeight:"bold",fontFamily:"Poppins",color: "#fff"}}>Start Recognition</div>
                            </div>

                            <div className={`${startCapture ? 'container-fade-in' : 'container-fade-out'}`} style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"absolute",left:0,transition:"all 0.5s",paddingLeft:60}}>
                                <div style={{height:"86%",background:"rgba(255, 255, 255, 0.85)",borderRadius:"20px",padding:"15px 0px 25px 25px",position:"absolute"}}>
                                    {/* 待定 */}
                                    {
                                        waiting?
                                        <div style={{width:"50vw",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                            <div style={{display:"flex",flexDirection:"row"}}>
                                                <div style={{fontSize:"2rem",fontWeight:"bold",color:"gray",fontFamily:"Poppins"}}>Wait for Recognition</div>
                                                <ul className='waitingdot'>
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                </ul>
                                            </div>
                                        </div>
                                        :
                                        <div style={{height:"100%",display:"flex",flexDirection:"row",transition:"all 0.5s"}}>
                                            <div style={{width:"40vw",display:"flex",flexDirection:"column",gap:20,padding:15}}>

                                                <div style={{width:"100%",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                                                    <Button variant="secondary" onClick={()=>{setStartCapture(false);webcamWindowControl("close")}}>
                                                        &lt; Back
                                                    </Button>
                                                    <Button onClick={()=>webcamWindowControl("open")}>
                                                        <MdCameraAlt/> Open Camera
                                                        {/* {
                                                            openCameraHover &&
                                                                <div style={{position:"absolute",top:"-240%",left:"-80%"}} onMouseOver={()=>setOpenCameraHover(true)} onMouseLeave={()=>setOpenCameraHover(false)}>
                                                                    <div class="bubble"><p>Due to server performance issues, this feature is currently unavailable. If you would like to experience this feature, please visit my <a href="https://github.com/Soonnick0123?tab=repositories" target="_blank">GitHub repository</a>.</p></div>
                                                                    <div class="pointer"></div>
                                                                </div>
                                                        } */}
                                                    </Button>
                                                </div>

                                                <div style={{width:"100%",display:"flex",flexDirection:"column",gap:20,overflow:"auto",padding:10}}>
                                                    {
                                                        recordList &&
                                                            recordList.map((record)=>{
                                                                return(
                                                                    <div style={{display:"flex",flexDirection:"row",gap:5,boxShadow:"rgba(0, 0, 0, 0.1) 5px 3px 12px 3px",padding:10,borderRadius:10}}>
                                                                        <img src={record.customer.photo1_url} style={{userSelect:"none",width:"80px",height:"80px",borderRadius:"50%",alignSelf:"center",objectFit:"cover"}}/>

                                                                        <div style={{display:"flex",flexDirection:"row",width:"84%",height:"100%",alignItems:"center",justifyContent:"space-between",paddingLeft:10}}>
                                                                            <div style={{width:"100%",display:"flex",flexDirection:"column",fontWeight:"bold",fontSize:"1.3rem",gap:5}}>
                                                                                <div style={{fontWeight:"bold",fontSize:"1.0rem"}}>{record.customer.name}</div>
                                                                                <div style={{fontWeight:"bold",fontSize:"0.8rem",color:"grey"}}>{timeSince(record.login_time)}</div>
                                                                            </div>

                                                                            <div style={{display:"flex",flexDirection:"column",gap:5,padding:"10px 0px"}}>
                                                                                <Button variant="primary" onClick={()=>{setViewInfo(true);setCustomerInfo(record.customer)}}>
                                                                                    View
                                                                                </Button>
                                                                                <Button variant="danger" onClick={()=> deleteRecord(record.id)}>
                                                                                    Remove
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                    }
                                                </div>
                                            </div>

                                            <div style={{width:viewInfo?"25vw":0,transition:"width 0.5s, opacity 0.3s",opacity:viewInfo?1:0,borderLeft:"solid lightgrey",padding:10,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                                                <img className='illustration' src={customerInfo.photo1_url} style={{userSelect:"none",maxWidth:"90%",maxHeight:"50%",objectFit:"cover"}}/>

                                                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                                                    <div style={{fontWeight:"bold",fontSize:"1.5rem"}}>Name:</div>
                                                    <div>{customerInfo.name}</div>
                                                </div>

                                                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                                                    <div style={{fontWeight:"bold",fontSize:"1.5rem"}}>Email:</div>
                                                    <div>{customerInfo.email}</div>
                                                </div>

                                                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                                                    <div style={{fontWeight:"bold",fontSize:"1.5rem"}}>Phone:</div>
                                                    <div>{customerInfo.phone}</div>
                                                </div>

                                                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"flex-end"}}>
                                                    <div style={{display:"flex",flexDirection:"column",gap:5}}>
                                                        <div style={{fontWeight:"bold",fontSize:"1.5rem"}}>Gender:</div>
                                                        <div>{customerInfo.gender}</div>
                                                    </div>

                                                    <Button variant="secondary" style={{height:"65%"}} onClick={()=>setViewInfo(false)}>
                                                        Close
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul className="frs-circles">
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
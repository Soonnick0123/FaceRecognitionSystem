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
                    `}
                </style>

                {/* <Modal show={registerCustomerModel} onHide={()=> setRegisterCustomerModel(false)} size="lg" aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Add Customer</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div style={{width:"100%",height:"100%",padding:10,display:"flex",flexDirection:"column",gap:10}}>

                            <Form>
                                <Form.Group className="mb-3" controlId="photoForm" style={{display:"flex",flexDirection:"column",width:"100%"}}>
                                    <Form.Label>Take a Photo</Form.Label>
                                    <MdAddAPhoto style={{width:100,height:100,alignSelf:"center",cursor:"pointer"}}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="jack"
                                        autoFocus
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="name@example.com"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="phone">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="+60123456789"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="gender">
                                    <Form.Label>Gender</Form.Label>
                                    <select class="form-select" id="genderSelect">
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Example textarea</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                            </Form>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>setRegisterCustomerModel(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={()=>setRegisterCustomerModel(false)}>
                            Add Customer
                        </Button>
                    </Modal.Footer>
                </Modal> */}

                {loading && <LoadingScreen zIndex={2}/>}

                <div className='frs-container'>
                <SideBar currentPage={'recognition'}/>

                <div className='frs-second-container'>

                    <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"15%"}}>

                        <div className='camera-button' style={{borderRadius:"50%",background:"rgba(255, 255, 255, 0.4)",position:"relative"}} onMouseOver={()=>setCameraIsHovered(true)} onMouseLeave={()=>setCameraIsHovered(false)}>
                            <MdLinkedCamera className={`${cameraIsHovered ? 'fade-in' : 'fade-out'}`} style={{width:150,height:150,alignSelf:"center",cursor:"pointer",color:"#2b2bff",position:"absolute",top:"25%",left:"25%"}}/>
                            <MdCameraAlt className={`${cameraIsHovered ? 'fade-out' : 'fade-in'}`} style={{width:150,height:150,alignSelf:"center",cursor:"pointer",color:"#0F0F6D",position:"absolute",top:"25%",left:"25%"}}/>
                        </div>

                        <div style={{fontSize: window.innerWidth<1700?"30px":"45px",fontWeight:"bold",fontFamily:"Poppins",color: "#fff"}}>Start Recognition</div>

                    </div>

                    {/* <div style={{width:"50%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <img src={Illustration} />
                    </div> */}
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
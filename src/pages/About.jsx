import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Modal, Button, Form} from 'react-bootstrap';
import LoadingScreen from '../assets/components/LoadingScreen';
import Illustration from '../assets/illustration/illustation1.png';
import SideBar from '../assets/components/SideBar';

export default function About() {
    const [message, setMessage] = useState('');
    const [hostName, setHostName] = useState('');
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);
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
                    {``}
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
                <SideBar />

                <div className='frs-second-container'>
                    <div style={{width:"50%",height:"100%"}}>
                        test
                    </div>

                    <div style={{width:"50%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <img src={Illustration} />
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
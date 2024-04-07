import React, { useState, useEffect } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import { MdAddAPhoto } from "react-icons/md";
import { IoPersonRemove } from "react-icons/io5";
import axios from 'axios';
import qs from 'qs';
import LoadingScreen from '../assets/components/LoadingScreen';
import SideBar from '../assets/components/SideBar';
import Illustration from '../assets/illustration/illustation1.png';
import toastr from 'toastr';

export default function Register() {
    const [message, setMessage] = useState('');
    const [hostName, setHostName] = useState('');
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [customerList, setCustomerList] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [takePhoto, setTakePhoto] = useState(null);


    const [registerCustomerModel, setRegisterCustomerModel] = useState(false);

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

    const getCustomerList=()=>{
        setLoading(true)
        axios.post(`${serverURL}/getCustomerList`)
            .then(response => {
                setCustomerList(response.data.customerList);
                setLoading(false)
        })
        .catch(error => {
            if(error.response){
                toastr.error(error, 'Something went Wrong!');
                setLoading(false)
                return
            }
            toastr.error(error, 'Something went Wrong!');
            setLoading(false)
        });
    }

    const handlePhotoChange = (event) => {
        if (event.target.files.length > 0) {
            setTakePhoto(event.target.files[0]);
        }
    };

    const registerCustomer=()=> {
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("gender", gender);
        formData.append("photo", takePhoto);

        axios
            .post(`${serverURL}/registerCustomer`,formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },timeout:15000})
            .then(async response => {
                setName('');
                setEmail('');
                setGender('');
                setPhone('');
                setTakePhoto(null);
                setRegisterCustomerModel(false);
                getCustomerList();
                setLoading(false);
                toastr.success('Add Customer Successful!', 'Success');
            })
            .catch(error => {
                if(error.response){
                    if (error.response.status == 460) {
                        toastr.error("This email have been existed!", 'Something went Wrong!');
                        setLoading(false);
                        return
                    }
                    else if (error.response.status == 490) {
                        toastr.error("Invalid Email", 'Something went Wrong!');
                        setLoading(false);
                        return
                    }
                    else if (error.response.status == 420) {
                        toastr.error(error.response.data.error, 'Something went Wrong!');
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
                setLoading(false);
            });
    }

    const deleteCustomer=(customerId)=> {
        setLoading(true);
        const payload = {
            customerId: customerId
        };
        axios
            .post(`${serverURL}/deleteCustomer`,qs.stringify(payload),{timeout:15000})
            .then(async response => {
                getCustomerList();
                setLoading(false);
                toastr.success('Delete Customer Successful!', 'Success');
            })
            .catch(error => {
                if(error.response){
                    if (error.response.status == 460) {
                        toastr.error("Customer not exist!", 'Something went Wrong!');
                        setLoading(false);
                        return
                    }
                    else if (error.response.status == 500) {
                        toastr.error(error.response.data.error, 'Something went Wrong!');
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
        getCustomerList();
        setMounted(true);
    }, []);

    if(mounted){
        return (
            <>
                <style jsx>
                    {`
                        .btn-1 {
                            background: #0F0F6D;
                            color: #ffffff;
                            font-family: 'Poppins';
                            font-weight: bold;
                            cursor: pointer;
                            font-size: 1em;
                            padding: 1rem;
                            border: 0;
                            transition: all 0.5s;
                            border-radius: 10px;
                            width: auto;
                            position: relative;
                            user-select: none;
                            animation: thirdFadeIn 2s forwards;
                            animation-delay: 4.2s;

                            span {
                                position: absolute;
                                left: 75%;
                                top: 27%;
                                right: 5%;
                                bottom: 0;
                                opacity: 0;
                            }

                            &:hover {
                                background: #2b2bff;
                                transition: all 0.5s;
                                border-radius: 10px;
                                box-shadow: 0px 6px 15px #0000ff61;
                                padding: 1rem 3rem 1rem 1rem;

                                span {
                                    opacity: 1;
                                    transition: all 0.5s;
                                }
                            }


                        }
                    `}
                </style>

                <Modal show={registerCustomerModel} onHide={()=> setRegisterCustomerModel(false)} size="lg" aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Add Customer</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div style={{width:"100%",height:"100%",padding:10,display:"flex",flexDirection:"column",gap:10}}>

                            <Form>
                                <Form.Group className="mb-3" controlId="photoForm" style={{display:"flex",flexDirection:"column",width:"100%"}}>
                                    <Form.Label>Take a Photo</Form.Label>
                                    {
                                        takePhoto?
                                            <img
                                            src={URL.createObjectURL(takePhoto)}
                                            style={{maxWidth:"100%",height:150,alignSelf:"center",cursor:"pointer"}}
                                            onLoad={() => URL.revokeObjectURL(takePhoto)}
                                            onClick={()=>document.getElementById('fileInput').click()}/>
                                        :
                                            <MdAddAPhoto style={{width:100,height:150,alignSelf:"center",cursor:"pointer"}}
                                            onClick={()=>document.getElementById('fileInput').click()}/>
                                    }
                                    <input type="file" id="fileInput" style={{display: "none"}} onChange={handlePhotoChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="jack"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoFocus
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="phone">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="+60123456789"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="gender">
                                    <Form.Label>Gender</Form.Label>
                                    <select class="form-select" value={gender} id="genderSelect" onChange={(e) => setGender(e.target.value)}>
                                        <option value="" disabled>Select...</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                </Form.Group>
                            </Form>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>setRegisterCustomerModel(false)}>
                            Close
                        </Button>
                        <Button variant="primary"
                            disabled={
                                !name.trim() ||
                                !email.trim() ||
                                !phone.trim() ||
                                !gender.trim() ||
                                !takePhoto
                            }
                            onClick={()=>{registerCustomer()}}>
                            Add Customer
                        </Button>
                    </Modal.Footer>
                </Modal>

                {loading && <LoadingScreen/>}

                <div className='frs-container'>
                <SideBar currentPage={'register'}/>

                <div className='frs-second-container'>

                    <div style={{width:"100%",height:"85%",margin:"4%",background:"rgba(255, 255, 255, 0.85)",borderRadius:"20px",display:"flex",flexDirection:"column",padding:25,gap:25}}>
                        <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                            <div style={{fontWeight:"bold",fontSize:"larger",paddingLeft:"10px"}}>Registered Customer</div>

                            <div className="btn-1" onClick={()=> {setRegisterCustomerModel(true)}}>Add Customer<span className="material-symbols-outlined">person_add</span></div>
                        </div>

                        <div style={{width:"100%",height:"90%",display:"grid",overflowY:"auto",padding:10,gridTemplateColumns: "30% 30% 30%",gridTemplateRows: "20% 20% 20%",gridColumnGap:"4%",gridRowGap:"5%"}}>

                            {
                                customerList &&
                                    customerList.map((customer)=>{
                                        return(
                                            <div key={customer.id} style={{display:"flex",flexDirection:"row",gap:5,boxShadow:"rgba(0, 0, 0, 0.1) 5px 3px 12px 3px",padding:10,borderRadius:10}}>
                                                <img src={customer.photo} style={{userSelect:"none",width:"80px",height:"80px",borderRadius:"50%",alignSelf:"center", objectFit:"cover"}}/>
                                                <div style={{display:"flex",flexDirection:"column",width:"80%",height:"100%",justifyContent:"center"}}>
                                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontWeight:"bold"}}>
                                                        {customer.name}
                                                    </div>

                                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                                        {customer.email}
                                                    </div>

                                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                                        {customer.phone}
                                                    </div>

                                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                                        {customer.gender}
                                                    </div>

                                                </div>
                                                <div style={{height:"100%",display:"flex",alignItems:"center",paddingRight:10}}>
                                                    <IoPersonRemove style={{color:"red",width:30,height:"auto",cursor:"pointer"}} onClick={()=>deleteCustomer(customer.id)}/>
                                                </div>
                                            </div>
                                        )
                                    })
                            }

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
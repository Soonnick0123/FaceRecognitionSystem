import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingScreen from '../assets/components/LoadingScreen';
import SideBar from '../assets/components/SideBar';
import Illustration from '../assets/illustration/illustation1.png';

export default function Register() {
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
                                padding: 1rem 3.5rem 1rem 1rem;

                                span {
                                    opacity: 1;
                                    transition: all 0.5s;
                                }
                            }


                        }
                    `}
                </style>

                {/* <Modal isOpen={selectMembershipModal} toggle={()=> setSelectMembershipModal(false)}>
                    <ModalHeader toggle={()=>{setSelectMembershipModal(false)}}>
                        Set As
                    </ModalHeader>
                    <div style={{padding:15,display:"flex",flexDirection:"column",alignItems:"center",borderRadius:5, gap:10}}>
                        {
                            staffMembershipList.map((membership)=>{
                                return(
                                    <div style={{ width:"100%",background: "rgb(219, 238, 255)",display: "flex",flexDirection: "column",border: "1px solid rgb(0, 105, 217)",borderRadius: "0.3rem",cursor: "pointer"}} onClick={()=>{modifyStaff(membership.id)}}>
                                        <div style={{display: "flex",flexDirection: "row",gap: "1rem",justifyContent: "center",alignItems: "center",padding: "0.3rem 0.6rem"}}>
                                            {getMembershipIcon(membership.icon)}
                                            <div>{membership.title}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Modal> */}

                <label for="modal" class="modal-bg"></label>

                <div class="modal-content">
                    <label for="modal" class="close">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </label>
                    <header>
                        <h2>So This is a Modal</h2>
                    </header>
                    <article class="content">
                        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.</p>
                    </article>
                    <footer>
                        <a href="https://joshuaward.me" target="_blank" class="button success">Accept</a>
                        <label for="modal" class="button danger">Decline</label>
                    </footer>
                </div>

                {loading && <LoadingScreen zIndex={2}/>}

                <div className='container'>
                <SideBar currentPage={'register'}/>

                <div className='second-container'>

                    <div style={{width:"100%",height:"85%",margin:"4%",background:"white",borderRadius:"20px",display:"flex",flexDirection:"column",padding:25,gap:25}}>
                        <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                            <div style={{fontWeight:"bold",fontSize:"larger",paddingLeft:"10px"}}>Registered Customer</div>
                            <div className="btn-1">Register<span className="material-symbols-outlined">person_add</span></div>
                        </div>

                        <div style={{width:"100%",height:"90%",display:"grid",overflowY:"auto",padding:10,gridTemplateColumns: "30% 30% 30%",gridTemplateRows: "20% 20% 20%",gridColumnGap:"4%",gridRowGap:"5%"}}>

                            <div style={{display:"flex",flexDirection:"row",gap:5,boxShadow:"rgba(0, 0, 0, 0.1) 5px 3px 12px 3px",padding:10,borderRadius:10}}>
                                <img src={Illustration} style={{userSelect:"none",width:"80px",height:"80px",borderRadius:"50%",alignSelf:"center"}}/>
                                <div style={{display:"flex",flexDirection:"column",width:"80%",height:"100%",justifyContent:"center"}}>
                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontWeight:"bold"}}>
                                        Name
                                    </div>

                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                        Email
                                    </div>

                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                        Phone
                                    </div>

                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                        Gender
                                    </div>

                                </div>
                            </div>

                            <div style={{display:"flex",flexDirection:"row",gap:5,boxShadow:"rgba(0, 0, 0, 0.1) 5px 3px 12px 3px",padding:10,borderRadius:10}}>
                                <img src={Illustration} style={{userSelect:"none",width:"80px",height:"80px",borderRadius:"50%",alignSelf:"center"}}/>
                                <div style={{display:"flex",flexDirection:"column",width:"80%",height:"100%",justifyContent:"center"}}>
                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontWeight:"bold"}}>
                                        Name
                                    </div>

                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                        Email
                                    </div>

                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                        Phone
                                    </div>

                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                        Gender
                                    </div>

                                </div>
                            </div>

                            <div style={{display:"flex",flexDirection:"row",gap:5,boxShadow:"rgba(0, 0, 0, 0.1) 5px 3px 12px 3px",padding:10,borderRadius:10}}>
                                <img src={Illustration} style={{userSelect:"none",width:"80px",height:"80px",borderRadius:"50%",alignSelf:"center"}}/>
                                <div style={{display:"flex",flexDirection:"column",width:"80%",height:"100%",justifyContent:"center"}}>
                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontWeight:"bold"}}>
                                        Name
                                    </div>

                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                        Email
                                    </div>

                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                        Phone
                                    </div>

                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                        Gender
                                    </div>

                                </div>
                            </div>

                            <div style={{display:"flex",flexDirection:"row",gap:5,boxShadow:"rgba(0, 0, 0, 0.1) 5px 3px 12px 3px",padding:10,borderRadius:10}}>
                                <img src={Illustration} style={{userSelect:"none",width:"80px",height:"80px",borderRadius:"50%",alignSelf:"center"}}/>
                                <div style={{display:"flex",flexDirection:"column",width:"80%",height:"100%",justifyContent:"center"}}>
                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontWeight:"bold"}}>
                                        Name
                                    </div>

                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                        Email
                                    </div>

                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                        Phone
                                    </div>

                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                        Gender
                                    </div>

                                </div>
                            </div>

                            <div style={{display:"flex",flexDirection:"row",gap:5,boxShadow:"rgba(0, 0, 0, 0.1) 5px 3px 12px 3px",padding:10,borderRadius:10}}>
                                <img src={Illustration} style={{userSelect:"none",width:"80px",height:"80px",borderRadius:"50%",alignSelf:"center"}}/>
                                <div style={{display:"flex",flexDirection:"column",width:"80%",height:"100%",justifyContent:"center"}}>
                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontWeight:"bold"}}>
                                        Name
                                    </div>

                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                        Email
                                    </div>

                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                        Phone
                                    </div>

                                    <div style={{width:"100%",display:"flex",flexDirection:"row",fontSize:"small"}}>
                                        Gender
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <ul class="circles">
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
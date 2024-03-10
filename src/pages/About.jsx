import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

                {loading && <LoadingScreen zIndex={2}/>}

                <div className='container'>
                <SideBar />

                <div className='second-container'>
                    <div style={{width:"50%",height:"100%"}}>
                        test
                    </div>

                    <div style={{width:"50%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <img src={Illustration} />
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
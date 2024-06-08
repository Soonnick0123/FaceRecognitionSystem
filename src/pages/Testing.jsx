import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingScreen from '../assets/components/LoadingScreen';

export default function About() {
    const [message, setMessage] = useState('');
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const hostName = window.location.hostname;

    // let serverURL = "http://3.90.183.30/RecognitionApp";
    // const [serverURL,setServerURL] = useState('')

    if(["localhost", "127.0.0.1"].includes(hostName)){
        serverURL = 'http://127.0.0.1:8000/RecognitionApp'
        // setServerURL('http://127.0.0.1:8000/RecognitionApp')
    }
    else{
        serverURL = 'http://3.90.183.30/RecognitionApp'
    }

    const secondFunction=()=>{
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

                {loading && <LoadingScreen />}
                <div style={{backgroundColor:"#fff",width:"100vw",height:"100vh", color:"black"}}>
                    <h1 style={{marginTop:"0"}}>Testing Pages</h1>
                    <p>{message}</p>
                </div>
            </>
        );
    }
}
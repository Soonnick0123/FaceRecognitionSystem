import faceidicon from '../icon/faceIdIcon.svg';

export default function LoadingScreen({ zIndex = 9999, position = "fixed" }) {

    return(
        <>
            <style jsx>
                {`
                    .container-loading{
                        width:100%;
                        height:100%;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        position:var(--position);
                        z-index:var(--zIndex);
                        background-color:none;
                        opacity:0.5;
                        bottom:0px;
                        right:0px;
                    }

                    .icon-container{
                        display:flex;
                        border-radius:50%;
                        background-color:white;
                        align-items:center;
                        justify-content:center;
                        -webkit-box-shadow: 0 0 32px 7.5px #11a9ec;
                        -moz-box-shadow: 0 0 32px 7.5px #11a9ec;
                        box-shadow: 0 0 32px 7.5px #11a9ec;
                    }

                    .icon{
                        color:white;
                        position:absolute;
                    }

                    // .spinner {
                    //     width: 17.6px;
                    //     height: 17.6px;
                    //     border-radius: 17.6px;
                    //     box-shadow: 68px 0px 0 0 rgba(71,75,255,0.2), 55.2px 40px 0 0 rgba(71,75,255,0.4), 27.72px 64.6px 0 0 rgba(71,75,255,0.6), -21.08px 64.6px 0 0 rgba(71,75,255,0.8), -55.2px 40px 0 0 #474bff;
                    //     animation: spinner-b87k6z 1s infinite linear;
                    // }

                    // @keyframes spinner-b87k6z {
                    //     to {
                    //         transform: rotate(360deg);
                    //     }
                    // }

                    .spinner{
                        width: 150px;
                        height: 150px;
                        border: 5px solid;
                        border-color: #11a9ec transparent #11a9ec transparent;
                        border-radius: 50%;
                        animation: spinner 2s linear infinite;
                    }

                    @keyframes spinner{
                        to{
                            transform: rotate(360deg);
                        }
                    }
                `}
            </style>

            <div className="container-loading" style={{ '--position': position, '--zIndex': zIndex }}>
                <div className='icon-container'>
                    <img className='icon' src={faceidicon} style={{width:"5%",height:"auto"}} alt="faceidicon" />
                    <div className="spinner"></div>
                </div>
            </div>

        </>
    )
}
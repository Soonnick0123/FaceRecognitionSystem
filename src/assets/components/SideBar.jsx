import React, { useState } from 'react';
import faceidicon from '../icon/faceIdIcon.svg';

// const navItems = ["home", "register", "backup", "mail", "cloud", "layers"];
const navItems = [
    {
        name: "home",
        icon: "home",
    },
    {
        name: "register",
        icon: "person_add",
    },
    {
        name: "Recognition",
        icon: "filter_center_focus",
    },
];


export default function SideBar({currentPage = "home"}) {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
            <style jsx>
                {`
                    * {
                        box-sizing: border-box;
                    }

                    button {
                        background: transparent;
                        border: 0;
                        padding: 0;
                        cursor: pointer;
                    }

                    .sidebar {
                        position: absolute;
                        overflow: hidden;
                        top: 0;
                        left: 0;
                        width: 60px;
                        height: 100%;
                        background: #515889;
                        transition: width 0.4s;
                        z-index: 999;
                    }

                    .sidebar.open {
                        width: 260px;
                    }

                    .sidebar-inner {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 260px;
                    }

                    .sidebar-header {
                        display: flex;
                        align-items: center;
                        height: 72px;
                        background: rgb(0 0 0 / 15%);
                    }

                    .sidebar-burger {
                        width: 60px;
                        height: 72px;
                        display: grid;
                        place-items: center;
                        color: #f9f9f9;
                        cursor: pointer;
                    }

                    .sidebar-logo {
                        height: 35px;
                    }

                    .logo-text {
                        color: white;
                        margin-left: 8px;
                    }

                    .sidebar-menu {
                        display: grid;
                        padding: 10px;
                    }

                    .sidebar-button {
                        display: flex;
                        gap: 16px;
                        align-items: center;
                        height: 56px;
                        width: 100%;
                        font-family: "Poppins";
                        font-size: 17px;
                        text-transform: capitalize;
                        line-height: 1;
                        padding: 0 10px;
                        border-radius: 8px;
                        color: #f9f9f9;
                        opacity: 0.8;
                        cursor: pointer;
                    }

                    .sidebar-button:hover {
                        background: rgb(0 0 0 / 30%);
                        opacity: 1;
                    }

                    .sidebar-button:hover > span {
                        opacity: 1;
                    }

                    .sidebar-logo,
                    .logo-text,
                    .sidebar-button p {
                        opacity: 0;
                        transition: 0.3s;
                    }

                    .sidebar.open :is(.sidebar-button p, .sidebar-logo, .logo-text) {
                        opacity: 1;
                    }

                    .sidebar-button > img {
                        width: 24px;
                        height: 24px;
                    }

                    .sidebar-button > span {
                        opacity: 0.5;
                    }
                `}
            </style>

            <nav className={`sidebar ${isOpen ? "open" : ""}`} onMouseOver={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                <div className="sidebar-inner">

                    <header className="sidebar-header">
                    <div
                        className="sidebar-burger"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="material-symbols-outlined">
                        {isOpen ? "close" : "menu"}
                        </span>
                    </div>
                    
                    <img src={faceidicon} className="sidebar-logo" />
                    <h2 className='logo-text'>Face ID</h2>
                    </header>

                    <nav className="sidebar-menu">
                    {navItems.map((item) => (
                        <div key={item} type="button" className="sidebar-button" style={{backgroundColor: item.name==currentPage?"#292c45":"none"}}>
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <p>{item.name}</p>
                        </div>
                    ))}
                    </nav>
                </div>
            </nav>

        </>
    )
}
import React, { useState } from 'react'
import profilePhoto from "./assets/profilePhoto.png"
import "./styles/window.css"
import {
    FaRegIdBadge,
    FaBell,
    FaBorderAll,
    FaChartColumn,
    FaGear
} from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

type Props = {
    currentView: any
    activeId: number
}

const Window = (props: Props) => {
    const [activeId, setActiveId] = useState<number>(1)
    const navigate = useNavigate()
    return (
        <div className='wn_super_cont'>
            <header className='wn_admin_header'>
                <div className='wn_profile_pill'>
                    <img src={profilePhoto} alt="profile" />
                    <p className='wn_profile_name'>Emeka Samson</p>
                </div>
                <div className='wn_notification_cont'>
                    <FaBell size={15} color='#FFFFFF' />
                </div>
            </header>
            <main>
                <div className='main_content_container'>
                    <div className='wn_menu_bar'>
                        <ul>
                            <li
                                className={activeId === 1 ? "active" : "inactive"}
                                onClick={() => {
                                    navigate("/admin/dashboard")
                                    setActiveId(1)
                                }}
                            >
                                <FaBorderAll size={15} />
                                Dashboard
                            </li>
                            <li
                                className={activeId === 2 ? "active" : "inactive"}
                                onClick={() => {
                                    navigate("/admin/transactions");
                                    setActiveId(2)
                                }}
                            >
                                <FaChartColumn size={15} />
                                Transactions
                            </li>
                            <li
                                className={activeId === 3 ? "active" : "inactive"}
                                onClick={() => {
                                    navigate("/admin/merchants");
                                    setActiveId(3)
                                }}
                            >
                                <FaChartColumn size={15} />
                                Merchants
                            </li>
                            <li
                                className={activeId === 4 ? "active" : "inactive"}
                                onClick={() => {
                                    navigate("/merchant/security/access-control")
                                    setActiveId(4)
                                }}
                            >
                                <FaGear size={15} />
                                Access Control
                            </li>
                            <li
                                className={activeId === 5 ? "active" : "inactive"}
                                onClick={() => {
                                    navigate("/merchant/customers")
                                    setActiveId(5)
                                }}
                            >
                                <FaRegIdBadge size={15} />
                                Customers
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='wn_admin_view_screen'>
                    {
                        props.currentView
                    }
                </div>
            </main>
            <footer className='wn_admin_footer'>
            </footer>
        </div>
    )
}

export default Window

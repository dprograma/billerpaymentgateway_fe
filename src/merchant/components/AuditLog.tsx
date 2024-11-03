import {
    FaChevronRight,
} from "react-icons/fa6";
import "./styles/auditLog.css"
import { useState } from "react";
import Window from "../Window";
import ProfilePic from "../assets/profilePic.png"

type Props = {}

const AuditLogView = (props: Props) => {

    const [showSubInfoContainer, setShowSubInfoContainer] = useState<boolean>(false)
  return (
    <div className='aud_log_view_screen'>
        <div className="aud_log_super_container">
            <div className="aud_log_header_info">
                <p className="aud_log_header_title">Audit Log</p>
                <p className='aud_log_desc_text'>A descriptive body text comes here</p>
            </div>
            <div className="aud_log_super_wrapper">
                <div className="aud_log_container">
                    <hr className="aud_log_hr" />
                    <div className="aud_log_header">
                        <p className="aud_log_text">Name</p>
                        <p className="aud_log_text">Time logged in</p>
                        <p className="aud_log_text">View activities</p>
                    </div>
                    <hr className="aud_log_hr" />
                    <div className="aud_log_section" onClick={() => setShowSubInfoContainer(!showSubInfoContainer)} title="Click to view/hide details">
                        <p className="aud_log_text_ln">Samson James</p>
                        <p className="aud_log_text_ln">4 Dec. 2024 13:05</p>
                        <p className="aud_log_text_ln"><FaChevronRight /></p>
                    </div>
                    <hr className="aud_log_hr" />
                    <div className="aud_log_section" onClick={() => setShowSubInfoContainer(!showSubInfoContainer)} title="Click to view/hide details">
                        <p className="aud_log_text_ln">Samson James</p>
                        <p className="aud_log_text_ln">4 Dec. 2024 13:05</p>
                        <p className="aud_log_text_ln"><FaChevronRight /></p>
                    </div>
                    <hr className="aud_log_hr" />
                    <div className="aud_log_section" onClick={() => setShowSubInfoContainer(!showSubInfoContainer)} title="Click to view/hide details">
                        <p className="aud_log_text_ln">Samson James</p>
                        <p className="aud_log_text_ln">4 Dec. 2024 13:05</p>
                        <p className="aud_log_text_ln"><FaChevronRight /></p>
                    </div>
                    <hr className="aud_log_hr" />
                    <div className="aud_log_section" onClick={() => setShowSubInfoContainer(!showSubInfoContainer)} title="Click to view/hide details">
                        <p className="aud_log_text_ln">Samson James</p>
                        <p className="aud_log_text_ln">4 Dec. 2024 13:05</p>
                        <p className="aud_log_text_ln"><FaChevronRight /></p>
                    </div>
                    <hr className="aud_log_hr" />
                    <div className="aud_log_section" onClick={() => setShowSubInfoContainer(!showSubInfoContainer)} title="Click to view/hide details">
                        <p className="aud_log_text_ln">Samson James</p>
                        <p className="aud_log_text_ln">4 Dec. 2024 13:05</p>
                        <p className="aud_log_text_ln"><FaChevronRight /></p>
                    </div>
                    <hr className="aud_log_hr" />
                    <div className="aud_log_section" onClick={() => setShowSubInfoContainer(!showSubInfoContainer)} title="Click to view/hide details">
                        <p className="aud_log_text_ln">Samson James</p>
                        <p className="aud_log_text_ln">4 Dec. 2024 13:05</p>
                        <p className="aud_log_text_ln"><FaChevronRight /></p>
                    </div>
                    <hr className="aud_log_hr" />
                    <div className="aud_log_section" onClick={() => setShowSubInfoContainer(!showSubInfoContainer)} title="Click to view/hide details">
                        <p className="aud_log_text_ln">Samson James</p>
                        <p className="aud_log_text_ln">4 Dec. 2024 13:05</p>
                        <p className="aud_log_text_ln"><FaChevronRight /></p>
                    </div>
                    <hr className="aud_log_hr" />
                    <div className="aud_log_section" onClick={() => setShowSubInfoContainer(!showSubInfoContainer)} title="Click to view/hide details">
                        <p className="aud_log_text_ln">Samson James</p>
                        <p className="aud_log_text_ln">4 Dec. 2024 13:05</p>
                        <p className="aud_log_text_ln"><FaChevronRight /></p>
                    </div>
                    <hr className="aud_log_hr" />
                </div>
                { showSubInfoContainer &&
                <div className="aud_log_info_container">
                    <div className="aud_log_user_cont">
                        <div>
                            <img src={ProfilePic} alt="profile" />
                        </div>
                        <div className="aud_log_info_div">
                            <div className="aud_log_wrap">
                                <section>
                                    <p className="aud_log_info_header">Device</p>
                                    <p className="aud_log_info_txt">Mackbook Air 2015</p>
                                </section>
                                <section>
                                    <p className="aud_log_info_header">Permission</p>
                                    <p className="aud_log_info_txt">Manager</p>
                                </section>
                            </div>
                            <div>
                                <p className="aud_log_info_header">IP:</p>
                                <p className="aud_log_info_txt">9940089898499</p>
                            </div>
                            
                        </div>
                    </div>
                    <hr className="aud_log_hr" />
                    <div className="aud_log_header2">
                        <p className="aud_log_text">Activities</p>
                        <p className="aud_log_text">Time</p>
                    </div>
                    <div className="aud_log_section2">
                        <p className="aud_log_text_ln">Created a new client</p>
                        <p className="aud_log_text_ln">8:34</p>
                    </div>
                    <div className="aud_log_section2">
                        <p className="aud_log_text_ln">Created a new client</p>
                        <p className="aud_log_text_ln">8:34</p>
                    </div>
                    <div className="aud_log_section2">
                        <p className="aud_log_text_ln">Created a new client</p>
                        <p className="aud_log_text_ln">8:34</p>
                    </div>
                    <div className="aud_log_section2">
                        <p className="aud_log_text_ln">Created a new client</p>
                        <p className="aud_log_text_ln">8:34</p>
                    </div>
                    <div className="aud_log_section2">
                        <p className="aud_log_text_ln">Created a new client</p>
                        <p className="aud_log_text_ln">8:34</p>
                    </div>
                </div>}
            </div>
        </div>
    </div>
  )
}

const AuditLog= () => {
    const content = {
        currentView: <AuditLogView />,
        activeId: 16
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}

export default AuditLog
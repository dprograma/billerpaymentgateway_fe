import React, { useState } from 'react'
import IbillsLogo from "../assets/ibillslogo.png"
import ImgPlaceHolder from "../assets/imagePlaceholder.png"
import "../styles/businessVerification.css"
import { 
    FaCircleCheck,
    FaUpload
 } from 'react-icons/fa6'
 import Window from '../Window'

type Props = {}

const BusinessVerificationView = (props: Props) => {
    const [completed, setCompleted] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<number>(1)
  return (
    <div className='bus_ver_super_contaner'>
        <div className='bus_ver_header'>
            <img src={IbillsLogo} alt='ibils logo' />
            <div className='bus_ver_hd_wrapper'>
                <div>
                    <h2 className='bus_ver_hd_title'>Business Verification</h2>
                    <p className='bus_ver_hd_txt'>Upgrade for more. Verify your business, unlock advanced features.</p>
                </div>
                <button className='bus_ver_visit_branch_btn'>Visit any UBA branch for physical verification</button>
            </div>
        </div>
        <div className='bus_ver_main'>
            <ul className='bus_ver_aside_tab'>
                <li className={activeTab === 1? "active" : ""} onClick={() => setActiveTab(1)}>Business Details <FaCircleCheck className="profile_check_icon" size={15} color= {completed? "#6FCF97" : "grey"}/></li>
                <li className={activeTab === 2? "active" : ""} onClick={() => setActiveTab(2)}>KYC <FaCircleCheck className="profile_check_icon" size={15} color= {completed? "#6FCF97" : "grey"}/></li>
                <li className={activeTab === 3? "active" : ""} onClick={() => setActiveTab(3)}>Bank Details <FaCircleCheck className="profile_check_icon" size={15} color= {completed? "#6FCF97" : "grey"}/></li>
            </ul>
            <div className='bus_ver_conent'>
                { activeTab === 1 &&
                    <div className='bus_ver_content'>
                        <p className='bus_ver_sec_title'>Business Details</p>
                        <div className='bus_ver_img_sec'>
                            <img src={ImgPlaceHolder} alt="placeholder"/>
                            <p className='bus_ver_img_txt'>Max 500px by 500px</p>
                            <button className='bus_ver_upload_img_btn'><FaUpload />Upload Logo</button>
                        </div>
                        <div className='content_upload_frm'>
                            <>
                                <p className='content_title'>Business Name</p>
                                <input className="content1_input" type='number' />
                                <button className='bus_ver_upload_btn'><FaUpload />Upload Business Name Certificate</button>
                            </>
                            <>
                                <p className='content_title'>RC Number</p>
                                <input className="content1_input" type='number' />
                                <button className='bus_ver_upload_btn'><FaUpload />Upload Business Name Certificate</button>
                            </>
                            <>
                                <p className='content_title'>Tax ID</p>
                                <input className="content1_input" type='number' />
                                <button className='bus_ver_upload_btn'><FaUpload />Upload Business Name Certificate</button>
                            </>
                        </div> 
                        <button className='bus_ver_action_button'>Next</button>    
                    </div>
                }
                {activeTab === 2 &&
                    <div className='bus_ver_content'>
                        <p className='bus_ver_sec_title'>Personal Identity (Business Owner/Director)</p>
                        <div className='content_upload_frm'>
                            <>
                                <p className='content_title'>ID Type</p>
                                <input className="content_input" type='number' />
                                <button className='bus_ver_upload_btn'><FaUpload />Upload ID</button>
                            </>
                        </div>
                        <div className='content_upload_frm'>
                            <>
                                <p className='content_title'>Enter BVN Number</p>
                                <input className="content_input" type='number' />
                                <button className='bus_ver_upload_btn'><FaUpload />Upload ID</button>
                            </>
                        </div>
                        <button className='bus_ver_action_button'>Next</button> 
                    </div>
                }
                {/* {activeTab === 3 &&
                    <div className='bus_ver_content'>
                        <p className='bus_ver_sec_title'>Bank Details</p>
                        <div className='content_upload_frm'>
                            <>
                                <p className='content_title'>Bank</p>
                                <select className='content_input'>
                                        <option>Select Bank</option>
                                        <option>UBA Bank</option>
                                        <option>First Bank</option>
                                        <option>WEMA Bank</option>
                                        <option>Zenith Bank</option>
                                </select>
                                <button className='bus_ver_upload_btn'><FaUpload />Upload ID</button>
                            </>
                        </div>                        
                        <button className='bus_ver_action_button'>Submit</button> 
                    </div>
                } */}

            </div>
        </div>
    </div>
  )
}

const BusinessVerification2= () => {
    const content = {
        currentView: <BusinessVerificationView />,
        activeId: 12
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}

export default BusinessVerification2
import React, { useState } from "react";
import "./styles/profile.css";
import { useNavigate } from "react-router-dom";
import Window from "../Window";
import { 
    FaCircleCheck,
    FaShield,
    FaUpload
 } from "react-icons/fa6";


type Props = {}

const ProfileView = (props: Props) => {
  const [activeTab, setActiveTab] = useState<number>(1)
  const [completed, setCompleted] = useState<boolean>(true)
  
  const navigate = useNavigate()
 
  return (
    <main className='profile'>
        <div className="profile_header_info">
            <p className="profile_header_title">Profile</p>
            <p className='profile_desc_text'>A descriptive body text comes here</p>
        </div>
        <hr className="profile_hr" />
        <div className="profile_doc_container">
            <ul className="profile_aside">
                <li className={activeTab === 1? "active" : "null"} 
                    onClick={ () => setActiveTab(1)}>Personal Information
                    <FaCircleCheck className="profile_check_icon" size={15} color= {completed? "#6FCF97" : "grey"}/>
                </li>
                <li className={activeTab === 2? "active" : "null"} 
                    onClick={ () => setActiveTab(2)}>BUSINESS VERIFICATION
                    <FaCircleCheck className="profile_check_icon" size={15} color= {completed? "#6FCF97" : "grey"}/>
                </li>
                <li className={activeTab === 3? "active" : "null"} 
                    onClick={ () => setActiveTab(3)}>Business Details
                    <FaCircleCheck className="profile_check_icon" size={15} color= {completed? "#6FCF97" : "grey"}/>
                </li>
                <li className={activeTab === 4? "active" : "null"} 
                    onClick={ () => setActiveTab(4)}>Personal Identity
                    <FaCircleCheck className="profile_check_icon" size={15} color= {completed? "#6FCF97" : "grey"}/>
                </li>
                <li className={activeTab === 5? "active" : "null"} 
                    onClick={ () => setActiveTab(5)}>BVN
                    <FaCircleCheck className="profile_check_icon" size={15} color= {completed? "#6FCF97" : "grey"}/>
                </li>
            </ul>
            <div className="profile_info_part">
                { activeTab === 1 &&
                    <div className="profile_part1">
                        <p className="profile_part_title">Personal Information</p>
                        <div className="profile_pinfo_sec">
                            <p className="profile_info_txt_bold">Full Name</p>
                            <p className="profile_info_txt">Amos John</p>
                        </div>
                        <div className="profile_pinfo_sec">
                            <p className="profile_info_txt_bold">Email</p>
                            <p className="profile_info_txt">amosjohn@gmail.com</p>
                        </div>
                        <div className="profile_pinfo_sec">
                            <p className="profile_info_txt_bold">Phone Number</p>
                            <p className="profile_info_txt">+234 805 0059 8845</p>
                        </div>

                    </div>
                }
                 { activeTab === 3 &&
                    <div className="profile_part3">
                        <p className="profile_part_title">Business Details</p>
                        <div className="profile_bdetails_wrapper">
                            <FaShield size={40} color="#6FCF97" />
                            <div>
                                <p className="profile_info_txt_bold verified">Verified</p>
                                <p className="profile_info_txt">Your business details has been verified</p>
                            </div>
                        </div>
                    </div>
                }
                { activeTab === 4 &&
                    <>
                        <p className="profile_part_title">Personal Identity</p>
                        <div className="profile_part4">
                            <div className="profile_identity_wrapper">
                                <form>
                                    <label>ID Type <br/>
                                        <input placeholder="select"/>
                                    </label>
                                    <button type="button" className="upload_btn"> <FaUpload size={15}/>Upload ID </button>
                                </form>
                            </div>
                        </div>
                        <button type="submit" className="submit_btn">Submit</button>
                    </>
                }
                 { activeTab === 5 &&
                    <>
                        <p className="profile_part_title">BVN</p>
                        <div className="profile_part4">
                            <div className="profile_bvn_wrapper">
                                <form>
                                    <label>Enter BVN Number<br/>
                                        <input placeholder="BVN number"/>
                                    </label>
                                </form>
                            </div>
                        </div>
                        <button type="submit" className="submit_btn">Submit</button>
                    </>
                }
            </div>

        </div>
            

    </main>
  );
}

const Profile= () => {
    const content = {
        currentView: <ProfileView />,
        activeId: 0
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}
export default Profile;

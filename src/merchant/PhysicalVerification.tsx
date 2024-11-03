import React, { useState } from 'react'
import IbillsLogo from "./assets/amaps.png"
// import IbillsLogo from "./assets/ibillslogo.png"
import "./styles/physicalVerification.css"
import SuccessModal from './builders/SuccessModal'

type Props = {}

const PhysicalVerification = (props: Props) => {
    const [activeTab, setActiveTab] = useState<number>(1)
    const [branch, setBranch] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [time, setTime] = useState<string>("")
    const [showModal, setShowModal] = useState<boolean>(false);

    const physicaVerification = {
        branch: branch,
        date: date,
        time: time
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className='phy_ver_super_contaner'>
            <div className='phy_ver_header'>
                <img src={IbillsLogo} alt='ibils logo'  className='amapgs_logo' />
                <div className='phy_ver_hd_wrapper'>
                    <div>
                        <h2 className='phy_ver_hd_title'>Physical Verification</h2>
                        <p className='phy_ver_hd_txt'>Get your business verified by walking into one of our branches.</p>
                    </div>
                </div>
            </div>
            <div className='phy_ver_main'>
                <div className='phy_ver_content_container'>
                    {activeTab === 1 &&
                        <div className='phy_ver_content'>
                            <p className='phy_ver_sec_title'>Schedule for your physical verification</p>
                            <div className='content_upload_frm'>
                                <>
                                    <p className='content_title'>Select Branch</p>
                                    <input className="content1_input" type='text' onChange={(e) => setBranch(e.target.value)} />
                                </>
                                <>
                                    <p className='content_title'>Date</p>
                                    <input className="content1_input" type='date' onChange={(e) => setDate(e.target.value)} />
                                </>
                                <>
                                    <p className='content_title'>Time</p>
                                    <input className="content1_input" type='time' onChange={(e) => setTime(e.target.value)} />
                                </>
                            </div>
                            <button className='phy_ver_action_button' onClick={() => console.log(physicaVerification)}>Submit</button>
                        </div>
                    }
                    {
                        activeTab === 2 &&
                        <SuccessModal msg={physicaVerification} onClose={handleCloseModal} />
                    }
                </div>
            </div>
        </div>
    )
}

export default PhysicalVerification
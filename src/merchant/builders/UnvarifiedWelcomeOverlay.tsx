import React from 'react'
import successIcon from "../assets/success.svg"
import "./styles/unverifiedWelcomeOvalay.css"
import VerifiedIcon from "../assets/verifiedIcon.png"
import { useNavigate } from 'react-router-dom'

type Props = {
    setVarified: any
}

const UnvarifiedWelcomeOverlay = (props: Props) => {
    const navigate = useNavigate()
    return (
        <div className="overlay">
            <div className='unvarified_container'>
                <div className='message_wrapper'>
                    <img src={successIcon} alt='success icon' className='new_acct_successIcon' />
                    <p className='success_txt'>Congratulations your account has been successfully created.</p>
                    <p className='success_txt'>Proceed to KYC and document verification in order to complete onboarding process</p>
                </div>
                <div className='action_wrapper'>
                    <div className='section' onClick={() => props.setVarified(true)}>
                        <div className='demo_pill_wrapper'>
                            <h3 className='pill_title'>View Demo</h3>
                        </div>
                        <p className='section_text'>View Demo/Test account</p>
                    </div>
                    <div className='section' onClick={() => navigate("/merchant/business-verification")}>
                        <div className='get_verified_pill_wrapper'>
                            <h3 className='pill_title'><img src={VerifiedIcon} alt="verified icon" />Get Verified</h3>
                        </div>
                        <p className='section_text'>Verify your business to use all available merchant features</p>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default UnvarifiedWelcomeOverlay
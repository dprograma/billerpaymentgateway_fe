import React, { useState } from "react";
import "./styles/signup.css";
import merchHero from "./assets/2.png"
import iBillsLogo from "./assets/amaps.png"
import ojapay from "../shared/assets/images/ojapay.png"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authState, setGetCode1, setGetCode2, setResendCode1, setResendCode2, setPacketStatus, setMessage, setEmailOtp, setPhoneOtp } from '../shared/assets/slices/authSlice';
import HandleSubmit from "./components/HandleSubmit";
import WarningModal from "./builders/WarningModal";
import ResendCodeButton from './components/countdownbutton';
import { env } from "../shared/assets/environment/envSelector";
import Spinner from '../shared/assets/spinner/spinner';
import iziToast from "izitoast";

const VerifyOtp = () => {

    const dispatch = useDispatch();
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const { getCode1, getCode2, resendCode1, resendCode2, packetStatus, message, firstName, lastName, phoneNo, password, email, emailOtp, phoneOtp, currency } = useSelector((state: { auth: authState }) => state.auth);
    const { getEmailOtp, getPhoneOtp, verifyOtp } = env

    const navigate = useNavigate()

    const phoneOTP = {
        phone_number: phoneNo
    }

    const emailOTP = {
        email: email
    }

    const phoneEmailOTP = {
        email: email,
        email_otp: emailOtp,
        phone_otp: phoneOtp,
        currency: currency,
    }

    const handleCountdownComplete = () => {
        dispatch(setGetCode2(true));
        dispatch(setResendCode2(false))
    };

    const handleCountdownComplete1 = () => {
        dispatch(setGetCode1(true));
        dispatch(setResendCode1(false))
    }

    const getEmailCode = async (e: any) => {
        e.preventDefault()
        const headers = {
            headers: { "Content-type": "application/json" },
        }
        const success = await HandleSubmit(e, emailOTP, getEmailOtp, "POST", setPacketStatus, setStatusMessage, undefined, undefined, headers)
        if (success) {
            dispatch(setGetCode2(false));
            dispatch(setResendCode2(true))
        }
    }

    const getOtpCode = async (e: any) => {
        e.preventDefault()
        const headers = {
            headers: { "Content-type": "application/json" },
        }
        const success = await HandleSubmit(e, phoneOTP, getPhoneOtp, "POST", setPacketStatus, setStatusMessage, undefined, undefined, headers)
        if (success) {
            dispatch(setGetCode1(false));
            dispatch(setResendCode1(true))
        }
    }

    const handleVerifyOtp = async (e: any) => {
        e.preventDefault()
        const headers = {
            headers: { "Content-type": "application/json" },
        }
        setIsLoading(true);
        try {
            const success = await HandleSubmit(e, phoneEmailOTP, verifyOtp, "POST", setPacketStatus, setStatusMessage, undefined, undefined, headers);
            if (success) {
                iziToast.success({
                    title: 'Success',
                    message: "OTP Verified successfully.",
                });
                navigate("/merchant/signin")
            }
        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: "OTP Verification failed!",
            });
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <main className='signup'>
            <Spinner isLoading={isLoading} />
            <div className="column1">
                <div className="wrapper1">
                    <img src={ojapay} className='amapgs_logo' style={{ width: '120px', height: '50px', marginBottom: '30px' }} alt="instant bills pay logo" onClick={() => navigate("/merchant")} />
                    <form className='signup_form' method="POST"></form>
                    <div className="part2">
                        <h2 className='title'>Verify Phone and Email</h2>
                        <p className="title_parag">A 6 digit code will be sent to your phone number and email</p>
                        <div className='otp_data'>
                            <section className="ot_field1">
                                <h4>Phone Verification</h4>
                                <label className='otp_l'>
                                    <input className='otp set_input' placeholder="Code" type="number" onChange={(e) => dispatch(setPhoneOtp(e.target.value))} />
                                </label>
                                {getCode1 && <button className="getCodeBtn" type="button" onClick={getOtpCode}>Get Code</button>}
                                {resendCode1 && <ResendCodeButton onCountdownComplete={handleCountdownComplete1} />}
                            </section>
                            <section className="ot_field2">
                                <h4>Email Verification</h4>
                                <label className='otp_l'>Enter code
                                    <input className='otp set_input' placeholder="Code" type="number" onChange={(e) => dispatch(setEmailOtp(e.target.value))} />
                                </label>
                                {getCode2 && <button className="getCodeBtn" type="button" onClick={getEmailCode}>Get Code</button>}
                                {resendCode2 && <ResendCodeButton onCountdownComplete={handleCountdownComplete} />}
                            </section>
                        </div>
                        <button className="button1" type="submit" onClick={handleVerifyOtp}>Create Account</button>
                    </div>
                </div>
            </div>
            <div className='column2'>
                <img src={merchHero} alt="hero_img" className="hero_img_signup" loading="lazy" />
            </div>
        </main>
    );
}


export default VerifyOtp;
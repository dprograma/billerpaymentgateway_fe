import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../shared/assets/stores/store';
import { verifyOtp, setSignupFormInputs } from '../../shared/assets/slices/authWalletSlice';
import '../assets/css/Signup.css';
import signupImg from '../../shared/assets/images/signin.png';
import ojapay from '../../shared/assets/images/ojapay.png';
import iziToast from 'izitoast';
import LanguageSwitcher from '../../LanguageSwitcher';
import Spinner from '../../shared/assets/spinner/spinner';


type Props = {}

type OtpInputs = {
  otp: string;
  email: string;
  currency: string;
  country: string;
};


const VerifyOtp = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<OtpInputs>();
  const signupFormInputs = useSelector((state: RootState) => state.authWallet.signupFormInputs);
  console.log("signup form input: ", signupFormInputs)
  const email = signupFormInputs?.email;
  const currency = signupFormInputs?.currency;
  const country = signupFormInputs?.country;
  console.log("email: " + email + " currency: " + currency + " country: "+ country)

  const onSubmit: SubmitHandler<OtpInputs> = async (data) => {
    console.log(data)
    setIsLoading(true)
    try {
      const response = await dispatch(verifyOtp(data));
      if (response.payload.status === 'success') {
        iziToast.success({
          title: 'Success',
          message: 'OTP Verified Successfully!',
        });
        navigate('/customer/login')
      } else {
        iziToast.error({
          title: 'Error',
          message: response.payload.response,
        });
      }
    }
    catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later',
      })
    }
    finally {
      setIsLoading(false)
    }

  };

  return (
    <div className="container-fluid dark-customer-background d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Spinner isLoading={isLoading} />
      <div className="language-switcher-wrapper">
        <LanguageSwitcher />
      </div>
      <div className="row justify-content-center w-100">
        <div className="card mb-3 align-self-center w-75 rounded-0 p-0" style={{ height: '85vh', overflow: 'hidden' }}>
          <div className="row g-0 h-100">
            <div className="col-md-6 p-5 d-flex flex-column justify-content-center overflow-auto">
              <div className="w-100">
                <img src={ojapay} className="logo" onClick={() => navigate("/customer")} style={{ marginBottom: '80px' }} />
                <h4 className="mb-4">Verify OTP</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <input type="text" className="form-control" id="otp" placeholder="Enter your email OTP" maxLength={6} {...register('otp', { required: 'OTP is required' })} />
                    {errors.otp && <p className="text-danger">{errors.otp.message}</p>}
                  </div>
                  <input type="hidden" id="email"  {...register('email')} value={email} />
                  <input type="hidden" id="currency"  {...register('currency')} value={currency} />
                  <input type="hidden" id="country"  {...register('country')} value={country} />
                  <button type="submit" className="btn dark-customer-background default-white-text-color btn-block ps-5 pe-5">Submit</button>
                </form>
              </div>
            </div>
            <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center position-relative">
              <img src={signupImg} className="img-fluid h-100 rounded-0 p-0 m-0" alt="signup" />
              <div className="overlay">
                <h2 className="signup-heading">OTP Verification</h2>
                <p className="signup-subtext">Send us your OTP verification code to complete your accout creation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;

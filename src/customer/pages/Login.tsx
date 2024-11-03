import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AppDispatch } from '../../shared/assets/stores/store';
import { login, setUser } from '../../shared/assets/slices/authWalletSlice';
import { NavLink } from 'react-router-dom';
import '../assets/css/Signup.css';
import signupImg from '../../shared/assets/images/signin.png';
import iziToast from 'izitoast';
import ojapay from '../../shared/assets/images/ojapay.png';
import LanguageSwitcher from '../../LanguageSwitcher';
import Spinner from '../../shared/assets/spinner/spinner'


type Props = {}

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = (props: Props) => {
  const { t } = useTranslation('customer_login');
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();


  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const response = await dispatch(login(data));
      console.log("response from login: ", response)
      if (response.payload.status === 'success') {
        iziToast.success({
          title: 'Success',
          message: 'Login successful!',
        });
        dispatch(setUser(response.payload.response))
        navigate('/customer/dashboard')
      } else {
        iziToast.error({
          title: 'Error',
          message: response.payload.response,
        });
      }
    }
    catch (error) {
      console.log("error in login: ", error)
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong!',
      });
    }
    finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="container-fluid dark-customer-background d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Spinner isLoading={isLoading} />
      <div className="language-switcher-wrapper">
        <LanguageSwitcher />
      </div>

      <div className="row justify-content-center w-100">
        <div className="card mb-3 align-self-center w-75 rounded-0 p-0" style={{ overflow: 'hidden' }}>
          <div className="row g-0 h-100">
            <div className="col-md-6 p-5 d-flex flex-column justify-content-center overflow-auto">
              <div className="w-100">
                <img src={ojapay} className="logo" onClick={() => navigate("/customer")} />
                <h4 className="mb-4">{t('welcome')} </h4>
                <p>{t('login')}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">{t('email')}</label>
                    <input type="email" className="form-control" id="email" placeholder={t('enter_email')} {...register('email', {
                      required: t('email_required')
                    })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">{t('password')}</label>
                    <input type="password" className="form-control" id="password" placeholder={t('enter_password')} {...register('password', {
                      required: t('password_required')
                    })} />
                  </div>
                  <button type="submit" className="btn dark-customer-background default-white-text-color btn-block ps-5 pe-5">{t('login_button')}</button>
                </form>
                <p className="mt-3 text-center">{t('dont_have_account')} <NavLink to="/customer/signup">{t('signup_button')}</NavLink></p>
                <p className="mt-3 text-center"><NavLink to="/customer/forgot-password">{t('forgot_password')}</NavLink></p>
              </div>
            </div>
            <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center position-relative">
              <img src={signupImg} className="img-fluid h-100 rounded-0 p-0 m-0" alt="signup" />
              <div className="overlay">
                <h2 className="signup-heading">{t('welcome_back')}</h2>
                <p className="signup-subtext">{t('sign_in_to_continue')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

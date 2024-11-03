import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AppDispatch } from '../../shared/assets/stores/store';
import "./styles/login.css"
import LanguageSwitcher from '../../LanguageSwitcher';
import Spinner from '../../shared/assets/spinner/spinner';
import { login, setGetAdmin, setIsAuthenticated } from '../../shared/assets/slices/adminSlice';
import iziToast from 'izitoast';
import InstantBills from "../assets/amaps.png"
import { NavLink } from 'react-router-dom'
import { env } from '../../shared/assets/environment/envSelector';

type LoginFormInputs = {
    email: string;
    password: string;
};

const Login = () => {

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
                dispatch(setGetAdmin(response.payload.response))
                setIsAuthenticated(true)
                navigate('/admin/dashboard')
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
        <div className='login_super_container'>
            <Spinner isLoading={isLoading} />
            <NavLink to="/"><img src={InstantBills} alt="Instantbills Logo" className='amapgs_logo' /></NavLink>
            <form onSubmit={handleSubmit(onSubmit)} className='admin_login_form'>
                <h1 className='login_form_title'>Admin Login</h1>
                <label className='form_label'>
                {t('email')}
                    <input type='email' className='form-control mb-3' placeholder={t('enter_email')} {...register('email', {
                      required: t('email_required')
                    })} />
                </label>
                <label className='form_label'>
                {t('password')}
                    <input type='password' className='form-control mb-3' placeholder={t('enter_password')} {...register('password', {
                      required: t('password_required')
                    })} />
                </label>
                <button className='login_btn mt-3' type='submit'>Login</button>
                <div className="flex justify-content-center my-3 ">
                    <div className="text-center"><NavLink to="/admin/forgot-password" className="default-text-color text-decoration-none">Forgot Password?</NavLink></div>
                </div>
                <div className="flex justify-content-center my-3 default-text-color">
                    <div className="text-center">&copy; {new Date().getFullYear()} Ojapay. All rights reserved.</div>
                </div>
            </form>
        </div>
    )
}

export default Login
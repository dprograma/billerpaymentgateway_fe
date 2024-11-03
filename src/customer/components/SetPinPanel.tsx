import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../shared/assets/stores/store';
import { setTransferPin } from '../../shared/assets/slices/authWalletSlice';
import '../assets/css/FundWalletPanel.css';
import iziToast from "izitoast";
import Spinner from '../../shared/assets/spinner/spinner';


type SetPinInputs = {
    token: string,
    credentials: {
        wallet_pin: string;
    }
}

const FundWalletPanel: React.FC = () => {
    const { t } = useTranslation('customer_setpin');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<SetPinInputs>();
    const userdata = useSelector((state: RootState) => state.authWallet);
    const { user } = userdata;


    const { access_token } = user?.data;

    const onSubmit: SubmitHandler<SetPinInputs> = async (data) => {
        console.log(data)
        setIsLoading(true);
        try {
            const response = await dispatch(setTransferPin(data));
            if (response.payload.status === 'success') {
                console.log("response: ", response)
                iziToast.success({
                    title: 'OK',
                    message: response.payload.response,
                });
            } else {
                iziToast.error({
                    title: 'Error',
                    message: response.payload.response,
                });
            }
        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: 'Wallet Pin update failed. Please try again later.'
            })
        } finally {
            setIsLoading(false);
        }

    };


    return (
        <div className="d-block col-12 offset-md-3 col-md-6">
            <Spinner isLoading={isLoading} />
            <form onSubmit={handleSubmit(onSubmit)} className="fund-wallet-form">
                <h4 className="text-center">{t('set_wallet_pin')}</h4>
                <hr />
                <input type="hidden" id="token" {...register('token')} value={access_token} />
                <input className="form-control form-control-lg mb-4 ts-16" type="password" id="pin" placeholder={t('enter_pin')} aria-label="Amount" {...register('credentials.wallet_pin', { required: t('pin_required') })} />
                {errors.credentials?.wallet_pin && <p className="text-danger">{errors.credentials?.wallet_pin.message}</p>}
                <button type="submit" className="btn default-theme-color default-white-text-color btn-block mb-3">{t('continue')}</button>
            </form>
        </div>
    );
};

export default FundWalletPanel;

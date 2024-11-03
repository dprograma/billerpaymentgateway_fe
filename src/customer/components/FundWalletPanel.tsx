import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../shared/assets/stores/store';
import { fundWalletVerify, walletList } from '../../shared/assets/slices/authWalletSlice';
import '../assets/css/FundWalletPanel.css';
import { url } from '../../shared/assets/environment/envSelector';
import WalletSelector from '../components/WalletSelector';
import iziToast from 'izitoast';
import papssLogo from '../../shared/assets/images/papss.png';
import visaLogo from '../../shared/assets/images/visa.png';
import mastercardLogo from '../../shared/assets/images/mastercard.png';
import Spinner from '../../shared/assets/spinner/spinner';
import WalletTopUpOTPModal from './WalletTopUpOTPModal';
import { Modal } from 'react-bootstrap';

interface WalletProps {
    currency: string;
    amount: number;
    return_url: string;
    link: string;
    otp: string;
}

interface FundWalletInputs {
    token: string;
    walletData: WalletProps;
};

const FundWalletPanel: React.FC = () => {
    const { t } = useTranslation('customer_fundwallet');
    const [isLoading, setIsLoading] = useState(false);
    const [currency, setCurrency] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false); 
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, formState: { errors } } = useForm<FundWalletInputs>();
    const userdata = useSelector((state: RootState) => state.authWallet);
    const { user } = userdata;
    const return_url = url + "customer/return_url";
    const access_token = user?.data?.access_token;
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [walletProps, setWalletProps] = useState<FundWalletInputs>();
    const [selectedWallet, setSelectedWallet] = useState<any>(null);
    const [showFormModal, setShowFormModal] = useState(false);

    // Fetch Wallet List
    useEffect(() => {
        const fetchData = async () => {
            if (access_token) {
                const response = await dispatch(walletList(access_token));
                if (response.payload.status === 'success') {
                    const { currency } = response.payload.data[0];
                    setCurrency(currency);
                }
            }
        };

        fetchData();
    }, [access_token, dispatch]);

    // Handle wallet selection
    const handleWalletSelect = (wallet: any) => {
        setSelectedWallet(wallet);
        setShowFormModal(true);
    };

    const handleCloseFormModal = () => setShowFormModal(false);

    const onSubmit: SubmitHandler<FundWalletInputs> = async (data) => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const response = await dispatch(fundWalletVerify(data));
            if (response.payload.status === 'success') {
                setShowOTPModal(true);
                handleCloseFormModal();
                console.log()
                const { link } = response.payload.data;
                console.log("link: ", link)
                console.log("data to add link: ", data.walletData)
                data.walletData.link = link;
                setWalletProps(data);
            } else {
                iziToast.error({
                    title: 'Error',
                    message: response.payload.response,
                });
            }
        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while processing your request.',
            });
        } finally {
            setIsLoading(false);
            setIsModalOpen(false);
        }
    };

    const handleContinue = () => {
        setIsModalOpen(false); 
        setShowPaymentModal(true); 
    };

    const handlePaymentOption = (option: string) => {
        if (option === 'Make Payment') {
            handleSubmit(onSubmit)();
            setShowPaymentModal(false);
        } else {
            iziToast.info({
                title: 'Info',
                message: 'Coming Soon!',
            });
        }
    };

    return (
        <div className="d-block col-12 offset-md-3 col-md-6">
            <Spinner isLoading={isLoading} />

            {/* Wallet Selector Component */}
            <WalletSelector onSelectWallet={handleWalletSelect} />

            {/* Fund Wallet Modal */}
            <Modal show={showFormModal} onHide={handleCloseFormModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('fund_wallet')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }} className="fund-wallet-form">
                        <input type="hidden" {...register('token')} value={access_token} />
                        <input type="hidden" {...register('walletData.return_url')} value={return_url} />
                        {currency && <input type="hidden" {...register('walletData.currency')} value={currency} />}
                        <input
                            className="form-control form-control-lg mb-4"
                            type="text"
                            placeholder={t('amount')}
                            {...register('walletData.amount', {
                                required: t('amount_required'),
                                pattern: { value: /^[0-9]+$/, message: t('amount_invalid') }, 
                            })}
                        />
                        {errors.walletData?.amount && <p className="text-danger">{errors.walletData?.amount.message}</p>}
                        <button type="submit" className="btn default-theme-color default-white-text-color btn-block mb-3">{t('continue')}</button>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Choose Payment Method Modal */}
            <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Payment Method</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column align-items-center justify-content-center ps-5 pe-5">
                        <button className="custom-button-primary btn-block mb-3 form-control" onClick={() => handlePaymentOption('Make Payment')}>Make Payment</button>
                        {/* Divider */}
                        <div className="text-center my-3 alternative-options-divider">
                            <span>Alternative Payment Options</span>
                        </div>
                        <button className="custom-button-secondary btn-block mb-3 d-flex align-items-center justify-content-between form-control" onClick={() => handlePaymentOption('PAPSS')}>
                            <span>PAPSS</span><img src={papssLogo} alt="PAPSS Logo" className="payment-logo" />
                        </button>
                        <button className="custom-button-secondary btn-block mb-3 d-flex align-items-center justify-content-between form-control" onClick={() => handlePaymentOption('Visa')}>
                            <span>Visa</span><img src={visaLogo} alt="Visa Logo" className="payment-logo" />
                        </button>
                        <button className="custom-button-secondary btn-block mb-3 d-flex align-items-center justify-content-between form-control" onClick={() => handlePaymentOption('MasterCard')}>
                            <span>MasterCard</span><img src={mastercardLogo} alt="MasterCard Logo" className="payment-logo" />
                        </button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* OTP Modal */}
            {showOTPModal && walletProps && (
                <WalletTopUpOTPModal walletData={walletProps} closeModal={() => setShowOTPModal(false)} />
            )}
        </div>
    );
};

export default FundWalletPanel;
import React, { useState, useEffect, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { AppDispatch } from '../../shared/assets/stores/store';
import { walletToWalletTransfer } from '../../shared/assets/slices/authWalletSlice';
import { Modal, Button, Form } from 'react-bootstrap';
import { env } from '../../shared/assets/environment/envSelector';
import iziToast from 'izitoast';
import Spinner from '../../shared/assets/spinner/spinner';
import { current } from '@reduxjs/toolkit';
import WalletTransferOTPModal from './WalletTransferOTPModal';


interface WalletProps {
    id: number;
    name: string;
    currency: string;
    balance: string;
    user: string;
    created_on: string;
    modified_on: string;
}

interface WalletDataProps {
    donor_currency: string;
    ojapay_tag: string;
    amount: number;
    note: string;
    wallet_pin: string;
    otp: string;
}

interface WalletDataInputs {
    token: string;
    walletData: WalletDataProps;
}

interface PaymentModalProps {
    show: boolean;
    onHide: () => void;
    token: string;
    biller: {
        name: string;
        price: number;
        walletTag: string;
        user: {
            username: string;
        };
    };
    wallet?: WalletProps
    onPaymentSuccess: (data: any) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ show, onHide, token, biller, wallet, onPaymentSuccess }) => {
    console.log("selected wallet from payment modal: ", wallet)
    const { t } = useTranslation('customer_paybills');
    const [amount, setAmount] = useState<number>(biller.price);
    const [comment, setComment] = useState('');
    const [walletPin, setWalletPin] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [otpWalletData, setOtpWalletData] = useState<WalletDataInputs>();


    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setAmount(biller.price);
    }, [biller]);

    const payload: WalletDataInputs = {
        token,
        walletData: {
            ojapay_tag: biller.user.username,
            amount,
            donor_currency: wallet?.currency as string,
            note: comment,
            wallet_pin: walletPin,
            otp: '',
        }
    };

    const handlePayment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await dispatch(walletToWalletTransfer(payload));
            if (response.payload.status === 'success') {
                iziToast.success({
                    title: 'Success',
                    message: response.payload.response,
                });

                setOtpWalletData(payload);
                setShowOTPModal(true);
                onPaymentSuccess(payload);

            } else {
                iziToast.error({
                    title: 'Error',
                    message: response.payload.response,
                });
            }
        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong!'
            })
        } finally {
            setIsLoading(false);
            onHide();
        }

    };

    return (
        <>
        <Modal show={show} onHide={onHide}>
            <Spinner isLoading={isLoading} />
            <Modal.Header closeButton>
                <Modal.Title>{t('payment_to')} {biller.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handlePayment}>
                    <Form.Group controlId="formAmount">
                        <Form.Label>{t('amount')}</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder={t('enter_amount')}
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group controlId="formComment" className="mt-3">
                        <Form.Label>{t('wallet_pin')}</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder={t('enter_pin')}
                            value={walletPin}
                            onChange={(e) => setWalletPin(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formComment" className="mt-3">
                        <Form.Label>{t('comment')}</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder={t('enter_comment')}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" className="mt-3 default-theme-color">
                        {t('submit_payment')}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        {/* Wallet Transfer OTP Modal */}
        {otpWalletData && (
                <WalletTransferOTPModal 
                    show={showOTPModal} 
                    walletData={otpWalletData} 
                    closeModal={() => setShowOTPModal(false)} 
                />
            )}
        </>
    );
};

export default PaymentModal;

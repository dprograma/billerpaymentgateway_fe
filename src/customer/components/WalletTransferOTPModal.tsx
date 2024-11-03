import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../shared/assets/stores/store';
import { walletToWalletValidation, sendDonationDetails } from '../../shared/assets/slices/authWalletSlice';
import iziToast from 'izitoast';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import '../assets/css/OTPModal.css';

interface WalletDataProps {
    donor_currency: string;
    ojapay_tag: string;
    amount: number;
    note: string;
    wallet_pin: string;
    otp: string;
}

interface DonationProps {
    recipient_id: number;
    currency: string;
    amount: number;
    donor_id: number;
    description: string;
}

interface WalletDataInputs {
    token: string;
    walletData: WalletDataProps;
}

interface OTPModalProps {
    show: boolean;
    walletData: WalletDataInputs;
    closeModal: () => void;
    donationProps?: DonationProps;
}

const WalletTransferOTPModal: React.FC<OTPModalProps> = ({ show, walletData, closeModal, donationProps }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [otp, setOtp] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const userdata = useSelector((state: RootState) => state.authWallet);
    const { user } = userdata;
    const { access_token = '' } = user?.data || {};

    const handleOTPSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        walletData.walletData.otp = otp
        console.log("wallet Data in OTP Modal: ", walletData)

        try {
            const response = await dispatch(walletToWalletValidation(walletData));
            if (response.payload.status === 'success') {
                iziToast.success({
                    title: 'Success',
                    message: response.payload.response,
                });
                closeModal(); // Close OTP modal on success

                if (donationProps) {
                    const donationResponse = await dispatch(sendDonationDetails({ token: access_token, donationData: donationProps }));
                    console.log("donation data: ", donationProps)
                    console.log("donation details response: ", donationResponse)
                    if (donationResponse.payload) {
                        iziToast.success({
                            title: 'Success',
                            message: 'Donation details saved successfully!',
                        });
                    } else {
                        iziToast.error({
                            title: 'Error',
                            message: 'Failed to save donation details.',
                        });
                    }
                }
            } else {
                iziToast.error({
                    title: 'Error',
                    message: response.payload.response,
                });
            }
        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong!',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Enter OTP to Confirm Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleOTPSubmit}>
                    <Form.Group controlId="otpInput" className="px-5">
                        <Form.Label>OTP</Form.Label>
                        <Col sm={6} md={{ span: 4, offset: 4 }}>
                            <Form.Control
                                type="text"
                                placeholder="Enter the OTP"
                                value={otp}
                                maxLength={6}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Button
                        type="submit"
                        className="default-theme-color default-border-color default-text-white-color mt-3"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Validating...' : 'Submit OTP'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default WalletTransferOTPModal;

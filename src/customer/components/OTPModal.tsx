import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { env } from '../../shared/assets/environment/envSelector';
import axios from 'axios';
import iziToast from 'izitoast';
import '../assets/css/OTPModal.css'; 
import { RootState } from '../../shared/assets/stores/store';

interface WithdrawalData {
    bank_code: string;
    bank_name: string;
    account_number: string;
    currency: string;
    wallet_pin: string;
    amount: number | string;
}

interface OTPModalProps {
    withdrawalData?: WithdrawalData;
    closeModal: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({ withdrawalData, closeModal }) => {
    const userdata = useSelector((state: RootState) => state.authWallet);
    const { user } = userdata;
    const { access_token } = user?.data;
    const [otp, setOtp] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { walletToBankOTPValidation } = env;

    if (!withdrawalData) {
        console.log('Please provide withdrawal data');
        return null;
    }

    const handleOTPSubmit = async () => {
        const headers = { Authorization: `Bearer ${access_token}` };
        const data = {
            ...withdrawalData,
            otp: otp,
        };

        setIsSubmitting(true);
        try {
            const response = await axios.post(walletToBankOTPValidation, data, { headers });
            if (response.data?.status === 'success') {
                iziToast.success({ title: 'Success', message: 'Withdrawal successful.' });
                closeModal();
            } else {
                iziToast.error({ title: 'Error', message: response.data.response });
            }
        } catch (error) {
            iziToast.error({ title: 'Error', message: 'Failed to validate OTP.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-container">
            <div className="otp-modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Enter OTP</h5>
                    <button type="button" className="close" onClick={closeModal}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <p>Please enter the OTP sent to your registered email to confirm the withdrawal.</p>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            disabled={isSubmitting}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn default-theme-color default-border-color default-white-text-color"
                        onClick={handleOTPSubmit}
                        disabled={isSubmitting || otp === ''}
                    >
                        {isSubmitting ? 'Processing...' : 'Submit OTP'}
                    </button>
                    <button className="btn btn-secondary" onClick={closeModal} disabled={isSubmitting}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OTPModal;

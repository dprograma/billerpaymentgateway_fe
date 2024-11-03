import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../shared/assets/stores/store';
import { fundWallet } from '../../shared/assets/slices/authWalletSlice';
import iziToast from 'izitoast';
import '../assets/css/OTPModal.css';

interface WalletDataProps {
    currency: string;
    amount: number;
    return_url: string;
    link: string;
    otp?: string;
  }

interface WalletDataInputs {
    token: string;
    walletData: WalletDataProps;
  }

interface OTPModalProps {
    walletData?: WalletDataInputs;
    closeModal: () => void;
}

const WalletTransferOTPModal: React.FC<OTPModalProps> = ({ walletData, closeModal }) => {
    const dispatch = useDispatch<AppDispatch>();
    const userdata = useSelector((state: RootState) => state.authWallet);
    const { user } = userdata;
    const { access_token } = user?.data;
    const [otp, setOtp] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!walletData) {
        console.log('Please provide withdrawal data');
        return null;
    }else{
        console.log("walletData: ", walletData)
    }

    const handleOTPSubmit = async () => {
        walletData.walletData.otp = otp
        walletData.token = access_token
        setIsSubmitting(true);
        try {
            const response = await dispatch(fundWallet(walletData));
            if (response.payload.status === 'success') {
                console.log("link: ", walletData)
                window.location.href = walletData.walletData.link;
                closeModal();
            } else {
                iziToast.error({ title: 'Error', message: response.payload.response });
            }
        } catch (error) {
            iziToast.error({ title: 'Error', message: 'Failed to validate OTP.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-container wallet-otp-modal">
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

export default WalletTransferOTPModal;

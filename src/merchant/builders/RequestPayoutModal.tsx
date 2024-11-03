import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { env } from '../../shared/assets/environment/envSelector';
import './styles/requestPayoutModal.css';
import HandleSubmit from '../components/HandleSubmit';
import { setPacketStatus, setMessage, setIsAuthenticated, setGetUser, setGetWallet, authState } from '../../shared/assets/slices/authSlice';
import { useSelector } from 'react-redux';
import SuccessModal from '../builders/SuccessModal';
import WarningModal from '../builders/SuccessModal';
import Spinner from '../../shared/assets/spinner/spinner';
import iziToast from 'izitoast';



interface Bank {
    nameOfBank: string;
    codeOfBank: string;
}

interface RequestPayoutModalProps {
    setShowReqPayout: React.Dispatch<React.SetStateAction<boolean>>;
    setBlur: React.Dispatch<React.SetStateAction<boolean>>;
}

const RequestPayoutModal: React.FC<RequestPayoutModalProps> = ({ setShowReqPayout, setBlur }) => {
    const { getUser } = useSelector((state: { auth: authState }) => state.auth);
    var [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
    const [banks, setBanks] = useState<Bank[]>([]);
    const [selectedBank, setSelectedBank] = useState<{ code: string; name: string }>({ code: '', name: '' });
    const [amount, setAmount] = useState<string>('');
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [walletPin, setWalletPin] = useState<string>('');
    const { access_token = '', user = '', wallet } = getUser || {};
    const { getBankList, walletToBankTransfer } = env;

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        setShowWarningModal(false);
    };

    if (statusMessage) {
        message = statusMessage
    }

    useEffect(() => {
        const headers = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        axios.get(getBankList, headers)
            .then(response => {
                console.log("response from bank list request: ", response)
                if (response.data.status === 'success') {
                    setBanks(response.data.data.bankList);
                } else {
                    console.error('Error fetching bank list:', response.data.response);
                }
            })
            .catch(error => {
                console.error('Error fetching bank list:', error);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            bank_code: selectedBank.code,
            bank_name: selectedBank.name,
            account_number: accountNumber,
            amount: amount,
            wallet_pin: walletPin,
        };
        console.log('Payload:', payload);
        const headers = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            }
        }
        setIsLoading(true);
        try {
            const success = await HandleSubmit(e, payload, walletToBankTransfer, "POST", setPacketStatus, setStatusMessage, undefined, undefined, headers);
            console.log("success", success)
            if (success) {
                setShowSuccessModal(true)
                console.log("success modal: ", showSuccessModal)
            } else {
                setShowWarningModal(true);
                console.log("warning modal: ", showWarningModal)
            }

        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong. Please try again later!'
            })
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className='req_payout_modal_wrapper'>
            <Spinner isLoading={isLoading} />
            <div className="req_payout_title_div">
                <p className="req_payout_title">Request Payout</p>
                <button type="button" className="req_payout_modal_close_btn" onClick={() => { setShowReqPayout(false); setBlur(false); }}>X</button>
            </div>
            <form className='req_payout_form' onSubmit={handleSubmit}>
                <label className='req_payout_form_label'>
                    Bank

                    <select
                        className='req_payout_form_input form-control'
                        value={selectedBank.code}
                        onChange={(e) => {
                            const selectedBank = banks.find(b => b.codeOfBank === e.target.value);
                            if (selectedBank) {
                                setSelectedBank({ code: e.target.value, name: selectedBank.nameOfBank });
                            }
                        }}
                    >
                        <option value="">Select a bank</option>
                        {banks.length > 0 ? (
                            banks.map((bank, index) => (
                                <option key={index} value={bank.codeOfBank}>{bank.nameOfBank}</option>
                            ))
                        ) : (
                            <option disabled>Loading banks...</option>
                        )}
                    </select>
                </label>
                <label className='req_payout_form_label'>
                    Account Number
                    <input
                        className='req_payout_form_input form-control'
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                </label>
                <label className='req_payout_form_label'>
                    Amount
                    <input
                        className='req_payout_form_input form-control'
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </label>
                <label className='req_payout_form_label'>
                    Wallet PIN
                    <input
                        className='req_payout_form_input form-control'
                        type="password"
                        value={walletPin}
                        onChange={(e) => setWalletPin(e.target.value)}
                        required
                    />
                </label>
                <hr className="req_payout_hr" />
                <div className="req_payout_modal_btns_div">
                    <button className="req_payout_modal_cancel_btn" type="button" onClick={() => { setShowReqPayout(false); setBlur(false); }}>Cancel</button>
                    <button className="req_payout_modal_submit_btn" type="submit">Request</button>
                </div>
            </form>
            {showSuccessModal && <SuccessModal msg={message} onClose={handleCloseModal} />}
            {showWarningModal && <WarningModal msg={message} onClose={handleCloseModal} />}
        </div>
    );
};

export default RequestPayoutModal;

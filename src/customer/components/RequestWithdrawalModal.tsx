import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { env } from '../../shared/assets/environment/envSelector';
import '../assets/css/RequestWithdrawalModal.css';
import { useSelector } from 'react-redux';
import iziToast from 'izitoast';
import Spinner from '../../shared/assets/spinner/spinner';
import CurrencyDisplay from './CurrencyDisplay';
import OTPModal from './OTPModal';
import { RootState } from '../../shared/assets/stores/store';

interface RequestPayoutModalProps {
    setShowReqPayout: React.Dispatch<React.SetStateAction<boolean>>;
    setBlur: React.Dispatch<React.SetStateAction<boolean>>;
    selectedWallet: {
        id: number;
        name: string;
        currency: string;
        balance: string;
        user: string;
        created_on: string;
        modified_on: string;
    };
}

interface Bank {
    nameOfBank: string;
    codeOfBank: string;
}

interface WithdrawalData {
    bank_code: string,
    bank_name: string,
    account_number: string,
    currency: string,
    wallet_pin: string,
    amount: number | string
}

const RequestWithdrawalModal: React.FC<RequestPayoutModalProps> = ({ setShowReqPayout, setBlur, selectedWallet }) => {
    const userdata = useSelector((state: RootState) => state.authWallet);
    const { user } = userdata;
    const { access_token } = user?.data;
    const [amount, setAmount] = useState<number | string>('');
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [banks, setBanks] = useState<Bank[]>([]);
    const [pin, setPin] = useState<string>('');
    const [selectedBank, setSelectedBank] = useState<{ code: string; name: string }>({ code: '', name: '' });
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [withdrawalData, setWithdrawalData] = useState<WithdrawalData>();
    const [isLoading, setIsLoading] = useState(false);
    const { getBankList, walletToBankTransfer } = env;


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
    }, [getBankList]);

    // Handle payout request submission
    const handleSubmit = async () => {
        if (!Number(amount) || Number(amount) <= 0) {
            iziToast.error({ title: 'Error', message: 'Please enter a valid amount.' });
            return;
        }

        const headers = { Authorization: `Bearer ${access_token}` };
        const data: WithdrawalData = {
            bank_code: selectedBank.code,
            bank_name: selectedBank.name,
            account_number: accountNumber,
            currency: selectedWallet.currency,
            wallet_pin: pin,
            amount: amount
        };

        setIsLoading(true);
        try {
            const response = await axios.post(`${walletToBankTransfer}`, data, { headers });
            if (response.data?.status === 'success') {
                setWithdrawalData(data);
                console.log("Setting showOTPModal to true");
                setShowOTPModal(true);
                iziToast.success({ title: 'OTP Sent', message: 'An OTP has been sent to your email.' });
                // setTimeout(() => {
                //     setShowReqPayout(false);
                //   }, 1000); 
            } else {
                iziToast.error({ title: 'Error', message: 'Failed to request payout.' });
            }
        } catch (error) {
            iziToast.error({ title: 'Error', message: 'Failed to request payout.' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (showOTPModal) {
            console.log("show OTP Modal: ", showOTPModal)
        }
    }, [showOTPModal])

    return (
        <div className="modal_backdrop">
            <Spinner isLoading={isLoading} />
            <div className="modal_content">
                <h2>Request Withdrawal</h2>
                <div className="wallet_balance">
                    <p className="text-muted font-weight-bold">Wallet Balance: <span className="text-success font-weight-bolder"><CurrencyDisplay amount={selectedWallet.balance} currency={selectedWallet.currency} /></span></p>
                </div>
                <div className="row form-group">
                    <div className="col-md-6">
                        <div className="input_group">
                            <label htmlFor="bank">Bank</label>
                            <select
                                className='form-control'
                                value={selectedBank.code}
                                required
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
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input_group">
                            <label htmlFor="account">Account Number</label>
                            <input
                                id="account"
                                type="text"
                                name="account"
                                className='form-control'
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-7">
                        <div className="input_group">
                            <label htmlFor="amount">Enter Amount</label>
                            <input
                                id="amount"
                                type="number"
                                className="form-control"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount to withdraw"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="input_group">
                            <label htmlFor="pin">Enter Wallet PIN</label>
                            <input
                                id="pin"
                                type="password"
                                className="form-control"
                                maxLength={4}
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                placeholder="Enter wallet pin"
                                required
                            />
                        </div>
                    </div>
                </div>


                <div className="button_group">
                    <button className="submit_button" onClick={handleSubmit}>
                        Submit Request
                    </button>
                    <button className="close_button" onClick={() => { setShowReqPayout(false); setBlur(false); }}>
                        Close
                    </button>
                </div>
                <>
                    {showOTPModal ? (
                        <>
                            {console.log("OTP Modal should be displayed")}
                            <OTPModal
                                withdrawalData={withdrawalData}
                                closeModal={() => setShowOTPModal(false)}
                            />
                        </>
                    ) : (
                        console.log("OTP Modal is not displayed")
                    )}
                </>
            </div>
        </div>
    );
};

export default RequestWithdrawalModal;

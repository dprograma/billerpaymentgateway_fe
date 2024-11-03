import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWallet, walletList } from '../../shared/assets/slices/authWalletSlice';
import { AppDispatch, RootState } from '../../shared/assets/stores/store';
import '../assets/css/AddWallet.css';
import axios from 'axios';
import { env } from '../../shared/assets/environment/envSelector';
import Spinner from '../../shared/assets/spinner/spinner';
import iziToast from 'izitoast';


interface Wallet {
    name: string;
    currency: string;
    balance: string;
    user: string;
    created_on: string;
}

interface Currency {
    code: string;
    name: string;
}

interface WalletInput {
    token: string;
    walletData: Wallet;
}

const AddWallet: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [walletName, setWalletName] = useState<string>('');
    const [selectedCurrency, setSelectedCurrency] = useState<string>('NGN');
    const [currencyName, setCurrencyName] = useState<string>('Nigerian Naira')
    const [currency, setCurrency] = useState<string>('NGN');
    const [isLoading, setIsLoading] = useState(false);
    const [balance, setBalance] = useState<string>('0.00');
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const userdata = useSelector((state: RootState) => state.authWallet);
    const { user } = userdata;
    console.log("user from ass wallet: ", user)
    const { access_token = '', wallet } = user?.data || {};
    const loggedInUser = user?.data?.user || {};
    const { id = '' } = loggedInUser;
    const { getCurrencyList } = env;


    // Fetch available currencies from the backend
    useEffect(() => {
        const headers = {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        };
        axios.get<Currency[]>(getCurrencyList, headers)
            .then(response => {
                const sortedCurrencies = response.data.sort((a, b) => a.name.localeCompare(b.name));
                setCurrencies(sortedCurrencies);
            })
            .catch(error => {
                console.error('Error fetching currencies:', error);
            });
    }, []);


    useEffect(() => {
        if (currencies) {
            console.log("currencies: ", currencies)
        }
    }, [currencies])

    // Submit handler for creating a wallet
    const handleAddWallet = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const WalletPayload: WalletInput = {
                token: access_token,
                walletData: {
                    name: currencyName,
                    currency: selectedCurrency,
                    balance,
                    user: id,
                    created_on: new Date().toISOString(),
                }
            };
    
            console.log("payload: ", WalletPayload);
    
            const response = await dispatch(createWallet(WalletPayload));
            if (response.payload.status === 'success') {
                dispatch(walletList(access_token));
                setShowDetails(true);
                iziToast.success({
                    title: 'Success',
                    message: response.payload.response
                })
            }
        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong. Please try again.'
            })
        } finally {
        setIsLoading(false);
        }
    };

    // Handle currency selection change
    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCode = event.target.value;
        setSelectedCurrency(selectedCode);

        // Find the currency name based on the selected code
        const selectedCurrencyData = currencies.find(currency => currency.code === selectedCode);
        if (selectedCurrencyData) {
            setCurrencyName(selectedCurrencyData.name); 
            setCurrency(selectedCurrencyData.code);
        }
    };

    return (
        <div className="d-block col-12 offset-md-3 col-md-6">
            <Spinner isLoading={isLoading} />
            <div className="add-wallet-card">
                <h3 className="add-wallet-title">Create New Wallet</h3>
                <form onSubmit={handleAddWallet} className="add-wallet-form">
                    <div className="form-group">
                        <label htmlFor="walletName">Wallet Name</label>

                        <select
                            id="currency"
                            value={selectedCurrency}
                            onChange={handleCurrencyChange}
                            className="form-control"
                            required
                        >
                            {currencies.map((currency) => (
                                <option key={currency.code} value={currency.code}>
                                    {currency.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="currency">Currency</label>
                        <input
                            type="text"
                            id="walletName"
                            value={selectedCurrency}
                            className="form-control"
                            placeholder="Enter wallet name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="balance">Initial Balance</label>
                        <input
                            type="number"
                            id="balance"
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                            className="form-control"
                            placeholder="0.00"
                            readOnly
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Add Wallet
                    </button>
                </form>
            </div>

            {showDetails && (
                <div className="wallet-details">
                    <h4>Wallet Created</h4>
                    <div className="wallet-details-card">
                        <p>
                            <strong>Name:</strong> {walletName}
                        </p>
                        <p>
                            <strong>Currency:</strong> {currency}
                        </p>
                        <p>
                            <strong>Balance:</strong> {Number(balance).toFixed(2)}
                        </p>
                        <p>
                            <strong>Created On:</strong> {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddWallet;

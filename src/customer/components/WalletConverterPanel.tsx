import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from "../../shared/assets/stores/store";
import { env } from '../../shared/assets/environment/envSelector';
import '../assets/css/WalletConverter.css';  
import iziToast from 'izitoast';

interface Currency {
  code: string;
  name: string;
}

interface Wallet {
  balance: number;
  currency: string;
}

interface Props {
  user_id: string;
  initialWallet: Wallet;
}

const WalletCurrencyConverter: React.FC<Props> = ({ user_id, initialWallet }) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>(initialWallet.currency);
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [convertedBalance, setConvertedBalance] = useState<number>(initialWallet.balance);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const userdata = useSelector((state: RootState) => state.authWallet);
  const { user } = userdata;
  const { access_token = '' } = user?.data || {};
  const { getCurrencyList, getExchangeRate, makeWalletUpdate } = env;

  // Fetch available currencies from the backend
  useEffect(() => {
    const headers = {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    };
    axios.get(getCurrencyList, headers)
      .then(response => {
        setCurrencies(response.data);
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
        setError('Failed to load currencies.');
      });
  }, []);

  // Fetch the exchange rate for the selected currency from the backend
  useEffect(() => {
    const headers = {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    };
    
    // Only fetch the exchange rate if selectedCurrency is set and different from initial currency
    if (selectedCurrency && selectedCurrency !== initialWallet.currency) {
      setLoading(true);
      axios.get(`${getExchangeRate}?from=${initialWallet.currency}&to=${selectedCurrency}`, headers)
        .then(response => {
          if (response.data.data.rate) {
            console.log("response from exchange rate: ", response.data.data.rate)
            setExchangeRate(Number(response.data.data.rate));
            setConvertedBalance(initialWallet.balance * Number(response.data.data.rate));
          } else {
            setError('Failed to load exchange rate.');
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching exchange rate:', error);
          setError('Failed to load exchange rate.');
          setLoading(false);
        });
    } else {
      console.log("didn't get anything from exchange rate!")
      setExchangeRate(1);
      setConvertedBalance(initialWallet.balance);
    }
  }, [selectedCurrency, initialWallet]);

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value) {
      setSelectedCurrency(event.target.value);
      setError(null);
    }
  };

  const handleConfirm = () => {
    setLoading(true);
    const headers = {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    };
    axios.post(`${makeWalletUpdate}${user_id}/wallet/`, {
      currency: selectedCurrency,
      balance: convertedBalance
    }, headers)
    .then(response => {
      iziToast.success({
        title: 'Success',
        message: 'Wallet currency updated successfully!',
      });
      
      setLoading(false);
    })
    .catch(error => {
      console.error('Error updating wallet currency:', error);
      iziToast.error({
        title: 'Error',
        message: 'Error updating wallet currency'
      });
      setError('Failed to update wallet currency.');
      setLoading(false);
    });
  };

  return (
    <div className="wallet-converter-card ps-5 pe-5">
      <h2>Convert Wallet Currency</h2>
      <p className="current-balance">Current Balance: {initialWallet.balance.toFixed(2)} {initialWallet.currency}</p>
      
      <label htmlFor="currency" className="currency-label">Select New Currency:</label>
      <select 
        id="currency" 
        value={selectedCurrency} 
        onChange={handleCurrencyChange} 
        disabled={loading}
        className="currency-select"
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.name} ({currency.code})
          </option>
        ))}
      </select>
      
      {exchangeRate ? (
        <p className="exchange-rate">Exchange Rate: 1 {initialWallet.currency} = {exchangeRate.toFixed(4)} {selectedCurrency}</p>
      ) : (
        <p className="exchange-rate">Exchange Rate: N/A</p>
      )}
      {convertedBalance ? (
        <p className="converted-balance">Converted Balance: {convertedBalance.toFixed(2)} {selectedCurrency}</p>
      ) : (
        <p className="converted-balance">Converted Balance: N/A</p>
      )}
      
      {error && <p className="error-message">{error}</p>}
      
      <button 
        onClick={handleConfirm} 
        disabled={loading || !selectedCurrency || selectedCurrency === initialWallet.currency}
        className="confirm-button"
      >
        {loading ? 'Converting...' : 'Confirm Conversion'}
      </button>
    </div>
  );
};

export default WalletCurrencyConverter;

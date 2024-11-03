import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import WalletConverterPanel from "../components/WalletConverterPanel"; // Update the path if necessary
import WalletSelector from "../components/WalletSelector"; // Import the WalletSelector component
import { useDispatch, useSelector } from 'react-redux';
import { walletList, setWallet } from '../../shared/assets/slices/authWalletSlice';
import '../assets/css/Dashboard.css';
import { AppDispatch, RootState } from "../../shared/assets/stores/store";


interface Wallet {
  name: string;
  currency: string;
  balance: string;
  user: string;
  created_on: string;
  modified_on: string;
}

const WalletConverter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userdata = useSelector((state: RootState) => state.authWallet);
  const { user } = userdata;
  const { access_token = '' } = user?.data || {};
  const { id = '' } = userdata?.user?.data?.user || {};
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null); // Track selected wallet
  

  // Fetch and set wallets on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (access_token) {
        const response = await dispatch(walletList(access_token));
        if (response.payload.status === 'success') {
          dispatch(setWallet(response.payload.response));
        }
      }
    };
    fetchData();
  }, [access_token, dispatch]);

  // Handle the selected wallet passed from WalletSelector
  const handleWalletSelection = (wallet: Wallet) => {
    setSelectedWallet(wallet);
  };

  useEffect(() => {
    if (selectedWallet) {
      console.log("selected wallet: ", selectedWallet)
    }
  }, [selectedWallet])

  return (
    <div className="fundwallet">
      <Header />
      <div className="container-fluid">
        <div className="fundwallet-content d-flex pt-1 p-md-1 customer-background">
          <Menu />
          <main className="main-content">
            <div className="card mb-4">
              {/* Display WalletSelector component */}
              {!selectedWallet ? (
                <WalletSelector onSelectWallet={handleWalletSelection} />
              ) : (
                // Display WalletCurrencyConverter after wallet is selected
                <WalletConverterPanel 
                  user_id={id} 
                  initialWallet={{ 
                    balance: Number(selectedWallet.balance), 
                    currency: selectedWallet.currency 
                  }} 
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default WalletConverter;

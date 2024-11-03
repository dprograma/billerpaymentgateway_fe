import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../shared/assets/stores/store';
import CurrencyDisplay from "./CurrencyDisplay";
import '../assets/css/WalletSelector.css';

interface Wallet {
    id: number;
    name: string;
    currency: string;
    balance: string;
    user: string;
    created_on: string;
    modified_on: string;
}

interface WalletData {
    status: string;
    response: string;
    data: Wallet[];
  }

interface WalletsState {
    status: string;
    response: string | null;
    data: WalletData | null;
}

interface WalletSelectorProps {
    onSelectWallet: (wallet: Wallet) => void;
}

const WalletSelector: React.FC<WalletSelectorProps> = ({ onSelectWallet }) => {
    const walletlist: WalletsState = useSelector((state: RootState) => state.authWallet.wallets);
    const wallets: Wallet[] | null = walletlist?.data?.data && walletlist?.data?.data?.length > 0 ? walletlist?.data?.data : null;

    const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);

    const handleWalletClick = (wallet: Wallet) => {
        setSelectedWallet(wallet);
        onSelectWallet(wallet);
    };

    useEffect(() => {
        if (selectedWallet) {
            console.log("selected wallet is: ", selectedWallet);
        }
    })

    return (
        <div className="wallet_selector_panel">
            <h3>Select Wallet</h3>
            <div className="selector_container">
                {wallets && wallets.length > 0 ? (
                    wallets.map((wallet) => (
                        <div 
                            key={wallet.id} 
                            className={`wallet_option ${selectedWallet?.id === wallet.id ? 'selected_wallet' : ''}`} 
                            onClick={() => handleWalletClick(wallet)}
                        >
                            <p className="wallet-type"><strong>Type:</strong> {wallet.name}</p>
                            <p className="wallet-balance"><strong>Balance:</strong> <CurrencyDisplay amount={wallet.balance} currency={wallet.currency} /></p>
                        </div>
                    ))
                ) : (
                    <p>No wallets available</p>
                )}
            </div>
        </div>
    );
};

export default WalletSelector;

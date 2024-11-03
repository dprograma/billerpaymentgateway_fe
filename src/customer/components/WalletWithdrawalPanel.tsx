import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../shared/assets/stores/store';
import { env } from '../../shared/assets/environment/envSelector';
import '../assets/css/WalletWithdrawalPanel.css';
import RequestWithdrawalModal from './RequestWithdrawalModal';
import CurrencyDisplay from "./CurrencyDisplay";


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

const WalletWithdrawalPanel: React.FC = () => {
    const userdata = useSelector((state: RootState) => state.authWallet);
    const walletlist: WalletsState = useSelector((state: RootState) => state.authWallet.wallets);
    const wallets: Wallet[] | null = walletlist?.data?.data && walletlist?.data?.data?.length > 0 ? walletlist?.data?.data : null;

    console.log("wallets from wallet withdrawal panel: ", wallets)
    
    const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
    const [showReqPayout, setShowReqPayout] = useState(false);
    const [blur, setBlur] = useState(false);


    // Handle wallet selection
    const handleSelectWallet = (wallet: Wallet) => {
        setSelectedWallet(wallet);
        setShowReqPayout(true);
    };

    return (
        <div className={`wallet_withdrawal_panel ${blur ? 'blur' : ''}`}>
            <h3 className="panel_title">Select Wallet for Withdrawal</h3>
                <div className="wallet_list">
                    {wallets && wallets.length > 0 ? (
                        wallets.map((wallet) => (
                            <div key={wallet.id} className="wallet_item" onClick={() => handleSelectWallet(wallet)}>
                                <p className="wallet_type"><strong>Type:</strong> {wallet.name}</p>
                                <p className="wallet_balance"><strong>Balance:</strong> <CurrencyDisplay amount={wallet.balance} currency={wallet.currency} /></p>
                            </div>
                        ))
                    ) : (
                        <p className="no_wallets_text">No wallets available</p>
                    )}
                </div>

            {showReqPayout && selectedWallet && (
                <RequestWithdrawalModal
                    setShowReqPayout={setShowReqPayout}
                    setBlur={setBlur}
                    selectedWallet={selectedWallet}
                />
            )}
        </div>
    );
};

export default WalletWithdrawalPanel;

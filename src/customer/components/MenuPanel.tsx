import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
    Dashboard,
    AccountBalanceWallet,
    AttachMoney,
    History,
    CreditCard,
    Phone,
    Settings,
    HeadsetMic,
    Key,
    ReceiptLong,
    Wallet,
    VolunteerActivism,
    ExpandMore,
    ChevronRight,
    Summarize,
    AddCircleOutline,
    AddCard 
} from "@mui/icons-material";
import "../assets/css/Menu.css";

const MenuPanel: React.FC = () => {
    const { t } = useTranslation('customer_menu');
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isWalletManagementExpanded, setIsWalletManagementExpanded] = useState<boolean>(false);

    const handleMenuClick = (index: number) => {
        setActiveIndex(index);
    };

    const handleWalletManagementClick = () => {
        setIsWalletManagementExpanded(!isWalletManagementExpanded);
    };

    const menuItems = [
        { name: t('dashboard'), icon: <Dashboard />, path: 'dashboard' },
        { name: t('send_money'), icon: <AttachMoney />, path: 'send-money' },

        // Wallet Management Tab
        {
            name: t('wallet_management'),
            icon: <Wallet />,
            isExpandable: true,
            isExpanded: isWalletManagementExpanded,
            subItems: [
                { name: t('wallet_summary'), icon: <Summarize />, path: 'wallet-summary' },
                { name: t('fund_wallet'), icon: <AddCard />, path: 'fund-wallet' },
                { name: t('add_wallet'), icon: <AddCircleOutline />, path: 'add-wallet' },
                { name: t('set_wallet_pin'), icon: <Key />, path: 'set-pin' },
                { name: t('wallet_currency'), icon: <Wallet />, path: 'wallet-converter' },
                { name: t('wallet_withdrawal'), icon: <AccountBalanceWallet />, path: 'wallet-withdrawal' },
            ]
        },

        { name: t('pay_bills'), icon: <ReceiptLong />, path: 'billers' },
        { name: t('make_donations'), icon: <VolunteerActivism />, path: 'donations' },
        { name: t('transaction_history'), icon: <History />, path: 'transaction-history' },
        { name: t('cards'), icon: <CreditCard />, path: 'cards' },
        { name: t('dispute'), icon: <Phone />, path: 'dispute' },
        { name: t('settings'), icon: <Settings />, path: 'settings' },
        { name: t('support'), icon: <HeadsetMic />, path: 'support' },
    ];

    return (
        <ul className="menu-items">
            {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                    <li
                        className={`menu-item ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => item.isExpandable ? handleWalletManagementClick() : handleMenuClick(index)}
                    >
                        <div className="menu-icon">{item.icon}</div>
                        <span className="menu-text" onClick={() => !item.isExpandable && navigate(`/customer/${item.path}`)}>
                            {item.name}
                        </span>
                        {item.isExpandable && (
                            <div className="menu-icon">
                                {isWalletManagementExpanded ? <ExpandMore /> : <ChevronRight />}
                            </div>
                        )}
                    </li>

                    {isWalletManagementExpanded && item.subItems && (
                        <ul className="submenu-items">
                            {item.subItems.map((subItem, subIndex) => (
                                <li key={subIndex} className="menu-item" onClick={() => navigate(`/customer/${subItem.path}`)}>
                                    <div className="menu-icon">{subItem.icon}</div>
                                    <span className="menu-text">{subItem.name}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </React.Fragment>
            ))}
        </ul>
    );
};

export default MenuPanel;

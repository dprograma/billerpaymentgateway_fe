import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import LocalTransfer from '../components/LocalTransfer';
import WalletToWallet from './WalletToWallet';
import SendToAfrica from '../components/SendToAfrica';
import International from '../components/International';
import Menu from '../components/Menu';
import Header from '../components/Header';
import '../assets/css/SendMoney.css';
import iziToast from 'izitoast';

const SendMoney: React.FC = () => {
  const { t } = useTranslation('customer_sendmoney');
  const [activeComponent, setActiveComponent] = useState('');

  const handleShow = (type: string) => {
    setActiveComponent(type);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'local':
        // return <LocalTransfer />;
        iziToast.info({
          title: 'Local Transfer',
          message: 'Local Transfer coming soon!',
        });
        return <></>
      case 'wallet':
        return <WalletToWallet />;
      case 'africa':
        // return <SendToAfrica />;
        iziToast.info({
          title: 'Pan-African Transfer',
          message: 'Pan-African Transfer coming soon!',
        });
        return <></>
      case 'international':
        // return <International />;
        iziToast.info({
          title: 'International Transfer',
          message: 'International Transfer coming soon!',
        });
        return <></>
      default:
        return <></>;
    }
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="container-fluid bg-default-bg">
        <div className="dashboard-content d-flex pt-1 p-md-1 customer-background">
          <Menu />
          <main className="main-content">
            <div className="send-money-content">
              <h2 className="send-money-title">{t('send_money')}</h2>
              <nav className="send-money-nav">
                <ul className="send-money-nav-list mx-auto">
                  <li className="send-money-nav-item">
                    <NavLink to="#" className="send-money-link default-theme-color default-white-text-color" onClick={() => handleShow('local')}>
                      {t('local_transfer')}
                    </NavLink>
                  </li>
                  <li className="send-money-nav-item">
                    <NavLink to="#" className="send-money-link default-theme-color default-white-text-color" onClick={() => handleShow('wallet')}>
                      {t('wallet_to_wallet')}
                    </NavLink>
                  </li>
                  <li className="send-money-nav-item">
                    <NavLink to="#" className="send-money-link default-theme-color default-white-text-color" onClick={() => handleShow('africa')}>
                      {t('send_to_africa')}
                    </NavLink>
                  </li>
                  <li className="send-money-nav-item">
                    <NavLink to="#" className="send-money-link default-theme-color default-white-text-color" onClick={() => handleShow('international')}>
                      {t('international')}
                    </NavLink>
                  </li>
                </ul>
              </nav>
              <div className="send-money-transaction">
                {renderComponent()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;

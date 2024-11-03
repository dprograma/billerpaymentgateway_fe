import React, { useState, useEffect } from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RootState, AppDispatch } from '../../shared/assets/stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { walletList, setWallet } from '../../shared/assets/slices/authWalletSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faMoneyCheck, faHandHoldingUsd, faExchangeAlt, faPiggyBank, faGraduationCap, faBuilding, faBars, faHandsHelping } from "@fortawesome/free-solid-svg-icons";
import '../assets/css/Main.css';
import CurrencyDisplay from './CurrencyDisplay';

const Main: React.FC = () => {
  const { t } = useTranslation('customer_main');
  const tasks = [
    { name: t('transfer_money'), icon: faExchangeAlt, description: t('transfer_money_desc'), additional: t('transfer_money_add'), url: 'send-money'},
    { name: t('school_and_exams'), icon: faGraduationCap, description: t('school_and_exams_desc'), additional: t('school_and_exams_add'), url: 'dashboard'},
    { name: t('donations'), icon: faHandsHelping, description: t('donations_desc'), additional: t('donations_add'), url: 'donations'},
    { name: t('wallet_topup'), icon: faPiggyBank, description: t('wallet_topup_desc'), additional: t('wallet_topup_add'), url: 'fund-wallet'},
    { name: t('embassies'), icon: faBuilding, description: t('embassies_desc'), additional: t('embassies_add'), url: 'dashboard'},
    { name: t('fund_betting'), icon: faHandHoldingUsd, description: t('fund_betting_desc'), additional: t('fund_betting_add'), url: 'dashboard'},
    { name: t('customer_payment'), icon: faMoneyCheck, description: t('customer_payment_desc'), additional: t('customer_payment_add'), url: 'billers'},
    { name: t('others'), icon: faBars, description: t('others_desc'), additional: t('others_add'), url: 'dashboard'},
  ];

  const [balance, setBalance] = useState<string | number>(0);
  const [currency, setCurrency] = useState<string>('');
  const [selectedWalletId, setSelectedWalletId] = useState<number | null>(null);
  const [wallets, setWallets] = useState<any[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userdata = useSelector((state: RootState) => state.authWallet);
  const { user } = userdata;
  console.log("new user data: ", user);
  const { access_token='' } = user?.data || {};

  useEffect(() => {
    const fetchData = async () => {
      if (access_token) {
        const response = await dispatch(walletList(access_token));
        if (response.payload.status === 'success') {
          const walletsData = response.payload.data;
          setWallets(walletsData);
          
          // Set default wallet (first one in the list)
          const { id, balance, currency } = walletsData[0];
          setSelectedWalletId(id);
          setBalance(balance);
          setCurrency(currency);
          dispatch(setWallet(response.payload.response));
        }
      }
    };

    fetchData();
  }, [access_token, dispatch]);

  // Handle wallet selection
  const handleWalletChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    setSelectedWalletId(selectedId);

    // Find selected wallet and update balance and currency
    const selectedWallet = wallets.find(wallet => wallet.id === selectedId);
    if (selectedWallet) {
      setBalance(selectedWallet.balance);
      setCurrency(selectedWallet.currency);
    }
  };

  return (
    <div className="main-container">
      <div className="row">
        <div className="col-12">
          <h5 className="mb-4 text-muted">{t('customer_dashboard')}</h5>

          {/* Wallet Dropdown and Balance */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 bg-white p-4 rounded-3 shadow">
            {/* Wallet Selection Dropdown */}
            <div className="d-flex flex-column flex-md-row align-items-center mb-3 mb-md-0">
              <FontAwesomeIcon icon={faWallet} className="wallet-icon" />
              <div className="d-flex flex-column ms-3 mt-2 mt-md-0">
                <span className="text-secondary fs-6">{t('select_wallet')}</span>
                <select
                  className="form-select"
                  value={selectedWalletId || ''}
                  onChange={handleWalletChange}
                >
                  {wallets.map(wallet => (
                    <option key={wallet.id} value={wallet.id}>
                      {wallet.name} ({wallet.currency})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Wallet Balance Display */}
            <div className="d-flex flex-column flex-md-row align-items-center mb-3 mb-md-0">
              <div className="d-flex flex-column ms-3 mt-2 mt-md-0">
                <span className="text-secondary fs-6">{t('wallet_balance')}</span>
                {currency && balance !== null ? (
                  <span className="badge fs-6" style={{ backgroundColor: '#b20c02', padding: '5px 3px' }}>
                    <CurrencyDisplay amount={balance} currency={currency} />
                  </span>
                ) : (
                  <span>Loading...</span>
                )}
              </div>
            </div>
          </div>

          {/* Frequently Used Tasks */}
          <div className="mt-5">
            <h5 className="mb-4 text-muted">{t('my_favourites')}</h5>
            <div className="row">
              {tasks.map((task, index) => (
                <div key={index} className="col-12 col-md-3 mb-4">
                  <div className="card p-3 bg-white shadow rounded-3 card-size" onClick={() => navigate(`/customer/${task.url}`)}>
                    <div className="card-body text-center">
                      <FontAwesomeIcon icon={task.icon} size="2x" className="mb-3" style={{ color: '#b20c02' }} />
                      <h5 className="card-title text-dark">{task.name}</h5>
                      <p className="card-text">{task.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

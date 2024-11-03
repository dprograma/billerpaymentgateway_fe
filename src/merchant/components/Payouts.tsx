import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import {
    FaMagnifyingGlass
} from "react-icons/fa6";
import "./styles/payouts.css"
import Window from "../Window";
import RequestPayoutModal from "../builders/RequestPayoutModal";
import { useSelector } from "react-redux";
import { authState } from '../../shared/assets/slices/authSlice';
import CurrencyDisplay from "../../customer/components/CurrencyDisplay";
import axios from "axios";
import { env } from '../../shared/assets/environment/envSelector';


type Props = {}

const PayoutsView = (props: Props) => {
    const { t } = useTranslation('merchant_payouts');
    const [showAddCustomer, setShowAddCustomer] = useState<boolean>(false)
    const [showReqPayout, setShowReqPayout] = useState<boolean>(false)
    const [blur, setBlur] = useState<boolean>(false)
    const [balance, setBalance] = useState<any>()
    const { getUser } = useSelector((state: { auth: authState }) => state.auth);
    const { access_token = '', user = '', wallet='' } = getUser || {}
    const { walletList } = env;
    const { currency } = wallet[0]




    useEffect(() => {
        // Fetch custom billers
        const fetchCustomBillers = async () => {
            const headers = {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            };
            try {
                const response = await axios.get(walletList, headers); 
                console.log("billers: ", response.data.data[0])
                if (response?.data?.status === 'success') {
                    const { balance } = response?.data?.data[0]
                    setBalance(balance)
                }
            } catch (error) {
                console.error('Error fetching custom billers:', error);
            }
        };

        fetchCustomBillers();
    }, [access_token, walletList]);


  return (
    <div className='payouts_super_container1'>
        <div className= {blur? "payouts_super_container_blur" : "payouts_super_container"}>
            <div className="payouts_header_info">
                <p className="payouts_header_title">{t('withdrawals')}</p>
                <p className='payouts_desc_text'>{t('descriptive_body')}</p>
                <button type="button" className="payouts_addNewpayoutsomer_btn" onClick={() => {setShowReqPayout(true); }}>+ {t('request_withdrawal')}</button>
            </div>
            <div className='payouts_search_bar_container'>
                <div className='payouts_search_box'>
                    <FaMagnifyingGlass size={30} color='#667085'/>
                    <input placeholder={t('search')} type='search' id='payouts_search_input'/>
                </div>
                <select className="payouts_search_filter">
                    <option value="">{t('filter')}</option>
                    <option value="date_filter">{t('filter_by_date')}</option>
                    <option value="amount_filter">{t('filter_by_amount')}</option>
                </select>
            </div>
            <div className="payouts_dashboard_container">
                <div className="payouts_dashboard_section">
                    <p className="payouts_dashboard_section_title">{t('wallet_balance')}</p>
                    <p className="payouts_dashboad_text"><CurrencyDisplay amount={balance} currency={currency}/></p>
                </div>
                <div className="payouts_dashboard_section">
                    <p className="payouts_dashboard_section_title">{t('available_balance')}</p>
                    <p className="payouts_dashboad_text available_balance"><CurrencyDisplay amount={balance} currency={currency}/></p>
                </div>
                <div className="payouts_dashboard_section">
                    <p className="payouts_dashboard_section_title">{t('total_requested')}</p>
                    <p className="payouts_dashboad_text">N1,000,000</p>
                </div>
                <div className="payouts_dashboard_section">
                    <p className="payouts_dashboard_section_title">{t('total_received')}</p>
                    <p className="payouts_dashboad_text">N800,000</p>
                </div>
            </div>
            <div className="payouts_container">
                <div className="payouts_header">
                    <p className="payouts_text">{t('amount')}</p>
                    <p className="payouts_text">{t('date_requested')}</p>
                    <p className="payouts_text">{t('status')}</p>
                </div>
                <hr className="payouts_hr" />
                <div className="payouts_section">
                    <p className="payouts_text_ln">N50,000</p>
                    <p className="payouts_text_ln">14 June, 2022</p>
                    <div className="payouts_status_wrapper">
                        <p className="payouts_status_pending">Pending</p>  
                    </div>  
                </div>
                <hr className="payouts_hr" />
                <div className="payouts_section">
                    <p className="payouts_text_ln">N50,000</p>
                    <p className="payouts_text_ln">14 June, 2022</p>
                    <div className="payouts_status_wrapper">
                        <p className="payouts_status_pending">Pending</p>  
                    </div>  
                </div>
                <hr className="payouts_hr" />
                <div className="payouts_section">
                    <p className="payouts_text_ln">N50,000</p>
                    <p className="payouts_text_ln">14 June, 2022</p>
                    <div className="payouts_status_wrapper">
                        <p className="payouts_status_paid">Paid</p>  
                    </div>  
                </div>
                <hr className="payouts_hr" />
                <div className="payouts_section">
                    <p className="payouts_text_ln">N50,000</p>
                    <p className="payouts_text_ln">14 June, 2022</p>
                    <div className="payouts_status_wrapper">
                        <p className="payouts_status_paid">Paid</p>  
                    </div>  
                </div>
                <hr className="payouts_hr" />
                <div className="payouts_section">
                    <p className="payouts_text_ln">N50,000</p>
                    <p className="payouts_text_ln">14 June, 2022</p>
                    <div className="payouts_status_wrapper">
                        <p className="payouts_status_paid">Paid</p>  
                    </div>  
                </div>
                <hr className="payouts_hr" />
                <div className="payouts_section">
                    <p className="payouts_text_ln">N50,000</p>
                    <p className="payouts_text_ln">14 June, 2022</p>
                    <div className="payouts_status_wrapper">
                        <p className="payouts_status_paid">Paid</p>  
                    </div>  
                </div>
                <hr className="payouts_hr" />
                <div className="payouts_section">
                    <p className="payouts_text_ln">N50,000</p>
                    <p className="payouts_text_ln">14 June, 2022</p>
                    <div className="payouts_status_wrapper">
                        <p className="payouts_status_paid">Paid</p>  
                    </div>  
                </div>
                <hr className="payouts_hr" />
                <div className="payouts_section">
                    <p className="payouts_text_ln">N50,000</p>
                    <p className="payouts_text_ln">14 June, 2022</p>
                    <div className="payouts_status_wrapper">
                        <p className="payouts_status_paid">Paid</p>  
                    </div>  
                </div>
                <hr className="payouts_hr" />
                <div className="payouts_section">
                    <p className="payouts_text_ln">N50,000</p>
                    <p className="payouts_text_ln">14 June, 2022</p>
                    <div className="payouts_status_wrapper">
                        <p className="payouts_status_paid">Paid</p>  
                    </div>  
                </div>
                <hr className="payouts_hr" />
                <div className="payouts_section">
                    <p className="payouts_text_ln">N50,000</p>
                    <p className="payouts_text_ln">14 June, 2022</p>
                    <div className="payouts_status_wrapper">
                        <p className="payouts_status_paid">Paid</p>  
                    </div>  
                </div>
                <hr className="payouts_hr" />
                <div className="payouts_section">
                    <p className="payouts_text_ln">N50,000</p>
                    <p className="payouts_text_ln">14 June, 2022</p>
                    <div className="payouts_status_wrapper">
                        <p className="payouts_status_paid">Paid</p>  
                    </div>  
                </div>
                <hr className="payouts_hr" />
            </div>
        </div>
        {showReqPayout && (
        <RequestPayoutModal setShowReqPayout={setShowReqPayout} setBlur={setBlur} />
      )}
    </div>
  )
}

const Payouts= () => {
    const content = {
        currentView: <PayoutsView />,
        activeId: 7
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}

export default Payouts
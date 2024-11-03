import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import {
    FaArrowDown,
    FaArrowUp
} from "react-icons/fa6";
import BuildLineGraph from "../builders/BuildLineGraph";
import "./styles/dashboard.css"
import Window from "../Window";
import UnvarifiedWelcomeOverlay from "../builders/UnvarifiedWelcomeOverlay";
import { useDispatch, useSelector } from "react-redux";
import { authState, setGetProduct } from '../../shared/assets/slices/authSlice';
import BuildTransaction from "../builders/BuildTransaction";
import CurrencyDisplay from "../../customer/components/CurrencyDisplay";
import axios from 'axios';
import { env } from '../../shared/assets/environment/envSelector';


const DashboardView = () => {
    const { t } = useTranslation('merchant_dashboard');
    const dispatch = useDispatch()
    const { getUser } = useSelector((state: { auth: authState }) => state.auth);
    const { access_token = '', user = '', wallet } = getUser || {}
    const [verified, setVerified] = useState<any>();
    const [balance, setBalance] = useState<any>();
    const [currency, setCurrency] = useState<any>();
    const { walletList, getCurrentUser } = env;


    useEffect(() => {
        const fetchCurrentUser = async () => {
            const headers = {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            };
            try {
                const response = await axios.get(getCurrentUser, headers);
                console.log("user: ", response.data.data)
                if (response?.data?.status === 'success') {
                    const { compliant } = response?.data?.data
                    if (compliant) {
                        setVerified(true)
                    }
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }
        fetchCurrentUser();
    }, [access_token, getCurrentUser])

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
                    const { balance, currency } = response?.data?.data[0]
                    setBalance(balance)
                    setCurrency(currency)
                    dispatch(setGetProduct(response?.data?.data));
                }
            } catch (error) {
                console.error('Error fetching custom billers:', error);
            }
        };

        fetchCustomBillers();
    }, [access_token, walletList]);


    useEffect(() => {
        if (verified) {
            console.log("verified: ", verified)
        }
    }, [verified])


    const transactions = [
        {
            customerName: { first_name: "Grace Doris" },
            date: "12/02/2023",
            item: "Coaching Plan",
            successStatus: true,
            paymentMethod: "Card",
            paymentAmount: "20,500"
        },
        {
            customerName: { first_name: "Adams John" },
            date: "12/02/2023",
            item: "Mentorship",
            successStatus: false,
            paymentMethod: "Card",
            paymentAmount: "20,500"
        },
        {
            customerName: { first_name: "Grace Doris" },
            date: "12/02/2023",
            item: "Coaching Plan",
            successStatus: true,
            paymentMethod: "Card",
            paymentAmount: "20,500"
        },
        {
            customerName: { first_name: "Grace Doris" },
            date: "12/02/2023",
            item: "Coaching Plan",
            successStatus: true,
            paymentMethod: "Card",
            paymentAmount: "20,500"
        }
    ]

    return (
        <div>
            <div className={verified ? 'view_screen' : "transactions_super_container_blur"}>
                <div className='transactions_super_container'>
                    <div className='trans_container'>
                        <p className='trans_title'>{t('wallet_balance')}</p>
                        <div className='trans_wrapper'>
                            {currency && balance !== null ? (
                                <p className='trans_amount'><CurrencyDisplay amount={balance} currency={currency} /></p>
                            ) : (
                                <p>Loading...</p>
                            )}
                            <div className='trans_chart_up'>
                                <FaArrowUp />
                                <p className='trans_percent'>0%</p>
                            </div>
                        </div>
                    </div>
                    <div className='trans_container'>
                        <p className='trans_title'>{t('available_balance')}</p>
                        <div className='trans_wrapper'>
                            {currency && balance !== null ? (
                                <p className='trans_amount'><CurrencyDisplay amount={balance} currency={currency} /></p>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                    <div className='trans_container'>
                        <p className='trans_title'>{t('failed_transactions')}</p>
                        <div className='trans_wrapper'>
                            <p className='trans_amount'>0</p>
                            <div className='trans_chart_up'>
                                <FaArrowUp />
                                <p className='trans_percent'>0%</p>
                            </div>
                        </div>
                    </div>
                    <div className='trans_container'>
                        <p className='trans_title'>{t('new_customers')}</p>
                        <div className='trans_wrapper'>
                            <p className='trans_amount'>0</p>
                            <div className='trans_chart_down'>
                                <FaArrowDown />
                                <p className='trans_percent'>0%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="revenue_super_container">
                    <p className="header_title">{t('revenue')}</p>
                    <div className='revenue'>
                        <div className='rev_container'>
                            <div className='rev_wrapper1'>
                                <div className='rev_gross_color'></div>
                                <p className='rev_title'>{t('gross_volume')}</p>
                            </div>
                            <div className='rev_wrapper2'>
                                <p className='rev_amount'>0</p>
                                <div className='rev_chart_up'>
                                    <FaArrowUp />
                                    <p className='rev_percent'>0%</p>
                                </div>
                            </div>
                        </div>
                        <div className='rev_container'>
                            <div className='rev_wrapper1'>
                                <div className='rev_net_color'></div>
                                <p className='rev_title'>{t('net_volume')}</p>
                            </div>
                            <div className='rev_wrapper2'>
                                <p className='rev_amount'>{currency}0</p>
                                <div className='rev_chart_up'>
                                    <FaArrowUp />
                                    <p className='rev_percent'>0%</p>
                                </div>
                            </div>
                        </div>
                        <div className="rev_filter_container">
                            <select className="rev_filter">
                                <option value="">Filter</option>
                                <option value="date_filter">{t('filter_by_date')}</option>
                                <option value="amount_filter">{t('filter_by_amount')}</option>
                            </select>
                        </div>
                    </div>
                    <div className="line_graph">
                        <BuildLineGraph />
                    </div>
                </div>
                <div className="translog_super_container">
                    <p className="header_title">{t('transactions')}</p>
                    <div className="translog_container">
                        <div className="translog_header">
                            <p className="tlog_text">{t('customer')}</p>
                            <p className="tlog_text">{t('date')}</p>
                            <p className="tlog_text">{t('item')}</p>
                            <p className="tlog_text">{t('status')}</p>
                            <p className="tlog_text">{t('payment_method')}</p>
                            <p className="tlog_text">{t('amount')}</p>
                        </div>
                        <hr className="translog_hr" />
                        {/* {
                            transactions.map((transaction) => BuildTransaction(transaction))
                        } */}
                    </div>
                </div>
            </div>
            {!verified &&
                <UnvarifiedWelcomeOverlay setVarified={setVerified} />
            }
        </div>
    )
}


const Dashboard = () => {
    const content = {
        currentView: <DashboardView />,
        activeId: 1
    }
    return (
        <Window currentView={content.currentView} activeId={content.activeId} />
    )
}
export default Dashboard
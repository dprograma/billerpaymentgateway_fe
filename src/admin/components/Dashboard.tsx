import React, { useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../shared/assets/stores/store';
import {
    FaBagShopping,
    FaShop,
    FaPeopleGroup,
    FaLinesLeaning,
    FaRegFileLines

} from "react-icons/fa6";
import {useNavigate} from 'react-router-dom';
import Window from '../Window';
import "./styles/dashboard.css"
import TransactionLogList from './TransactionLogList';
import { AllMerchantTransactions } from '../../shared/assets/slices/adminSlice';


interface transactionProps {
    id: number;
    amount: number;
    fee: number;
    balance_before: number;
    balance_after: number;
    order: string;
    reference: string;
    note: string;
    gateway: string;
    transaction_type: string;
    payment_type: string;
    status: string;
    date: string;
    user: {
        id: number;
        first_name: string;
        last_name: string;
        username: string;
        country: string;
        phone_number: string;
        user_type: string;
        address: string;
        email: string;
        is_activated: boolean;
        avatar: string,
        profile_picture: string;
        business_name: string;
        compliant: boolean;
    };
}

const DashboardView = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const [transactions, setTransactions] = useState<transactionProps[]>([])
    // retrieve transactions from record
    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await dispatch(AllMerchantTransactions());
            console.log("merchant transactions: ", response.payload.results)
            const recentTransactions = response.payload.results.slice(-5)
            setTransactions(recentTransactions)
        };
        fetchTransactions();
    }, [dispatch]);

    return (
        <div className='dash_sup_cont'>
            <h2 className='dash_title1'>Dashboard</h2>
            <div className='dash_overview'>
                <div className='dash_overview_sec'>
                    <FaBagShopping size={30} color='#EA580C' className='dash_overview_icn' />
                    <div>
                        <p className='dash_overview_desc'>Total Transactions</p>
                        <p className='dash_overview_amt'>N209,456,059</p>
                    </div>
                </div>
                <div className='dash_overview_sec'>
                    <FaShop size={30} color='#7C3AED' className='dash_overview_icn' />
                    <div>
                        <p className='dash_overview_desc'>Total Merchants</p>
                        <p className='dash_overview_amt'>3,326</p>
                    </div>
                </div>
                <div className='dash_overview_sec'>
                    <FaPeopleGroup size={30} color='#059669' className='dash_overview_icn' />
                    <div>
                        <p className='dash_overview_desc'>Total Users</p>
                        <p className='dash_overview_amt'>5,325</p>
                    </div>
                </div>
                {/* <div className='dash_overview_sec'>
                <FaLinesLeaning size={30} color='#9333EA' className='dash_overview_icn'/>
                <div>
                    <p className='dash_overview_desc'>Total Orders</p>
                    <p className='dash_overview_amt'>1,326</p>
                </div>
            </div> */}
            </div>
            <div className='dash_trans_cont'>
                <div className='dash_title2_wrp'>
                    <p className='dash_title2'>Recent Transactions</p>
                    <h2 className='dash_title2_b' onClick={()=> navigate('/admin/transactions')}>View All</h2>
                </div>
                <div>
                    <TransactionLogList transactions={transactions} />
                </div>
            </div>

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
import React, { useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../shared/assets/stores/store';
import {
    FaBagShopping,
    FaShop,
    FaMagnifyingGlass,
    FaPeopleGroup,
    FaLinesLeaning,
    FaRegFileLines

} from "react-icons/fa6";
import Window from '../Window';
import "./styles/transactions.css"
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
    user?: {
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

const TransactionsView = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [transactions, setTransactions] = useState<transactionProps[]>([])

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await dispatch(AllMerchantTransactions());
            console.log("merchant transactions: ", response)
            setTransactions(response.payload.results)
        };
        fetchTransactions();
    }, [dispatch]);

  return (
    <div className='trans_sup_cont'>
        <h2 className='trans_title1'>Transactions</h2>
        <div className='trans_overview'>
            <div className='trans_overview_sec'>
                <FaBagShopping size={30} color='#EA580C' className='trans_overview_icn'/>
                <div>
                    <p className='trans_overview_desc'>Total Transactions</p>
                    <p className='trans_overview_amt'>N209,456,059</p>
                </div>
            </div>
            <div className='trans_overview_sec'>
                <FaBagShopping size={30} color='#27AE60' className='trans_overview_icn'/>
                <div>
                    <p className='trans_overview_desc'>Successful Transactions</p>
                    <p className='trans_overview_amt'>5545</p>
                </div>
            </div>
            <div className='trans_overview_sec'>
                <FaBagShopping size={30} color='#EB5757' className='trans_overview_icn'/>
                <div>
                    <p className='trans_overview_desc'>Failed Transactions</p>
                    <p className='trans_overview_amt'>38</p>
                </div>
            </div>
            <div className='trans_overview_sec'>
                <FaLinesLeaning size={30} color='#9333EA' className='trans_overview_icn'/>
                <div>
                    <p className='trans_overview_desc'>Total Orders</p>
                    <p className='trans_overview_amt'>1,326</p>
                </div>
            </div>
        </div>
        <div className='trans_trans_cont'>
            {/* <div className='trans_trans_hd'>
                <p className='trans_trans_hd_txt'>Customer</p>
                <p className='trans_trans_hd_txt'>Amount</p>
                <p className='trans_trans_hd_txt'>Merchant</p>
                <p className='trans_trans_hd_txt'>Status</p>
                <p className='trans_trans_hd_txt'></p>
            </div> */}
            <div>
            <TransactionLogList transactions={transactions} />
            </div>
        </div>

    </div>
  )
}
const Transactions = () => {
    const content = {
        currentView: <TransactionsView />,
        activeId: 2
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}
export default Transactions
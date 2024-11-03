import React, { useState, useEffect, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Window from '../Window';
import BuildTransaction from '../builders/BuildTransaction';
import { env } from '../../shared/assets/environment/envSelector';
import { authState } from '../../shared/assets/slices/authSlice';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "./styles/transactions.css";

// Define the interfaces for transaction and user data
interface User {
    first_name: string;
    last_name: string;
    email: string;
    [key: string]: any;
}

interface Transaction {
    reference: string;
    note: string;
    date: string;
    status: string;
    payment_type: string;
    amount: string;
    user: User;
    [key: string]: any;
}

interface TransactionsResponse {
    results: Transaction[];
    count: number;
}

declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
    }
}

const TransactionsView: React.FC = () => {
    const { t } = useTranslation('merchant_transactions');
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const { getUser } = useSelector((state: { auth: authState }) => state.auth);
    const { access_token = '', wallet = '' } = getUser || {};
    const { merchantTransactions } = env;
    const currency = wallet[0]?.currency || '';

    useEffect(() => {
        fetchTransactions();
    }, [currentPage, searchQuery]);

    const fetchTransactions = async () => {
        try {
            const headers = {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            };

            const response = await axios.get<TransactionsResponse>(`${merchantTransactions}?page=${currentPage}&search=${searchQuery}`, headers);

            setTransactions(response.data.results);
            setTotalPages(Math.ceil(response.data.count / 10));
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    // const exportCSV = () => {
    //     const csvData = transactions.map(transaction => ({
    //         Reference: transaction.reference,
    //         Customer: `${transaction.user.first_name} ${transaction.user.last_name}`,
    //         Date: transaction.date,
    //         Note: transaction.note,
    //         Status: transaction.status,
    //         PaymentType: transaction.payment_type,
    //         Amount: transaction.amount,
    //     }));

    //     const csvRows = [
    //         ["Reference", "Customer", "Date", "Note", "Status", "Payment Type", "Amount"],
    //         ...csvData.map(row => Object.values(row))
    //     ];

    //     const csvContent = csvRows.map(row => row.join(',')).join('\n');
    //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    //     const link = document.createElement('a');
    //     const url = URL.createObjectURL(blob);
    //     link.setAttribute('href', url);
    //     link.setAttribute('download', 'transactions.csv');
    //     link.style.visibility = 'hidden';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    const exportCSV = () => {
        const csvContent = [
            ['Reference', 'Customer', 'Date', 'Note', 'Status', 'Payment Type', 'Amount'],
            ...transactions.map(transaction => [
                transaction.reference,
                transaction.user ? `${transaction.user.first_name} ${transaction.user.last_name}` : 'N/A',
                transaction.date || 'N/A',
                transaction.note || 'N/A',
                transaction.status || 'N/A',
                transaction.payment_type || 'N/A',
                transaction.amount || 'N/A'
            ])
        ];
    
        const csvString = csvContent.map(e => e.join(",")).join("\n");
    
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text(t('transactions'), 14, 16);
        doc.autoTable({
            head: [['Reference', 'Customer', 'Date', 'Note', 'Status', 'Payment Type', 'Amount']],
            body: transactions.map(transaction => [
                transaction.reference,
                transaction.user ? `${transaction.user.first_name} ${transaction.user.last_name}` : 'N/A',
                transaction.date || 'N/A',
                transaction.note || 'N/A',
                transaction.status || 'N/A',
                transaction.payment_type || 'N/A',
                transaction.amount || 'N/A'
            ]),
        });
        doc.save('transactions.pdf');
    };

    return (
        <div className='view_screen'>
            <div className="t_super_container">
                <p className="t_header_title">{t('transactions')}</p>
                <p className='t_desc_text'>{t('transaction_details')}</p>
                <div className='t_row2_container'>
                    <div className='t_search_bar_container'>
                        <div className='t_search_box'>
                            <FaMagnifyingGlass size={30} color='#667085' />
                            <input
                                placeholder={t('search')}
                                type='search'
                                id='t_search_input'
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                    <div className='t_exp_btns_wrapper'>
                        <button className='t_exp_btn' type='button' onClick={exportCSV}>{t('export_csv')}</button>
                        <button className='t_exp_btn' type='button' onClick={exportPDF}>{t('export_pdf')}</button>
                    </div>
                </div>
                <div className="t_container">
                    <hr className="translog_hr" />
                    {transactions.map((transaction, index) => (
                        <BuildTransaction
                            key={index}
                            refNo={transaction.reference}
                            customerName={transaction.user?.first_name || 'N/A'}
                            date={transaction.date}
                            item={transaction.note}
                            successStatus={transaction.status}
                            paymentMethod={transaction.payment_type}
                            paymentAmount={transaction.amount}
                        />
                    ))}
                </div>
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        {t('previous')}
                    </button>
                    <div className="pagination-info">
                        <span className="current-page">{currentPage}</span> / <span className="total-pages">{totalPages}</span>
                    </div>
                    <button
                        className="pagination-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        {t('next')}
                    </button>
                </div>
            </div>
        </div>
    );
}

const Transactions: React.FC = () => {
    const content = {
        currentView: <TransactionsView />,
        activeId: 2
    };
    return <Window currentView={content.currentView} activeId={content.activeId} />;
}

export default Transactions;

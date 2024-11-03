import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../shared/assets/stores/store';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AiOutlineFilePdf, AiOutlineFileExcel } from 'react-icons/ai';
import '../assets/css/WalletSummary.css';
import CurrencyDisplay from './CurrencyDisplay';
import { env } from '../../shared/assets/environment/envSelector';
import ReactPaginate from 'react-paginate'; 


interface Wallet {
    id: number;
    name: string;
    currency: string;
    balance: string;
    user: string;
    created_on: string;
    modified_on: string;
}

// Interface for the data object that holds the array of wallets
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

interface Transaction {
    id: number;
    amount: string;
    transaction_type: string;
    status: string;
    date: string;
    note: string;
    gateway: string;
}

const WalletSummaryPanel: React.FC = () => {
    const wallets: WalletsState = useSelector((state: RootState) => state.authWallet.wallets);
    const wallet: Wallet[] | null = wallets?.data?.data && wallets?.data?.data?.length > 0 ? wallets?.data?.data : null;


    console.log("wallet on wallet sumarry: ", wallet);

    // Store transactions state
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const [currentPage, setCurrentPage] = useState<number>(0); 
    const transactionsPerPage = 10; 

    const userdata = useSelector((state: RootState) => state.authWallet);
    const { user } = userdata;
    const { access_token = '' } = user?.data || {};
    const { merchantTransactions } = env;

    useEffect(() => {
        const fetchTransactions = () => {
            const headers = {
                Authorization: `Bearer ${access_token}`,
            };
            if (merchantTransactions) {
                fetch(merchantTransactions, { headers })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.results) {
                            console.log('transactions data: ', data.results);
                            const sortedTransactions = data.results.sort(
                                (a: Transaction, b: Transaction) => new Date(b.date).getTime() - new Date(a.date).getTime()
                            );
                            setTransactions(sortedTransactions);
                        }
                    })
                    .catch((error) => console.error(error));
            }
        };
        fetchTransactions();
    }, [access_token, merchantTransactions]);

    // Prepare CSV Data
    const csvData = transactions.map((transaction) => ({
        Date: transaction.date,
        Type: transaction.transaction_type,
        Amount: transaction.amount,
        Status: transaction.status,
    }));

    // Prepare PDF Report
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Wallet Summary Report', 14, 22);

        // Table Headers
        const tableColumn = ['Date', 'Transaction Type', 'Amount', 'Status'];
        const tableRows: any[] = [];

        transactions.forEach((transaction) => {
            const transactionData = [
                transaction.date,
                transaction.transaction_type,
                transaction.amount,
                transaction.status,
            ];
            tableRows.push(transactionData);
        });

        // Add table to PDF
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
        });

        doc.save('WalletSummary.pdf');
    };

    // Filter transactions based on search input
    const filteredTransactions = transactions.filter((transaction) =>
        transaction.transaction_type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const pageCount = Math.ceil(filteredTransactions.length / transactionsPerPage);
    const offset = currentPage * transactionsPerPage;
    const currentTransactions = filteredTransactions.slice(
        offset,
        offset + transactionsPerPage
    );

    const handlePageClick = (data: { selected: number }) => {
        setCurrentPage(data.selected);
    };

    return (
        <div className="wallet-summary-container">
            <h2 className="text-center">Wallet Summary</h2>

            <div className="wallet-summary-card">
                <div className="wallet-balance">
                    <h3>Balance</h3>
                    {wallet &&
                        wallet.map((w, index) => (
                            <div key={index}>
                                <p className="balance-amount">
                                    <CurrencyDisplay
                                        currency={w.currency}
                                        amount={Number(w.balance).toFixed(2)}
                                    />
                                </p>
                                <p className="last-updated">
                                    Last updated: {new Date(w.modified_on).toLocaleDateString('en-GB', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        ))}
                </div>
            </div>

            <div className="transaction-table-container">
                <div className="d-flex justify-content-between align-items-center">
                    <h4>Recent Transactions</h4>
                    <input
                        type="text"
                        placeholder="Search Transactions"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control search-input"
                    />
                    {/* Download Buttons */}
                    <div className="download-buttons ms-3">
                        <CSVLink data={csvData} filename="WalletSummary.csv" className="csv-button me-2">
                            <AiOutlineFileExcel size={20} /> Download CSV
                        </CSVLink>
                        <button className="pdf-button" onClick={generatePDF}>
                            <AiOutlineFilePdf size={20} /> Download PDF
                        </button>
                    </div>
                </div>

                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Transaction Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Gateway</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTransactions.length > 0 ? (
                            currentTransactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{new Date(transaction.date).toLocaleDateString('en-GB')}</td>
                                    <td>{transaction.transaction_type}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.status}</td>
                                    <td>{transaction.gateway}</td>
                                    <td>{transaction.note}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    No transactions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Component */}
                {pageCount > 0 && (
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                    />
                )}
            </div>
        </div>
    );
};

export default WalletSummaryPanel;

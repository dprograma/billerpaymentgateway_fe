import React, { useState, useEffect } from 'react';
import BuildTransactionLog from '../builders/BuildTransactionLog';
import ReactPaginate from 'react-paginate';
import './styles/TransactionLogList.css';

interface TransLogProps {
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
    avatar: string;
    profile_picture: string;
    business_name: string;
    compliant: boolean;
  };
}

interface TransactionLogListProps {
  transactions?: TransLogProps[];
}

const TransactionLogList = ({ transactions = [] }: TransactionLogListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState<TransLogProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const transactionsPerPage = 5;

  // Filter transactions by search term
  useEffect(() => {
    const filtered = transactions
      .filter((transaction) =>
        transaction.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (transaction.user && transaction.user.business_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setFilteredTransactions(filtered);
  }, [searchTerm, transactions]);

  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  // Handle pagination page change
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // Calculate transactions to display on current page
  const pageCount = Math.ceil(filteredTransactions.length / transactionsPerPage)
  const offset = currentPage * transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(offset, offset + transactionsPerPage);

  return (
    <div className="transaction-log-list">
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={handleSearch}
        className="transaction-search-input"
      />

      <div className='trans_trans_hd'>
        <p className='trans_trans_hd_txt'>Trans Ref</p>
        <p className='trans_trans_hd_txt'>User</p>
        <p className='trans_trans_hd_txt'>Paymt Type</p>
        <p className='trans_trans_hd_txt'>Trans. Type</p>
        <p className='trans_trans_hd_txt'>Amount</p>
        <p className='trans_trans_hd_txt'>Desc</p>
        <p className='trans_trans_hd_txt'>Date</p>
        <p className='trans_trans_hd_txt'>Status</p>
        <p className='trans_trans_hd_txt'></p>
      </div>

      <div className="transaction-list">
        {currentTransactions.map((transaction) => (
          <BuildTransactionLog key={transaction.id} {...transaction} />
        ))}
      </div>

      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
        />)
      }
    </div>
  );
};

export default TransactionLogList;

import React from 'react'
import './styles/buildTransactionLog.css'


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
    avatar: string,
    profile_picture: string;
    business_name: string;
    compliant: boolean;
  };
}

const BuildTransactionLog = (transaction: TransLogProps) => {
  return (
    Number(transaction.amount) === 0.00  ? null : (<div className={transaction.id % 2 === 0 ? 'trans_sec gray' : 'trans_sec '}>
      <p className='trans_txt'>{transaction.reference.length > 8 ? transaction.reference.slice(0, 8) + '...' : transaction.reference}</p>
      <p className='trans_txt'>{transaction.user 
            ? transaction.user.business_name || `${transaction.user.first_name} ${transaction.user.last_name}` 
            : 'No User Info'
          }</p>
      <p className='trans_txt'>{transaction.payment_type}</p>
      <p className='trans_txt'>{transaction.transaction_type}</p>
      <p className='trans_txt'>{transaction.amount}</p>
      <p className='trans_txt'>{transaction.note}</p>
      <p className='trans_txt'>{new Date(transaction.date).toLocaleString()}</p>
      <p className={transaction.status ? 'trans_txt successful' : 'trans_txt failed'}>
        {transaction.status}
      </p>
      <div>
        <p className='table_title'>Details</p>
      </div>
    </div>)
  );
};


export default BuildTransactionLog
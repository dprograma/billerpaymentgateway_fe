import { useState } from 'react';
import './styles/buildTransaction.css';
import { useNavigate } from 'react-router-dom';

type BuildTransactionProps = {
  refNo?: string;
  customerName: { first_name: string } | string;
  date: string;
  item: string;
  successStatus: string;
  paymentMethod: string;
  paymentAmount: string;
};

const BuildTransaction = (props: BuildTransactionProps) => {
  const navigate = useNavigate();

  const customerFirstName = 
    props.customerName 
      ? (typeof props.customerName === 'string' 
          ? props.customerName 
          : props.customerName.first_name) 
      : 'Unknown Customer'; 

  return (
    <>
      <table className="transaction_table">
        <thead>
          <tr>
            {props.refNo && <th>Reference No.</th>}
            <th>Customer Name</th>
            <th>Date</th>
            <th>Item</th>
            <th>Status</th>
            <th>Payment Method</th>
            <th>Payment Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {props.refNo && <td>{props.refNo}</td>}
            <td>{customerFirstName}</td>
            <td>{props.date}</td>
            <td>{props.item}</td>
            <td>
              <span className={props.successStatus ? "status_successful" : "status_failed"}>
                {props.successStatus ? "Successful" : "Failed"}
              </span>
            </td>
            <td>{props.paymentMethod}</td>
            <td>{props.paymentAmount}</td>
          </tr>
        </tbody>
      </table>
      <hr className="translog_hr"/>
    </>
  );
};

export default BuildTransaction;

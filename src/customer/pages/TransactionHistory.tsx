import React from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import TransactionHistoryPanel from "../components/TransactionHistoryPanel"
import '../assets/css/Dashboard.css';


const TransactionHistory: React.FC = () => {

  return (
    <div className="fundwallet">
      <Header />
      <div className="container-fluid">
        <div className="fundwallet-content d-flex pt-1 p-md-1 customer-background">
          <Menu />
          <main className="main-content">
            <div className="card mb-4">
            </div>
            <TransactionHistoryPanel />
          </main>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;

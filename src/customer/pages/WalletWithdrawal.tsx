import React from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import WalletWithdrawalPanel from "../components/WalletWithdrawalPanel";
import '../assets/css/Dashboard.css';

const WalletWithdrawal: React.FC = () => {
  return (
    <div className="dashboard">
      <Header />
      <div className="container-fluid customer-background">
        <div className="dashboard-content d-flex pt-1 p-md-1">
          <Menu />
          <main className="main-content">
          <WalletWithdrawalPanel />
          </main>
        </div>
      </div>
    </div>
  );
};

export default WalletWithdrawal;

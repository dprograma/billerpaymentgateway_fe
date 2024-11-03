import React from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import '../assets/css/Dashboard.css';
import WalletSummaryPanel from "../components/WalletSummaryPanel";

const WalletSummary: React.FC = () => {
  return (
    <div className="dashboard">
      <Header />
      <div className="container-fluid customer-background">
        <div className="dashboard-content d-flex pt-1 p-md-1">
          <Menu />
          <main className="main-content">
          <WalletSummaryPanel />
          </main>
        </div>
      </div>
    </div>
  );
};

export default WalletSummary;
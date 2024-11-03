import React from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import FundWalletPanel from "../components/FundWalletPanel"
import '../assets/css/Dashboard.css';


const FundWallet: React.FC = () => {

  return (
    <div className="fundwallet">
      <Header />
      <div className="container-fluid">
        <div className="fundwallet-content d-flex pt-1 p-md-1 customer-background">
          <Menu />
          <main className="main-content">
            <div className="card mb-4">
            </div>
            <FundWalletPanel />
          </main>
        </div>
      </div>
    </div>
  );
};

export default FundWallet;

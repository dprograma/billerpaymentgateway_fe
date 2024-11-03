import React from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import BillersPagePanel from '../components/BillersPagePanel';
import '../assets/css/Dashboard.css';


const BillersPage: React.FC = () => {

  return (
    <div className="fundwallet">
      <Header />
      <div className="container-fluid bg-default-bg">
        <div className="fundwallet-content d-flex pt-1 p-md-1 customer-background">
          <Menu />
          <main className="main-content">
            <div className="card mb-4">
            </div>
            <BillersPagePanel />
          </main>
        </div>
      </div>
    </div>
  );
};

export default BillersPage;

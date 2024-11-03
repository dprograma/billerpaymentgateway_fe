import React from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import SetPinPanel from "../components/SetPinPanel";
import '../assets/css/Dashboard.css';

const Setpin: React.FC = () => {
  return (
    <div className="dashboard">
      <Header />
      <div className="container-fluid bg-default-bg">
        <div className="dashboard-content d-flex pt-1 p-md-1 customer-background">
          <Menu />
          <main className="main-content">
          <SetPinPanel />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Setpin;

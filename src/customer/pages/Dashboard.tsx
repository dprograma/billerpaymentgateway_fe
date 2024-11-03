import React from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Main from "../components/Main";
import '../assets/css/Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Header />
      <div className="container-fluid customer-background">
        <div className="dashboard-content d-flex pt-1 p-md-1">
          <Menu />
          <main className="main-content">
          <Main />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

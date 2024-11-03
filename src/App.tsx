// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MerchantApp from './merchant/App';
import AdminApp from './admin/App';
import CustomerApp from './customer/App';
import Landing from './Landing';
import TermsOfUse from './TermsOfUse';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/terms-and-conditions" element={<TermsOfUse />} />
        <Route path="/customer/*" element={<CustomerApp />} />
        <Route path="/merchant/*" element={<MerchantApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </Router>
  );
};

export default App;

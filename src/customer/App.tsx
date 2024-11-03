import {Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import VerifyOtp from './pages/VerifyOtp';
import NoticeBanner from '../merchant/components/noticebanner';
import FundWallet from './pages/FundWallet';
import SendMoney from './pages/SendMoney';
import TransactionHistory from './pages/TransactionHistory';
import SetPin from './pages/SetPin';
import ReturnUrl from './pages/ReturnUrl';
import BillersPage from './pages/BillersPage';
import WalletConverter from './pages/WalletConverter';
import Donations from './pages/Donations';
import WalletSummary from './pages/WalletSummary';
import AddWallet from './pages/AddWallet';
import WalletWithdrawal from './pages/WalletWithdrawal';
import ProtectedRoute from './utils/protectedRoute'


function App() {
  return (
    <div className="App">
      {/* <NoticeBanner/> */}
      <Routes>
        <Route path="/" element={<Landing />} />   
        <Route path="/login" element={<Login />} />   
        <Route path="/signup" element={<Signup />} />   
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/fund-wallet" element={<ProtectedRoute><FundWallet /></ProtectedRoute>} />
        <Route path="/send-money" element={<ProtectedRoute><SendMoney /></ProtectedRoute>} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route path="/return_url" element={<ProtectedRoute><ReturnUrl /></ProtectedRoute>} />
        <Route path="/set-pin" element={<ProtectedRoute><SetPin /></ProtectedRoute>} />
        <Route path="/billers" element={<ProtectedRoute><BillersPage /></ProtectedRoute>} />
        <Route path="/wallet-converter" element={<ProtectedRoute><WalletConverter /></ProtectedRoute>} />
        <Route path="/donations" element={<ProtectedRoute><Donations /></ProtectedRoute>} />
        <Route path="/wallet-summary" element={<ProtectedRoute><WalletSummary /></ProtectedRoute>} />
        <Route path="/add-wallet" element={<ProtectedRoute><AddWallet /></ProtectedRoute>} />
        <Route path="/wallet-withdrawal" element={<ProtectedRoute><WalletWithdrawal /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;



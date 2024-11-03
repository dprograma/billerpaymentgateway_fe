import { Routes, Route } from 'react-router-dom'
import MerchantLogin from "./Login"
import MerchantSignup from "./Signup"
import VerifyPhoneEmail from './VerifyPhoneEmail';
import Landing from './Landing';
import Transactions from './components/Transactions';
import Dashboard from './components/Dashboard';
import Subscriptions from './components/Subscriptions';
import SubscriptionDetails from './components/SubscriptionDetails';
import Subscribers from './components/Subscribers';
import Disputes from './components/Disputes';
import Customers from './components/Customers';
import Payouts from './components/Payouts';
import PaymentRequest from './components/PaymentRequest';
import PaymentSplit from './components/PaymentSplit';
import PaymentSplit2 from './components/PaymentSplit2';
import PaymentRequestDetails from './components/PaymentRequestDetails';
import MyShop from './components/MyShop';
import CreateProduct from './CreateProduct';
import Customers2 from './components/Customers2';
import Profile from './components/Profile';
import BusinessVerification from './BusinessVerification';
import BusinessVerification2 from './components/BusinessVerification2';
import PhysicalVerification from './PhysicalVerification';
import UnvarifiedWelcomeOverlay from './builders/UnvarifiedWelcomeOverlay';
import AccessControl from './components/AccessControl';
import AuditLog from './components/AuditLog';
import Products from './components/Products';
import ApiAndWebHook from './components/ApiWebHook';
import NoticeBanner from './components/noticebanner';
import VerifyOtp from './verifyotp';
import ProtectedRoute from './utils/protectedRoute';
import SetWalletPin from './components/SetWalletPin';


function App() {
  return (
    <div className="App">
      {/* <NoticeBanner/> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<MerchantLogin />} />
        <Route path="/signup" element={<MerchantSignup />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/verifyphoneandemail" element={<VerifyPhoneEmail />} />
        <Route path="/landing-page" element={<Landing />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/subscriptions" element={<ProtectedRoute><Subscriptions /></ProtectedRoute>} />
        <Route path="/subscriptions/subscription-details" element={<ProtectedRoute><SubscriptionDetails /></ProtectedRoute>} />
        <Route path="/subscribers" element={<ProtectedRoute><Subscribers /></ProtectedRoute>} />
        <Route path="/disputes" element={<ProtectedRoute><Disputes /></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
        <Route path="/customers/customers2" element={<ProtectedRoute><Customers2 /></ProtectedRoute>} />
        <Route path="/payouts" element={<ProtectedRoute><Payouts /></ProtectedRoute>} />
        <Route path="/payment-request" element={<ProtectedRoute><PaymentRequest /></ProtectedRoute>} />
        <Route path="/payment-split" element={<ProtectedRoute><PaymentSplit /></ProtectedRoute>} />
        <Route path="/payment-split-details" element={<ProtectedRoute><PaymentSplit2 /></ProtectedRoute>} />
        <Route path="/payment-request/payment-request-details" element={<ProtectedRoute><PaymentRequestDetails /></ProtectedRoute>} />
        <Route path="/my-shop" element={<ProtectedRoute><MyShop /></ProtectedRoute>} />
        <Route path="/create-product" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
        <Route path="/business-verification" element={<ProtectedRoute><BusinessVerification /></ProtectedRoute>} />
        <Route path="/business-verification2" element={<ProtectedRoute><BusinessVerification2 /></ProtectedRoute>} />
        <Route path="/physical-verification" element={<ProtectedRoute><PhysicalVerification /></ProtectedRoute>} />
        <Route path="/product" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/business-verification2" element={<ProtectedRoute><BusinessVerification2 /></ProtectedRoute>} />
        <Route path="/security/access-control/audit-log-details" element={<ProtectedRoute><AuditLog /></ProtectedRoute>} />
        <Route path="/security/access-control" element={<ProtectedRoute><AccessControl /></ProtectedRoute>} />
        <Route path="/api-and-web-hook" element={<ProtectedRoute><ApiAndWebHook /></ProtectedRoute>} />
        <Route path="/set-wallet-pin" element={<ProtectedRoute><SetWalletPin /></ProtectedRoute>} />
      </Routes>
      <>
      </>
    </div>
  );
}

export default App;



import {Routes, Route} from 'react-router-dom'
import AdminLogin from './components/Login';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Merchants from './components/Merchants';
import ForgotPassword from './components/ForgotPassword';
import ProtectedRoute from './utils/protectedRoute';
import NoticeBanner from '../merchant/components/noticebanner';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AdminLogin />} />   
        <Route path="/forgot_password" element={<ForgotPassword />} />   
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
        <Route path="/merchants" element={<ProtectedRoute><Merchants /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;



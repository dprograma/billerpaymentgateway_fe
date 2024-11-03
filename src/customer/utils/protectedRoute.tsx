import React, { ReactNode } from 'react'
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { AuthWalletState } from '../../shared/assets/slices/authWalletSlice';

// props type for ProtectedRoute
interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: { authWallet: AuthWalletState }) => state.authWallet.isAuthenticated);
    let location = useLocation();
    if (!isAuthenticated) {
        if (location.pathname === "/customer/dashboard") {
            return <Navigate to="/customer" state={{ from: location }} replace />
        } else {
            return <Navigate to="/customer/signin" state={{ from: location }} replace />
        }
    }
    // Return children if authenticated
    return <>{children}</>;
};

export default ProtectedRoute;

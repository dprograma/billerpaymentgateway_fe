import React, { ReactNode } from 'react'
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { authState } from '../../shared/assets/slices/authSlice';

// props type for ProtectedRoute
interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: { auth: authState }) => state.auth.isAuthenticated);
    let location = useLocation();
    if (!isAuthenticated) {
        if (location.pathname === "/merchant/dashboard") {
            return <Navigate to="/merchant" state={{ from: location }} replace />
        } else {
            return <Navigate to="/merchant/signin" state={{ from: location }} replace />
        }
    }
    // Return children if authenticated
    return <>{children}</>;
};

export default ProtectedRoute;

import React, { ReactNode } from 'react'
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { adminState } from '../../shared/assets/slices/adminSlice';

// props type for ProtectedRoute
interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: { admin: adminState }) => state.admin.isAuthenticated);
    console.log("isAuthenticated: ", isAuthenticated)
    let location = useLocation();
    if (!isAuthenticated) {
        if (location.pathname === "/admin/dashboard") {
            return <Navigate to="/admin" state={{ from: location }} replace />
        } else {
            return <Navigate to="/admin/" state={{ from: location }} replace />
        }
    }
    // Return children if authenticated
    return <>{children}</>;
};

export default ProtectedRoute;

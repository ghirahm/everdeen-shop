import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const token = localStorage.getItem('access_token'); // Replace 'access_token' with your actual key
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

export default PrivateRoute;


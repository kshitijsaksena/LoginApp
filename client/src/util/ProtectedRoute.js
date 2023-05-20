import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { decodeToken, isExpired } from 'react-jwt';

function ProtectedRoute(){

    let token = localStorage.getItem('user-token');
    let decodedToken = decodeToken(token);
    let isTokenExpired = isExpired(token);
    
    return (
        decodedToken && !isTokenExpired ? <Outlet/> : <Navigate to="/login"/>
    );

}

export default ProtectedRoute;
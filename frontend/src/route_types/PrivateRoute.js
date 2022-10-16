import React from 'react'
import { Navigate }  from 'react-router-dom'
import { useAuth } from '../components/auth/auth'

// If the user's auth and refresh tokens are missing, 
// redirect them to the home page
const PrivateRoute = ({ children }) => {
    const { authToken, refreshToken } = useAuth();
    return authToken && refreshToken ? children : <Navigate to='/'/>;
}

export default PrivateRoute;
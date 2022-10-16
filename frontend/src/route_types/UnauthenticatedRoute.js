import React from 'react'
import { Navigate }  from 'react-router-dom'
import { useAuth } from '../components/auth/auth'

// If the user's auth or refresh tokens are 
// populated redirect them to the dashboard
const UnauthenticatedRoute = ({ children }) => {
    const { authToken, refreshToken } = useAuth();
    return authToken || refreshToken ? <Navigate to='/dashboard'/> : children;
}

export default UnauthenticatedRoute;
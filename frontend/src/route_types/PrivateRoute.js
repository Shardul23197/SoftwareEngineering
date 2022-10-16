import React, { useState, useEffect } from 'react'
import { Navigate, useSearchParams }  from 'react-router-dom'
import { useAuth } from '../components/auth/auth'

// If the user's auth and refresh tokens are missing, 
// redirect them to the home page
const PrivateRoute = ({ children }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const existingAuthtoken = localStorage.getItem('authToken') || '';
    const existingRefreshtoken = localStorage.getItem('refreshToken') || '';
    const [authToken, setAuthtoken] = useState(existingAuthtoken);
    const [refreshToken, setRefreshtoken] = useState(existingRefreshtoken);
    const { setAuthToken, setRefreshToken } = useAuth();

    

    const setauthToken = (data) => {
        if (!data) {
            localStorage.removeItem('authToken');
            setAuthtoken();
        } else {
            localStorage.setItem('authToken', data);
            setAuthtoken(data);
        }
    };

    const setrefreshToken = (data) => {
        if (!data) {
            localStorage.removeItem('refreshToken');
            setRefreshtoken();
        } else {
            localStorage.setItem('refreshToken', data);
            setRefreshtoken(data);
        }
    };

    useEffect(() => {
        console.log(`authToken: ${searchParams.get('authToken')}`);
        console.log(`refreshToken: ${searchParams.get('refreshToken')}`);
        // Get the auth and refresh tokens from the search params if there are any
        if (!existingAuthtoken) {
            setauthToken(searchParams.get('authToken'));
            setAuthToken(searchParams.get('authToken'));
        }
        if (!existingRefreshtoken) {
            setrefreshToken(searchParams.get('refreshToken'));
            setRefreshToken(searchParams.get('refreshToken'));
        }

    }, [authToken, existingAuthtoken, existingRefreshtoken, 
        refreshToken, searchParams, setAuthToken, setRefreshToken]);


    return authToken && refreshToken ? children : <Navigate to='/'/>;
}

export default PrivateRoute;
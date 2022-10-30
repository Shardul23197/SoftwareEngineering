import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router';

// If the user's auth and refresh tokens are missing redirect them to the home page
function UnverifiedRoute({ children }) {
    const existingAuthtoken = localStorage.getItem('authToken') || '';
    const existingRefreshtoken = localStorage.getItem('refreshToken') || '';
    const existingMfaRequired = localStorage.getItem('mfaRequired') || 'false';
    const existingMfaVerified = localStorage.getItem('mfaVerified') || 'false';
    const [authToken, setAuthToken] = useState(existingAuthtoken);
    const [refreshToken, setRefreshToken] = useState(existingRefreshtoken);
    const [mfaVerified, setMfaVerified] = useState(existingMfaVerified);
    const [mfaRequired, setMfaRequired] = useState(existingMfaRequired);

    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        const instance = axios.create({
            baseURL: 'http://localhost:5000',
            withCredentials: true,
            headers: headers
        });

        instance.get('/auth/sessionInfo', {}).then((res) => {
            const authTokenValid = res.data.authTokenValid;
            const mfaRequired = res.data.mfaRequired;
            const mfaVerified = res.data.mfaVerified;

            // If the auth token is not valid set 
            if (!authTokenValid) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('mfaRequired');
                localStorage.removeItem('mfaVerified');
                setAuthToken('');
                setRefreshToken('');
                setMfaRequired('false');
                setMfaVerified('false');
            }
            else {
                localStorage.setItem('mfaRequired', mfaRequired+'');
                localStorage.setItem('mfaVerified', mfaVerified+'');
                setMfaRequired(mfaRequired+'');
                setMfaVerified(mfaVerified+'');
            }
        })
        .catch((err) => {
            if (err) console.error(err);
        });
    }, [authToken]);

    // If the user has both auth and refresh tokens and if the user is required to use
    // mfa and but has not been verified proceed to the requested route
    // Otherwise redirect to home
    return authToken.length > 0 && refreshToken.length > 0 && mfaRequired === 'true' && mfaVerified === 'false' ? children : <Navigate to='/'/>;
}

export default UnverifiedRoute;
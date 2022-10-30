import React, { useState, useEffect } from 'react'
import { Navigate }  from 'react-router-dom'
import axios from 'axios'
import util from 'util'

// If the user's auth and refresh tokens are missing, 
// redirect them to the home page
function PrivateRoute({ children }) {
    const existingAuthtoken = localStorage.getItem('authToken') || '';
    const existingRefreshtoken = localStorage.getItem('refreshToken') || '';
    const existingMfaVerified = localStorage.getItem('mfaVerified') || 'false';
    console.log(`existingMfaVerified: ${existingMfaVerified}`);
    const existingMfaRequired = localStorage.getItem('mfaRequired') || 'false';
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
                localStorage.removeItem('mfaVerified');
                localStorage.removeItem('mfaRequired');
                setAuthToken('');
                setRefreshToken('');
                setMfaRequired('');
                setMfaVerified('');
            }
            else {
                localStorage.setItem('mfaRequired', mfaRequired+'');
                localStorage.setItem('mfaVerified', mfaVerified+'');
                setMfaVerified(mfaVerified+'');
                setMfaRequired(mfaRequired+'');
            }
        })
        .catch((err) => {
            if (err) console.error(err);
        });

    }, [authToken]);


    // If the user has both auth and refresh tokens and if the user is required to use
    // mfa and has been verified proceed to the requested route
    // Otherwise redirect to twoFactor (if the user has an invalid auth token they are 
    // sent home from UnverifiedRoute)
    console.log(authToken.length > 0);
    console.log(refreshToken.length > 0);
    console.log(mfaRequired === 'true');
    console.log(mfaVerified === 'true');
    return authToken.length > 0 && refreshToken.length > 0 && (mfaRequired === 'true' ? mfaVerified === 'true' : true) ? children : <Navigate to='/twoFactor'/>;
}

export default PrivateRoute;
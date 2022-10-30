import React, { useState } from 'react'
import { Navigate }  from 'react-router-dom'


// If the user's auth or refresh tokens are 
// populated redirect them to the dashboard
const UnauthenticatedRoute = ({ children }) => {
    const existingAuthtoken = localStorage.getItem('authToken') || '';
    const existingRefreshtoken = localStorage.getItem('refreshToken') || '';
    const [authToken] = useState(existingAuthtoken);
    const [refreshToken] = useState(existingRefreshtoken);

    // If the user does noth have either auth and refresh tokens proceed to 
    // the requested route. Otherwise redirect to their dashboard
    return authToken.length || refreshToken.length ? <Navigate to='/dashboard'/> : children;
}

export default UnauthenticatedRoute;
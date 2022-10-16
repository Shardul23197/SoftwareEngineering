import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import { AuthContext } from './components/auth/auth';
import PrivateRoute from './route_types/PrivateRoute';
import UnauthenticatedRoute from './route_types/UnauthenticatedRoute';

function App() {
    const existingAuthToken = localStorage.getItem('authToken') || '';
    const [authToken, setAuthToken] = useState(existingAuthToken);
    const [refreshToken, setRefreshToken] = useState(existingAuthToken);

    const setAuthtoken = (data) => {
        if (!data) {
            localStorage.removeItem('authToken');
            setAuthToken();
        } else {
            localStorage.setItem('authToken', data);
            setAuthToken(data);
        }
    };

    const setRefreshtoken = (data) => {
        if (!data) {
            localStorage.removeItem('refreshToken');
            setRefreshToken();
        } else {
            localStorage.setItem('refreshToken', data);
            setRefreshToken(data);
        }
    };

    return (
        <AuthContext.Provider value = {{ authToken, setAuthToken: setAuthtoken, refreshToken, setRefreshToken: setRefreshtoken }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={
                        <UnauthenticatedRoute>
                            <Home />
                        </UnauthenticatedRoute>    
                    }/>
                    <Route path='/login' element={
                        <UnauthenticatedRoute>
                            <Login />
                        </UnauthenticatedRoute>    
                    }/>
                    <Route path='/register' element={
                        <UnauthenticatedRoute>
                            <Register />
                        </UnauthenticatedRoute>    
                    }/>
                    <Route path='/dashboard' element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>    
                    }/>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
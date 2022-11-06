import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css';
import React, { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register/Register';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import TwoFactor from './components/TwoFactor/TwoFactor';
import WorkoutDetails from './components/WorkoutDetails';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import PrivateRoute from './route_types/PrivateRoute';
import UnauthenticatedRoute from './route_types/UnauthenticatedRoute';
import UnverifiedRoute from './route_types/UnverifiedRoute';
import store from './state/store';
import { AuthContext } from './components/auth/auth';
import { Provider } from 'react-redux';

function App() {
    // Auth token and refresh token state
    const existingAuthtoken = localStorage.getItem('authToken') || '';
    const existingRefreshtoken = localStorage.getItem('refreshToken') || '';
    const [authToken, setAuthtoken] = useState(existingAuthtoken);
    const [refreshToken, setRefreshtoken] = useState(existingRefreshtoken);

    return (
        <Provider store={store}>
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
            <Route path='/twoFactor' element={
                <UnverifiedRoute>
                    <TwoFactor />
                </UnverifiedRoute>    
            }/>
            <Route path='/register' element={
                <UnauthenticatedRoute>
                    <Register />
                </UnauthenticatedRoute>    
            }/>
            <Route path='/forgotPassword' element={
                <UnauthenticatedRoute>
                    <ForgotPassword />
                </UnauthenticatedRoute>    
            }/>
            <Route path='/resetPassword' element={
                <UnauthenticatedRoute>
                    <ResetPassword />
                </UnauthenticatedRoute>    
            }/>
            <Route path='/dashboard' element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>    
            }/>
            <Route path='/homepage' element={
                <PrivateRoute>
                    <Navigate to="/dashboard" />
                </PrivateRoute>    
            }/>
            <Route path='/dashboard/:id' element={
                <PrivateRoute>
                    <WorkoutDetails />
                </PrivateRoute>    
            }/>
            <Route path='/profile' element={
                <PrivateRoute>
                    <Profile />
                </PrivateRoute>    
            }/>
            <Route path='/settings' element={
                <PrivateRoute>
                    <Settings />
                </PrivateRoute>    
            }/>
        </Routes>
        </BrowserRouter>
        </AuthContext.Provider>
        </Provider>
    );
};

export default App;
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import axios from 'axios';
import './App.css';
import React, { Component } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import { AuthProvider } from './hooks/AuthProvider'

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/register' element={<Register/>}/>
            <Route path='/dashboard' element={  <ProtectedRoute>
                                                    <Dashboard/>
                                                </ProtectedRoute>}/>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={  <AuthProvider>
                                                <Login/>
                                            </AuthProvider>}/>
        </Routes>
        </BrowserRouter>
    );
    // const token = localStorage.getItem('token');
    // if (token) {
    //   setAuthToken(token)
    // }


    // if (auth === null) {
    //   return (
    //     <BrowserRouter>
    //     <Routes>
    //       <Route path='/register' element={<Register/>}/>
    //       {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
    //       <Route path='/' element={<Home />}/>
    //       <Route path='/login' element={<Login/>}/>
    //       <Route from='/*' element={<Home />}/>
    //     </Routes>
    //     </BrowserRouter>
    //   );
    // }
    // if (auth) {
    //   return (
    //     <BrowserRouter>
    //     <Routes>
    //       {/* <Route path='/register' element={<Register/>}/> */}
    //       <Route path='/dashboard' element={<Dashboard/>}/>
    //       {/* <Route path='/' element={<Home />}/>
    //       <Route path='/login' element={<Login/>}/> */}
    //       <Route from='/*' element={<Dashboard />}/>
    //     </Routes>
    //     </BrowserRouter>
    //   );
    // }

        // {/* <BrowserRouter>
        // <Routes>
        //   <Route path='/register' element={<Register/>}/>
        //   <Route path='/dashboard' element={<Dashboard/>}/>
        //   <Route path='/' element={<Home />}/>
        //   <Route path='/login' element={<Login/>}/>
        // </Routes>
        // </BrowserRouter> */}
}

export default App;
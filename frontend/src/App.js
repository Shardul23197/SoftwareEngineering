import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import axios from 'axios';
import './App.css';
import React, { Component } from 'react';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import { useState, useEffect } from 'react';

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get('/auth/current-session').then(({data}) => {
      setAuth(data);
    })
  }, [])
  
  if (auth === null) {
    return (
      <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login/>}/>
        <Route from='/*' element={<Home />}/>
      </Routes>
      </BrowserRouter>
    );
  }
  if (auth) {
    return (
      <BrowserRouter>
      <Routes>
        {/* <Route path='/register' element={<Register/>}/> */}
        <Route path='/dashboard' element={<Dashboard/>}/>
        {/* <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login/>}/> */}
        <Route from='/*' element={<Dashboard />}/>
      </Routes>
      </BrowserRouter>
    );
  }

  
  // return <Login />;

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
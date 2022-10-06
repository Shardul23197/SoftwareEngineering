import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import React, { Component } from 'react';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from index.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
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

  
}

export default App;
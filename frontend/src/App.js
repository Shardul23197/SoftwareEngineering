import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {BrowserRouter, Route, Routes, Redirect} from 'react-router-dom'
import './App.css';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';

function App() {
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

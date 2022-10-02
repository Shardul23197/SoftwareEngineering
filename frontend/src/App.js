import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Home from './components/Home';

function App() {
  return (
    // <BrowserRouter>
    // <Routes>
    //   <Route path='/register' element={<Register/>}/>
    //   <Route path='/dashboard' element={<Dashboard/>}/>
    // </Routes>
    // </BrowserRouter>
    <Home></Home>
    // <Dashboard></Dashboard>
  );
}

export default App;

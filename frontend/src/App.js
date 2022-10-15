import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import './App.css';
import Dashboard from '../src/components/Dashboard/Dashboard';
import Register from '../src/components/Register/Register';
import Home from '../src/components/Home/Home';
import Login from '../src/components/Login/Login';
import WorkoutDetails from './components/WorkoutDetails';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/' element={<Home />}/>
      <Route path='/homepage' element={()=><Navigate to="/dashboard"/>}/>
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/dashboard/search' element={<Dashboard />}/>
      <Route path='/dashboard/:id' element={<WorkoutDetails />}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

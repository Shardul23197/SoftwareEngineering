import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <Register/>
    </BrowserRouter>
  );
}

export default App;

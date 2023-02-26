import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import Routing from './routes/Routing';

function App() {
  return (
    <BrowserRouter>
      <Routing />
      <Toaster />
    </BrowserRouter>
  );
}

export default App

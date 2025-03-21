import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Signup from './pages/Signup.jsx';
import LogIn from './pages/Login.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<App />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Login" element={<LogIn />} />
    </Routes>
  </BrowserRouter>

)

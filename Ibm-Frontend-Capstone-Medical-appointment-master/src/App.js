import './App.css';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation'
import Notification from './Components/Notification/Notification'

function App() {
  return (
    <>
              <BrowserRouter>
          <Notification>
              <Routes>
              <Route path="/" element={<Landing_Page/>}/>
              <Route path="/Login" element={<Login/>}/>
              <Route path="/Sign_Up" element={<Sign_Up/>}/>
              <Route path="/instant-consultation" element={<InstantConsultation />} />
              </Routes>
            </Notification>
        </BrowserRouter>
          </>
  );
}

export default App;

import "./App.css";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import CreateAccount from "./Pages/CreateAccount";
import CreateHangout from "./Pages/CreateHangout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './Components/Footer.jsx'
import User_Home from "./Pages/User_Home.jsx";
import HangoutSpace from "./Pages/HangoutSpace.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path ="/bubbles/:name" element={<HangoutSpace/>}/>
          <Route path="/create-hangout" element={<CreateHangout />} />
          {/* <Route path="/test" element={<User_Home/>} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
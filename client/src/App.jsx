import "./App.css";
import Landing from "./Pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './Components/Footer.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* zzAdd other routes here */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

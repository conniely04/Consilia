import "./App.css";
import Landing from "./Pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* Add other routes here */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Eligibility from "./pages/Eligibility";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eligibility" element={<Eligibility />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
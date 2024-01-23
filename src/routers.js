import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Repository from "./Pages/Repository";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Main />} />
        <Route path="/repository/:name" element={< Repository />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers

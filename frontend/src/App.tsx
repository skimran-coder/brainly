import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import SharedBrain from "./pages/SharedBrain";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/brain/:hash" element={<SharedBrain />}></Route>
          <Route path="*" element={<div>Path does not exist</div>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

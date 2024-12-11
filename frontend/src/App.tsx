import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="*" element={<div>Path does not exist</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

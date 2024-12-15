import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import SharedBrain from "./pages/SharedBrain";
import NotFound from "./pages/NotFound";
import { Provider } from "react-redux";
import store from "./config/redux/store";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route
              path="/auth"
              element={
                <ProtectedRoute>
                  <Auth />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/brain/:hash" element={<SharedBrain />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;

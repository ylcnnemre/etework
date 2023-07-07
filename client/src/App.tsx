import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom";
import Login from "./pages/Login/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import CompanyPage from "./pages/Companies/CompanyPage";

const App = () => {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/companies"  element={<CompanyPage/>}  />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

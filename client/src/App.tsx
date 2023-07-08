import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom";
import Login from "./pages/Login/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import CompanyPage from "./pages/Companies/CompanyPage";
import ProductsPage from "./pages/Products/ProductsPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/companies" element={<CompanyPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;

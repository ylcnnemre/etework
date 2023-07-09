import { useEffect } from "react";
import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom";
import Login from "./pages/Login/Login";

import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/Store";
import CompanyPage from "./pages/Companies/CompanyPage";
import ProductsPage from "./pages/Products/ProductsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { httpClient } from "./api/HttpClien";
import { login, logout } from "./redux/reducers/AuthSlice";
import NotFound from "./pages/NotFound";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/companies" element={<CompanyPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;

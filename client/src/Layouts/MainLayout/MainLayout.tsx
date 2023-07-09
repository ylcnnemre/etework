import React, { FC, ReactNode, useMemo } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./MainLayout.scss";
import Footer from "../../components/Footer/Footer";
import { useLocation } from "react-router-dom";
const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();

  const path = useMemo(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      return false;
    }
    return true;
  }, [location.pathname]);

  return (
    <div style={{ height: "max-content" }}>
      <Navbar />
      <div className="container">
        {children}

        {path && <Footer /> }
      </div>
    </div>
  );
};

export default MainLayout;

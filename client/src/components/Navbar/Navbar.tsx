import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import { IDataTypes } from "../../redux/Store";
import { Button } from "antd";
import { logout } from "../../redux/reducers/AuthSlice";
import { useEffect } from "react";

const Navbar = () => {
  const { auth } = useSelector((state: IDataTypes) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <section className="navbarContainer">
      <h1 className="logo">EteWork</h1>

      {auth ? (
        <div className="navbarLinkWrapper">
          <Link className="navbarLink" to={"/"}>
            HomePage
          </Link>
          <Link className="navbarLink" to={"/companies"}>
            Companies
          </Link>
          <Link className="navbarLink" to={"/products"}>
            Products
          </Link>
        </div>
      ) : null}

      {!auth ? (
        <div className="userLoginWrapper">
          <Link className="loginLink" to={"/login"}>
            Login
          </Link>
          <Link className="registerLink" to={"/register"}>
            Register
          </Link>
        </div>
      ) : null}
      {auth ? (
        <Button
          type="primary"
          danger
          onClick={() => {
            localStorage.removeItem("token")
            dispatch(logout());
            navigate("/login")
          }}
        >
          Logout
        </Button>
      ) : null}
    </section>
  );
};

export default Navbar;

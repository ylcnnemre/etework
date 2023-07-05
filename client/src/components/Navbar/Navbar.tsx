import styled from "styled-components";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import { IDataTypes } from "../../redux/Store";

const Navbar = () => {
  const { auth } = useSelector((state: IDataTypes) => state);

  return (
    <section className="navbarContainer">
      <h1 className="logo">EteWork</h1>

      {auth ? (
        <div className="navbarLinkWrapper">
          <Link className="navbarLink" to={"/dashboard"}>
            Anasayfa
          </Link>
          <Link className="navbarLink" to={"/companies"}>
            Şirketler
          </Link>
          <Link className="navbarLink" to={"/products"}>
            Ürünler
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
    </section>
  );
};

export default Navbar;

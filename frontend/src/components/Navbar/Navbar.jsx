import React, { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const [activeMenu, setActiveMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // Optionally, you can perform any necessary token validation here
      // For example, you could send a request to validate the token
    }
  }, []); // Run once on component mount

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            onClick={() => setActiveMenu("home")}
            className={activeMenu === "home" ? "active" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <a
            href="/#explore-menu"
            onClick={() => setActiveMenu("menu")}
            className={activeMenu === "menu" ? "active" : ""}
          >
            Menu
          </a>
        </li>
        <li>
          <a
            href="about"
            onClick={() => setActiveMenu("about")}
            className={activeMenu === "about" ? "active" : ""}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#footer"
            onClick={() => setActiveMenu("contact-us")}
            className={activeMenu === "contact-us" ? "active" : ""}
          >
            Contact Us
          </a>
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search icon" />
        <Link to="/cart">
          <img src={assets.basket_icon} alt="basket icon" />
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </Link>
      </div>

      {localStorage.getItem("token") ? (
        <div className="navbar-profile">
          <img src={assets.profile_icon} alt="profile icon" />
          <ul className="nav-profile-dropdown">
            <li onClick={() => navigate("/myorders")}>
              <img src={assets.bag_icon} alt="" />
              <p>Orders</p>
            </li>
            <hr />
            <li onClick={logout}>
              <img src={assets.logout_icon} alt="" />
              <p>Log Out</p>
            </li>
          </ul>
        </div>
      ) : (
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      )}
    </div>
  );
};

export default Navbar;

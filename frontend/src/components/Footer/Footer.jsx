import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" style={{ height: "66px" }} />
          <p>
            Explore diverse flavors, easy ordering, and culinary delights with
            our food app. Savor every bite and indulge in convenience. Download
            now for an unforgettable experience!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>{" "}
            <li>
              <Link to="/#explore-menu">Menu</Link>
            </li>{" "}
            <li>
              <Link to="/about">About</Link>
            </li>{" "}
            <li>
              <Link to="/privacy-policy">Privacy policy</Link>
            </li>{" "}
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-45465</li>
            <li>contact@algoprimeinfotech</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024@algo.com-All Right Reserved
      </p>
    </div>
  );
};

export default Footer;

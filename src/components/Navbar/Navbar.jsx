import React, { useContext } from "react";
import "./navbar.css";
import fb from "../../images/fblogo.png";

import { Link, useLocation, useNavigate } from "react-router-dom";
import fruitContext from "../../context/FruitContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useContext(fruitContext);
  console.log(cart);

  const logout = async () => {
    localStorage.removeItem("tokenid");
    localStorage.removeItem("userinfo");
    localStorage.removeItem("user");
    navigate("/login");

    try {
      const response = await fetch("http://localhost:8000/api/auth/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      const json = await response.json();
      navigate("/login");
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };
  const location = useLocation();
  return (
    <div className="navbarflexxrow">
      <div className="logoflexxrow">
        {/* <img src={fb} alt="" className="logoimg" /> */}
        {/* <i class="fa-solid fa-apple-whole logoiconfb"></i> */}
        <i class="fa-solid fa-lemon logoiconfb"></i>
        <h4 className="headlogo">Fruit Basket</h4>
      </div>
      <div className="linksflexxrow">
        {/* <Link to="/fruits"> */}
        <Link to="/fruits">
          <div className="linktypeflexxcol">
            <i class="fa-solid fa-house"></i>
            <span className="pagename">Home</span>
          </div>
        </Link>
        {localStorage.getItem("tokenid") && (
          <Link to="/orders">
            <div className="linktypeflexxcol">
              <i class="fa-solid fa-list-ol"></i>
              <span className="pagename">Orders</span>
            </div>
          </Link>
        )}
        <Link to="/cart">
          <div className="linktypeflexxcol">
            <i class="fa-solid fa-basket-shopping"></i>
            <span className="pagename">Basket ({cart.length}) </span>
          </div>
        </Link>
        {localStorage.getItem("tokenid") && (
          <Link to="/profile">
            <div className="linktypeflexxcol">
              <i class="fa-solid fa-circle-user"></i>
              <span className="pagename">Profile</span>
            </div>
          </Link>
        )}
        {/* <Link to="/"> */}
        {/* <div className="linktypeflexxcol">
          <i class="fa-solid fa-circle-user"></i>
          <span className="pagename">Logout</span>
        </div> */}

        {localStorage.getItem("tokenid") ? (
          <button onClick={logout} className="btnfb">
            Logout
          </button>
        ) : (
          location?.pathname !== "/login" &&
          location?.pathname !== "/signup" && (
            <Link to="/login">
              <button className="btnfb">Login</button>
            </Link>
          )
        )}
        {/* </Link> */}
        {/* </Link> */}
      </div>
    </div>
  );
};

export default Navbar;

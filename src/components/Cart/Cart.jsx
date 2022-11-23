import React, { useState } from "react";
import CartComponent from "../CartComponent/CartComponent";
import "./cart.css";

const Cart = () => {
  const [cart, setCart] = useState([{}, {}]);
  return (
    <div className="cartflexxcol">
      <p className="nocart">
        {cart.length} &nbsp;
        {cart.length > 1 ? "items" : "item"}{" "}
      </p>
      <div className="cartitemsflexxcol">
        {cart.map((item, ind) => {
          return <CartComponent key={ind} />;
        })}
      </div>
    </div>
  );
};

export default Cart;

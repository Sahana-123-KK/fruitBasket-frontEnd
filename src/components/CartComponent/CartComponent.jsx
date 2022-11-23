import React from "react";
import "./cartcomponent.css";
import orange from "../../images/orange.jpg";

const CartComponent = () => {
  return (
    <div className="cartitemflexxrow">
      <img src={orange} alt="" className="cartitemimg" />
      <div className="cartiteminfoflexxcol">
        <h5 className="carttitle">Fresho-Orange-Nagpur,Regular</h5>
        <span className="piecesqnty">6 pieces</span>
        <span className="cutprice"> ₹78.95 </span>
        <span className="nowprice"> ₹49 </span>
      </div>
    </div>
  );
};

export default CartComponent;

import React, { useContext } from "react";
import "./cartcomponent.css";
import orange from "../../images/orange.jpg";
import fruitContext from "../../context/FruitContext";

const CartComponent = ({ item }) => {
  const { cart, setCart } = useContext(fruitContext);
  // console.log(item);
  const removeItem = (item) => {
    // const ind = cart.indexOf(item?.name);

    // console.log(ind);
    setCart([]); //-->Emptying the cart, but later this functionality must be done, only for that particular element in array
  };
  return (
    <div className="cartitemflexxrow">
      <img src={item?.image} alt="" className="cartitemimg" />
      <div className="cartiteminfoflexxcol">
        <h5 className="carttitle">{item?.name}</h5>
        <span className="piecesqnty">{item?.pieces} pieces</span>
        <span className="cutprice"> ₹78.95 </span>
        <span className="nowprice"> ₹{item?.price}</span>
        <button
          onClick={() => {
            removeItem(item);
          }}
          className="btnfbcart"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartComponent;

import React, { useContext, useEffect, useState } from "react";
import fruitContext from "../../context/FruitContext";
import CartComponent from "../CartComponent/CartComponent";
import "./cart.css";

const Cart = () => {
  // const [cart, setCart] = useState([{}, {}]);
  const { cart, setCart } = useContext(fruitContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    cost: "",
    items: [],
    address: "",
  });
  // console.log(cart);
  // console.log(cart[0]);
  useEffect(() => {
    if (isCheckout) {
      console.log("hello");
      setOrderInfo({
        cost: cart[0].price,
        items: [{ fruitId: cart[0]._id, price: cart[0].price }],
        address: "",
      });
    }
  }, [isCheckout]);
  const changeCheck = () => {
    setIsCheckout(!isCheckout);

    // console.log(orderInfo);
  };
  // console.log(cart);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo({ ...orderInfo, [name]: value });
  };

  const placeOrder = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderInfo),
      });
      console.log(response);
      const json = await response.json();
      console.log(json);
      alert("Order Placed Successfully");
    } catch (error) {
      console.log(error);
      alert("Couldn't Place Order");
    }
  };
  return (
    <div className="cartflexxcol">
      <h2 className="carthead">
        {cart.length == 1 ? "Your Cart is Full" : "Your Cart is Empty"}
      </h2>
      <p className="nocart">
        {cart.length} &nbsp;
        {cart.length > 1 ? "items" : "item"}{" "}
      </p>
      <div className="cartitemsflexxcol">
        {cart.map((item, ind) => {
          // console.log(item);
          return <CartComponent key={ind} item={item} />;
        })}
      </div>
      {cart.length == 1 && isCheckout && (
        <div className="placeorder">
          <div className="mb-3">
            <h2>Enter Your Delivery Details</h2>
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              onChange={handleChange}
              name="address"
              className="form-control"
              id="address"
              rows="3"
            ></textarea>
            <div className="orderflexxrow">
              <button onClick={placeOrder} className="btnfb">
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
      {cart.length === 1 && (
        <div className="checkout">
          <h5 className="amountinfo"> Total ₹ {cart[0].price} </h5>
          <button onClick={changeCheck} className="btnfb">
            {isCheckout ? "Not Now" : "Checkout"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

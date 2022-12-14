import React, { useEffect, useState } from "react";
import OrdersComponent from "../OrdersComponent/OrdersComponent";
import { Link, useNavigate } from "react-router-dom";
import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/orders/getuserorders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("tokenid"),
          },
        }
      );
      console.log(response);
      const json = await response.json();
      console.log(json);
      setOrders(json?.orders);
      console.log(json?.orders);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("tokenid")) {
      getOrders();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="ordersflexxcol">
      <div className="flexxroworders">
        <h2 className="ordershead">Your Orders</h2>
        <Link to="/fruits">
          <button className="btnfb">Continue Shopping</button>
        </Link>
      </div>
      {orders.map((order, ind) => {
        return <OrdersComponent key={ind} order={order} />;
      })}
    </div>
  );
};

export default Orders;

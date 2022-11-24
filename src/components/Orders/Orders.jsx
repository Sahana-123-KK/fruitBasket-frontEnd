import React, { useEffect, useState } from "react";
import OrdersComponent from "../OrdersComponent/OrdersComponent";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="ordersflexxcol">
      <h2 className="ordershead">Your Orders</h2>
      {orders.map((order, ind) => {
        return <OrdersComponent key={ind} order={order} />;
      })}
      <Link to="/fruits">
        <button className="btnfb">Continue Shopping</button>
      </Link>
    </div>
  );
};

export default Orders;

import React from "react";
import "./orderscomponent.css";
import orange from "../../images/orange.jpg";
import { Link } from "react-router-dom";
const OrdersComponent = ({ order }) => {
  console.log(order);
  return (
    <div className="ordercompflexxrow">
      <div className="orderimgratiflexxcol">
        <img className="orderimg" src={order?.order?.image} alt="" />
        <div className="ratingorderflexxrow">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star-half-stroke"></i>
          <span className="ratingvalue"> {order?.order?.rating}.0 </span>
        </div>
      </div>
      <div className="orderdetailsflexxcol">
        <p className="typeorder">FRESHO</p>
        <Link to={`/fruits/${order?.order?._id}`}>
          <h5 className="ordername">{order?.order?.name} </h5>
        </Link>
        <p className="quantityorder"> {order?.order?.quantity} kg </p>
        <h5 className="ordercost"> Rs {order?.cost} </h5>
        <p className="orderaddress">
          Delivered to: <span className="addressoforder">{order?.address}</span>
        </p>
        <div className="flexxrowwritereview">
          <Link to={`/fruits/${order?.order?._id}`}>
            <button className="btnfbgreen">Write a Review</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrdersComponent;

import React from "react";
import { Link } from "react-router-dom";
import "./fruit.css";
// import orange from "../../images/orange.jpg";
const Fruit = ({ item }) => {
  return (
    <div className="fruititemflexxrow">
      <img src={item?.image} alt="" className="fruitimg" />
      <span className="offerfruit">{item?.offer}% OFF</span>
      <div className="fruitinfoflexxcol">
        <div className="flexxrowicondays">
          <h5 className="type">FRESHO</h5>
          <i class="fa-solid fa-truck"> &nbsp;1day</i>
        </div>
        <Link to={item?._id}>
          <h2 className="fruitname">{item?.name}</h2>
        </Link>
        <p className="quantityfruit">1Kg-(Approx.{item?.pieces} pcs)</p>
        <h5 className="fruitcost">
          ₹{item?.price} <span className="crosscost">₹78.95</span>
        </h5>
        <button className="btnfb">Add</button>
      </div>
    </div>
  );
};

export default Fruit;

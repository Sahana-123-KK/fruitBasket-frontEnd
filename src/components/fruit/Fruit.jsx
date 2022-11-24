import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import fruitContext from "../../context/FruitContext";
import "./fruit.css";
// import orange from "../../images/orange.jpg";
const Fruit = ({ item }) => {
  const { cart, setCart } = useContext(fruitContext);
  const navigate = useNavigate();

  const addToCart = (item) => {
    setCart([...cart, item]);
  };
  useEffect(() => {
    if (cart.length === 1) {
      navigate("/cart");
    }
  }, [cart]);
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
        <p className="quantityfruit">
          {" "}
          {item?.quantity} Kg-(Approx.{item?.pieces} pcs)
        </p>
        <h5 className="fruitcost">
          ₹{item?.price} <span className="crosscost">₹78.95</span>
        </h5>
        <button
          onClick={() => {
            addToCart(item);
          }}
          className="btnfb"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Fruit;

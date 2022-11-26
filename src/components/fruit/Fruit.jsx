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
    <div
      className={
        item?.count !== 0 ? "fruititemflexxrow" : "fruititemflexxrownot"
      }
    >
      <img src={item?.image} alt="" className="fruitimg" />
      <span className="offerfruit">{item?.offer}% OFF</span>
      <div className="fruitinfoflexxcol">
        <div className="flexxrowicondays">
          <h5 className="type">FRESHO</h5>
          <div className="flexxrowdeliveryicon">
            <i class="fa-solid fa-truck"> </i> &nbsp;
            <span className="daysno">1day</span>
          </div>
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
        {item?.count === 0 ? (
          <h3 className="outstock">Out of Stock</h3>
        ) : (
          <button
            disabled={item?.count === 0}
            onClick={() => {
              addToCart(item);
            }}
            className="btnfb"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default Fruit;

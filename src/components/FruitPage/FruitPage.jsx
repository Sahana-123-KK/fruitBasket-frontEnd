import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fruitContext from "../../context/FruitContext";
import orange from "../../images/orange.jpg";

import "./fruitpage.css";

const FruitPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [fruitData, setFruitData] = useState({});
  const { cart, setCart } = useContext(fruitContext);
  console.log(location.pathname.split("/")[2]);
  let id = location.pathname.split("/")[2];

  useEffect(() => {
    getFruit();
  }, []);
  const addToCart = (item) => {
    setCart([...cart, item]);
  };
  useEffect(() => {
    if (cart.length === 1) {
      navigate("/cart");
    }
  }, [cart]);

  const getFruit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/fruits/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      const json = await response.json();
      console.log(json);
      setFruitData(json);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="all">
      <div className="fruitpageflexxcol">
        <h2 className="fruitnamepage">
          {fruitData?.name},1 kg-(Approx. {fruitData?.pieces} pcs)
        </h2>
        <p className="priceinfoflexxrow">
          <span className="mrp commoncls">Rs {fruitData?.price} </span>
          <span className="strikedprice commoncls">MRP: Rs 78.95</span>
          <span className="offervalue commoncls">{fruitData?.offer}% OFF</span>
        </p>
        <span className="taxes">(Inclusive of all taxes)</span>
        <div className="fruitsflexxrowpage">
          <div className="imgcontainer">
            <img src={fruitData?.image} alt="" className="fruitdisplay" />
            <i class="fa-solid fa-leaf vegicon"></i>
          </div>
          <div className="infofruits">
            <div className="ratingflexxrow">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star-half-stroke"></i>
              <span className="ratingvalue">
                {" "}
                {fruitData?.rating}.0 Ratings{" "}
              </span>
            </div>
            <div className="getnow">
              <i class="fa-solid fa-truck"></i>&nbsp; Get in 1 day
            </div>
            <div className="aboutfruit">
              <p className="abouthead">About this product</p>
              <p className="desc">{fruitData?.description}</p>
            </div>
            <div className="fruitpagebtns">
              <button className="btn2">
                {" "}
                <i class="fa-regular fa-bookmark"></i> &nbsp;Save For Later
              </button>
              <button
                onClick={() => {
                  addToCart(fruitData);
                }}
                className="btnfb"
              >
                <i class="fa-solid fa-basket-shopping"></i> &nbsp;Add To Basket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FruitPage;

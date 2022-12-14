import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fruitContext from "../../context/FruitContext";
import orange from "../../images/orange.jpg";
import CommentComponent from "../commentComponent/CommentComponent";

import "./fruitpage.css";

const FruitPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [fruitData, setFruitData] = useState({});
  const [comments, setComments] = useState([]);
  const { cart, setCart } = useContext(fruitContext);
  console.log(location.pathname.split("/")[2]);
  let id = location.pathname.split("/")[2];

  useEffect(() => {
    getFruit();
    getComments();
  }, []);
  const addToCart = (item) => {
    setCart([
      // ...cart, //-->This must be made, but right now functionality is like we can only add one fruit at a time and place order
      item,
    ]);
    navigate("/cart");
  };
  // useEffect(() => {
  //   if (cart.length === 1) {
  //     navigate("/cart");
  //   }
  // }, [cart]);
  const [ratingCommand, setRatingCommand] = useState({
    comment: "",
    rating: 1,
    fruitId: id,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRatingCommand({ ...ratingCommand, [name]: value });
  };
  const getComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/comments/get/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("tokenid"),
          },
          method: "GET",
        }
      );
      console.log(response);
      const json = await response.json();
      setComments(json?.commentsForFruit);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };
  const submitComment = async () => {
    if (!localStorage.getItem("tokenid")) {
      navigate("/login");
    } else {
      setRatingCommand({
        comment: "",
        rating: 1,
        fruitId: id,
      });
      try {
        const response = await fetch(
          "http://localhost:8000/api/comments/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("tokenid"),
            },
            body: JSON.stringify(ratingCommand),
          }
        );
        console.log(response);
        const json = await response.json();
        console.log(json);
        // alert("Your co")
      } catch (error) {
        console.log(error);
        alert("Couldn't Post Comment");
      }
    }
  };

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

  const [show, setShow] = useState(false);
  const showComments = () => {
    setShow(!show);
  };
  return (
    <div className="all">
      <div className="fruitpageflexxcol">
        <h2 className="fruitnamepage">
          {fruitData?.name},{fruitData?.quantity} kg-(Approx.{" "}
          {fruitData?.pieces} pcs)
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
            <i className="fa-solid fa-leaf vegicon"></i>
          </div>
          <div className="infofruits">
            <div className="ratingflexxrow">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half-stroke"></i>
              <span className="ratingvalue">
                {" "}
                {fruitData?.rating}.0 Ratings{" "}
              </span>
            </div>
            <div className="getnow">
              <i className="fa-solid fa-truck"></i>&nbsp; Get in 1 day
            </div>
            <div className="aboutfruit">
              <p className="abouthead">About this product</p>
              <p className="desc">{fruitData?.description}</p>
            </div>
            <div className="fruitpagebtns">
              <button className="btn2">
                {" "}
                <i className="fa-regular fa-bookmark"></i> &nbsp;Save For Later
              </button>
              {fruitData?.count === 0 ? (
                <h3 className="outstock">Out of Stock</h3>
              ) : (
                <button
                  disabled={fruitData?.count === 0}
                  onClick={() => {
                    addToCart(fruitData);
                  }}
                  className="btnfb"
                >
                  <i className="fa-solid fa-basket-shopping"></i> &nbsp;
                  {fruitData?.count !== 0 ? "Add To Basket" : "Out of Stock"}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="commentsflexxcol">
          <h2 onClick={showComments} className="comments">
            <span className="commhead">Comments</span>
            {!show ? (
              <i className="fa-solid fa-chevron-down"></i>
            ) : (
              <i className="fa-solid fa-chevron-up"></i>
            )}
          </h2>
          <div className="flexxrowcommrat">
            <div className="mb-3 commentinp">
              <label htmlFor="comment" classNclassName="form-label">
                Comment
              </label>
              <textarea
                value={ratingCommand?.comment}
                onChange={handleChange}
                name="comment"
                className="form-control"
                id="comment"
                rows="2"
                placeholder="Leave your Review"
              ></textarea>
            </div>
            <div className="col-12 ratingdrop">
              <label className="visually" htmlFor="rating">
                Rating
              </label>
              <select
                value={ratingCommand?.rating}
                onChange={handleChange}
                name="rating"
                className="form-select"
                id="rating"
              >
                {/* <option selected>Choose...</option> */}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          <button onClick={submitComment} className="btnfbcommentssub">
            Submit
          </button>
          {show && (
            <div className="allcomments">
              {comments.length === 0 ? (
                <h5 className="addnewcomm">
                  {" "}
                  <i class="fa-regular fa-face-smile-beam"></i> &nbsp;Be the
                  First To Review
                </h5>
              ) : (
                <>
                  {comments.map((comment, ind) => {
                    return <CommentComponent key={ind} comment={comment} />;
                  })}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FruitPage;

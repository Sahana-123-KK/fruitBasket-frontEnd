import React, { useState } from "react";
import "./commentcomponent.css";
import moment from "moment";
const CommentComponent = ({ comment }) => {
  //   console.log(localStorage.getItem("userinfo"));

  //   console.log(comment?.user);

  //-->Whenever you use localstorage, and when u store and object u need to stringify it, and before using it from ls you must parse it.

  const deleteComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/comments/delete/${comment?._id}`, //-->Id of order not fruit🤣
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("tokenid"),
          },
        }
      );
      const json = await response.json();
      if (json?.success) {
        alert("Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Couldn't Delete Comment");
    }
  };
  const [isUpdate, setIsUpdate] = useState(false);
  const handleClick = () => {
    setIsUpdate(!isUpdate);
  };
  const [ratingCommand, setRatingCommand] = useState({
    comment: comment?.comment,
    rating: comment?.rating,
    // fruitId: comment?.fruitId,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRatingCommand({ ...ratingCommand, [name]: value });
  };
  const updateComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/comments/update/${comment?._id}`,
        {
          method: "PUT",
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
  };
  return (
    <div className="compcommentflexxcol">
      <span className="ratingcomm">
        {comment?.rating} <i class="fa-solid fa-star"></i>
      </span>
      {!isUpdate ? (
        <div className="commentmess">{comment?.comment} </div>
      ) : (
        <div className="updateflexxcolcomm">
          <div className="flexxrowcommrat">
            <div className="commentinp">
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
          <button onClick={updateComment} className="btnfbcommentsdel">
            Update
          </button>
        </div>
      )}
      <div className="commentorsname">
        {JSON.parse(localStorage.getItem("userinfo")).id === comment?.user
          ? "You"
          : comment?.name}
      </div>
      <div className="flexxrowcomment">
        <div className="commenttime">
          {moment(comment?.createdAt).fromNow()}{" "}
          {/* For getting time from now like 3mins ago, 4 hours ago*/}
        </div>

        {JSON.parse(localStorage.getItem("userinfo")).id === comment?.user && (
          <div className="btnscommentactionflexxrow">
            <button onClick={deleteComment} className="btnfbcommentsdel">
              Delete
            </button>
            <button onClick={handleClick} className="btnfbcommentsdel">
              {isUpdate ? "Cancel" : "Update"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentComponent;

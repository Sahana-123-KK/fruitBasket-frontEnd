import React, { useEffect, useState } from "react";
import Fruit from "../fruit/Fruit";
import "./fruits.css";

const Fruits = () => {
  const [fruits, setFruits] = useState([{}, {}, {}, {}, {}]);
  const getFruits = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/fruits/all", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      console.log(response);
      const json = await response.json();
      setFruits(json?.allFruits);
      console.log(json?.allFruits);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFruits();
  }, []);

  return (
    <div className="fruitsflexxcol">
      <h1 className="fruitshead">
        Experience our Hand Picked Fruits with Love For U
      </h1>
      <div className="fruitscontainer">
        <h4 className="fruitscount">{fruits.length} Items</h4>
        <div className="fruitswrappercol">
          {fruits.map((item, ind) => {
            return <Fruit item={item} key={ind} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Fruits;

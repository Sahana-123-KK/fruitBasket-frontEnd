import { useState } from "react";
import FruitContext from "./FruitContext";

const FruitState = (props) => {
  const [cart, setCart] = useState([]);
  return (
    <FruitContext.Provider value={{ cart, setCart }}>
      {props.children}
    </FruitContext.Provider>
  );
};

export default FruitState;

import "./App.css";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import Fruits from "./components/Fruits/Fruits";
import FruitPage from "./components/FruitPage/FruitPage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Orders from "./components/Orders/Orders";
import FruitState from "./context/FruitState";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <>
      <FruitState>
        <Router>
          <Routes>
            <Route path="/fruits" element={<Fruits />}></Route>
            <Route path="/fruits/:id" element={<FruitPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </FruitState>
    </>
  );
}

export default App;

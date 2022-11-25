import "./App.css";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import Fruits from "./components/Fruits/Fruits";
import FruitPage from "./components/FruitPage/FruitPage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Orders from "./components/Orders/Orders";
import FruitState from "./context/FruitState";
import Cart from "./components/Cart/Cart";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <FruitState>
        <Router>
          <Navbar />{" "}
          {/* if we write outside router, and we use link tag in it,it then creates issues also we cant write inside routes, if we do , we wont get as default, so the way is declaring inside router but outside routes*/}
          <Routes>
            {/* <Route element={<Navbar />} /> */}
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

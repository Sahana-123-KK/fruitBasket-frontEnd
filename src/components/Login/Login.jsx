import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem("tokenid")) {
      navigate("/fruits");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const loginfunction = async (e) => {
    e.preventDefault();
    setCredentials({
      email: "",
      password: "",
    });
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(credentials),
        credentials: "include", //-->When we use cors() we need to include this so that we can have exhange of cookies and stuff
      });

      console.log(response);
      const json = await response.json();
      console.log(json);
      if (json?.success) {
        localStorage.setItem("tokenid", json?.token);
        localStorage.setItem("userinfo", JSON.stringify(json?.user));
        navigate("/fruits");
      } else {
        alert("Couldn't Login Successfully");
      }
    } catch (error) {
      alert("Couldn't Login Successfully");
    }
  };
  return (
    <div className="allforms">
      <div className="container  logincard">
        <h2 className="mt-2 mb-2">Login To Continue</h2>
        <form onSubmit={loginfunction}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              value={credentials?.email}
              onChange={handleChange}
              name="email"
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              value={credentials?.password}
              onChange={handleChange}
              name="password"
              type="password"
              className="form-control"
              id="password"
            />
          </div>
          <div className="linksbtnsloginflexxrow">
            <button type="submit" className="btnfb">
              Submit
            </button>
            <Link to="/signup">Create an Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

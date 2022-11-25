import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

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
        },
        body: JSON.stringify(credentials),
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
    <div className="container w-50">
      <h2 className="mt-5 mb-2">Login To Continue</h2>
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

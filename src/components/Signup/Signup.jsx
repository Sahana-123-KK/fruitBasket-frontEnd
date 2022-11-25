import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [signupCredentials, setSignupCredentials] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  useEffect(() => {
    if (localStorage.getItem("tokenid")) {
      navigate("/fruits");
    }
  }, []);
  const updateChange = (e) => {
    if (e.target.checked) {
      console.log("Checked");
      setSignupCredentials({ ...signupCredentials, isAdmin: true });
      //   setSignupCredentials{...signupCredentials}
    } else {
      console.log("Not Checked");
      setSignupCredentials({ ...signupCredentials, isAdmin: false });
    }
  };
  const signup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupCredentials),
        credentials: "include", //-->For exchange of cookies and stuff with backend when we use cors
      });
      console.log(response);
      const json = await response.json();
      console.log(json);
      if (json?.success) {
        localStorage.setItem("tokenid", json?.token);
        localStorage.setItem("userinfo", JSON.stringify(json?.user));

        navigate("/fruits");
      } else {
        alert("Couldn't SignUp Successfully");
      }
    } catch (error) {
      alert("Unable to Signup");
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupCredentials({ ...signupCredentials, [name]: value });
  };
  return (
    <div className="allformssignup">
      <div className="container mt-5 mb-2 signupcard">
        <h2 className="mb-2">SignUp To Continue</h2>
        <form onSubmit={signup}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              className="form-control"
              value={signupCredentials?.name}
              id="name"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              onChange={handleChange}
              name="email"
              value={signupCredentials?.email}
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
              value={signupCredentials?.password}
              onChange={handleChange}
              type="password"
              className="form-control"
              id="password"
              name="password"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              name="password"
              onChange={updateChange}
              type="checkbox"
              className="form-check-input"
              id="isAdmin"
            />
            <label className="form-check-label" htmlFor="isAdmin">
              Admin
            </label>
          </div>
          <div className="linksbtnsloginflexxrow">
            <button type="submit" className="btnfb">
              Create Account
            </button>
            <Link to="/login">Already Have One</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

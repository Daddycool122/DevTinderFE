import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [toggleLogin, setToggleLogin] = useState("login"); // 'login' or 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(""); // for signup
  const [lastName, setLastName] = useState(""); // for signup
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState(false);

  const handleLogin = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/signIn`,
      { email, password },
      { withCredentials: true }
    );
    dispatch(addUser(res.data.data));
    navigate("/feed");
  } catch (err) {
    console.error(err);
    const msg =
      (err?.response?.data && err.response.data.error) || 
      (typeof err?.response?.data === "string" && err.response.data) ||
      "Something went wrong";
    setErrorMessage(msg);
  }
};


const handleSignup = async () => {
  try {
    const res =await axios.post(
      `${BASE_URL}/user`,
      { firstName, lastName, email, password },
      { withCredentials: true }
    );

    dispatch(addUser(res.data.data));
    navigate("/profile");

    setToast(true);
    setTimeout(() => {
      setToast(false);
      setToggleLogin('login');
    }, 2000);

    setFirstName("");
    setLastName("");
    setErrorMessage("");
  } catch (err) {
    console.error(err);
    const msg =
      (err?.response?.data && err.response.data.error) || 
      (typeof err?.response?.data === "string" && err.response.data) ||
      "Something went wrong";
    setErrorMessage(msg);
  }
};


  const isLogin = toggleLogin === "login";

  return (
    <div className="flex items-center justify-center my-20">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLogin ? "Login" : "Sign Up"}</h2>

          {/* Name fields only for signup */}
          {!isLogin && (
            <div>
              <fieldset className="fieldset p-2">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input"
                  placeholder="Enter your first name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset p-2">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input"
                  placeholder="Enter your last name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </div>
          )}

          <fieldset className="fieldset p-2">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="text"
              value={email}
              className="input"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset p-2">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              value={password}
              className="input"
              placeholder="*******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>

          {/* Login/Signup toggle */}
          <a
            onClick={() => setToggleLogin(isLogin ? "signup" : "login")}
            className="flex justify-center mb-2 text-blue-600 hover:cursor-pointer"
          >
            {isLogin
              ? "New to DevTinder? Sign up here"
              : "Already have an account? Login here"}
          </a>

          {/* Toast message inside the card, below toggle */}
          {toast && (
            <div
              role="alert"
              className="alert alert-success w-full flex justify-center p-2 mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>User created successfully</span>
            </div>
          )}

          {/* Error message */}
          {errorMessage && (
            <div className="flex justify-center p-2 text-red-600">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../../context/firebase";
import "./style.css";
import { HOME, LOGIN, SIGN_UP, FORGOTPASSWORD } from "../../constants/routes";
import { Helmet } from "react-helmet";

const Login = () => {
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || email === "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate(HOME);
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
  };

  return (
    <div className="login_system">
      <Helmet>
        <title>Sign in system</title>
      </Helmet>

      <div className="login_glava">
        <div className="login_glava1">
          <div className="name_login mb-10">
            <h1>My Instagram</h1>
          </div>

          <div className="flex items-center my-3 w-full"></div>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="" method="post">
            <div>
              <input
                type="text"
                aria-label="Enter your email address"
                placeholder="Email"
                className="input_sign_in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                aria-label="Enter your password"
                placeholder="Password"
                className="input_sign_in mt-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <div className="button_center">
                <button
                  disabled={isInvalid}
                  type="submit"
                  className={`button_login ${isInvalid && "opacity-50"}`}
                >
                  Sign in
                </button>
              </div>

              <div class="flex items-center my-2.5 mb-3.5">
                <div class="h-px bg-gray-300 flex-1"></div>
                <span class="px-4 text-[13px] text-gray-500 font-semibold">
                  OR
                </span>
                <div class="h-px bg-gray-300 flex-1"></div>
              </div>
            </div>

            <div className="text-center mt-3">
              <Link
                to={FORGOTPASSWORD}
                className="forget_button"
              >
                Forgot password?
              </Link>
            </div>
            <div className="sign_up_buttons">
              Don't have an account?{" "}
              <Link
                to={SIGN_UP}
                className="sign_up"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

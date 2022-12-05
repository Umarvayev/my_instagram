import React, { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import Login from "./Signin";
import { LOGIN } from "../../constants/routes";
import { Helmet } from "react-helmet";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        setError(`${error.code} ${error.message}`);
      });
  };

  const isInvalid = email.trim() === "";

  return (
    <div className=" h-screen w-screen flex flex-wrap items-center justify-center p-3">
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <div className="login_glava">
        <div className="login_glava1">
          <div className="flex justify-center mb-8">
            <div className="name_login mb-10">
              <h1>My Instagram</h1>
            </div>
          </div>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="" method="post">
            <div>
              {/* <span className='text-gray-500 text-sm'>Email</span> */}
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
              <div className="button_center">
                <button
                  disabled={isInvalid}
                  type="submit"
                  className={`button_login mb-4 ${isInvalid && "opacity-50"}`}
                >
                  Reset Password
                </button>
              </div>
            </div>

            <div class="flex items-center my-2.5 mb-3.5 mt-3.5">
              <div class="h-px bg-gray-300 flex-1"></div>
              <span class="px-4 text-[13px] text-gray-500 font-semibold">
                OR
              </span>
              <div class="h-px bg-gray-300 flex-1"></div>
            </div>

            <div className="flex justify-center items-center flex-col w-full mt-10">
              <p className="text-sm">
                <Link to={LOGIN} className="sign_up">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

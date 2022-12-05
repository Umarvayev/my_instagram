import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "./../../context/firebase";
import "./style.css";
import { HOME, LOGIN, FORGOTPASSWORD } from "./../../constants/routes";
import { doesUsernameExist } from "./../../services/firebase";
import { useRef } from "react";
import { Helmet } from "react-helmet";
import my_img from "./img/1617593344_33-p-zadnii-temnii-fon-34.jpg";

const SignUp = () => {
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const usernameExists = await doesUsernameExist(username);
      if (!usernameExists.length) {
        try {
          const userResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);

          await userResult.user.updateProfile({
            displayName: username,
          });

          await firebase.firestore().collection("users").add({
            userId: userResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            email: email.toLowerCase(),
            following: [],
            followers: [],
            dataCreated: Date.now(),
            aboutMe: "",
            avatarSrc:
              "https://parkridgevet.com.au/wp-content/uploads/2020/11/Profile-300x300.png",
          });

          navigate(HOME);
        } catch (error) {
          setFullName("");
          setEmail("");
          setPassword("");
          setError(error.message);
        }
      } else {
        setError("A user with this name has already been created!");
      }
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
  };

  return (
    <div className=" h-screen w-screen flex flex-wrap items-center justify-center p-3">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <div className="login_glava">
        <div className="login_glava1">
          <div className="flex justify-center mb-4">
            <div className="name_login mb-10">
              <h1>My Instagram</h1>
            </div>
          </div>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="" method="post">
            <div>
              <input
                type="text"
                aria-label="Enter your email username"
                placeholder="Enter your Username"
                className="input_sign_in"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                aria-label=" full name"
                placeholder="Enter Your Full Name"
                className="input_sign_in mt-3"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                aria-label="Email"
                placeholder="Enter your Email"
                className="input_sign_in mt-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                aria-label="Enter your password"
                placeholder="Enter your Password"
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
                className={`button_login mb-4 ${
                  isInvalid && "opacity-50"
                }`}
              >
                Sign up
              </button>
              </div>
            </div>
          </form>
        </div>

        <div className="sign_up_buttons">
          Have an account?{" "}
          <Link to={LOGIN} className="sign_up ">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

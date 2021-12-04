import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-spinners/SyncLoader";

const axios = require("axios").default;

export const RegisterComponent = () => {
  const [isNewUserState, setIsNewUser] = useState(true);
  const handleHaveAccount = () => {
    setIsNewUser(false);
  };
  const handleNewAccount = () => {
    setIsNewUser(true);
  };

  return (
    <div className="form-container">
      <ToastContainer />
      {isNewUserState ? <RegisterForm /> : <LoginForm />}
      {isNewUserState ? (
        <button
          className="text-center w-full text-xl text-black"
          onClick={handleHaveAccount}
        >
          Already Have An Account?
          <span className="mx-2 text-center w-full text-2xl text-blue-500 underline">
            Login
          </span>
        </button>
      ) : (
        <button
          className="text-center w-full text-xl text-black"
          onClick={handleNewAccount}
        >
          Don't Have An Account?
          <span className="mx-2 text-center w-full text-2xl text-blue-500 underline">
            Register
          </span>
        </button>
      )}
    </div>
  );
};

export const RegisterForm = () => {
  const [nameState, setName] = useState("");
  const [nameErrorState, setNameError] = useState("");

  const [phoneState, setPhone] = useState("");
  const [phoneErrorState, setPhoneError] = useState("");

  const [emailState, setEmail] = useState("");
  const [passwordState, setPassword] = useState("");
  const [confirmPasswordState, setConfirmPassword] = useState("");

  const [isLoading, setIsloading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const postNewRegister = (event) => {
    event.preventDefault();

    try {
      console.log(emailState);
      if (nameState.length === 0) {
        setNameError("");
        setNameError("Shame on You ,Name Can't Be Empty");
        return;
      } else {
        setNameError("");
      }
      if (phoneState.length === 0) {
        setPhoneError("");
        setTimeout(() => {
          setPhoneError("Shame on You ,Phone Can't Be Empty");
        }, 100);
        return;
      } else {
        setPhoneError("");
      }

      setIsloading(true);

      axios({
        method: "post",
        url: "http://localhost:5000/api/user/",
        data: JSON.stringify({
          name: nameState,
          phone: phoneState,
          email: emailState,
          password: passwordState,
          avatarPath: "files/users/images/nophoto.png",
          address: "default address",
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          console.log(res);
          setIsloading(false);
          setIsLoggedIn(res.status === 200);
        })
        .catch((err) => {
          console.log("errerrerrerrerrerr");
          setIsloading(false);
          setIsLoggedIn(false);
        });
      console.log("userLoginResponse");
    } catch (error) {
      console.log(error);
      setIsloading(false);
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center p-8">
          <Spinner loading={isLoading} />
        </div>
      ) : null}
      <h1
        className="title-comp"
      >
        Register new account and create your stores
      </h1>
      <form>
        {buildInputGroup(
          "Name",
          "name",
          "text",
          nameState,
          setName,
          nameErrorState
        )}
        {buildInputGroup(
          "Phone",
          "phone",
          "number",
          phoneState,
          setPhone,
          phoneErrorState
        )}
        {buildInputGroup("Email", "email", "email", emailState, setEmail)}
        {buildInputGroup(
          "Password",
          "password",
          "password",
          passwordState,
          setPassword
        )}
        {buildInputGroup(
          "Confirm Password",
          "password",
          "password",
          confirmPasswordState,
          setConfirmPassword
        )}
        {buildSubmitGroup("Register", postNewRegister)}
      </form>
    </div>
  );
};

export const LoginForm = () => {
  const [emailState, setEmail] = useState("");
  const [passwordState, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const createLoginRequest = (event) => {
    event.preventDefault();
    setIsloading(true);
    try {
      console.log(emailState);
      axios({
        method: "post",
        url: "http://localhost:5000/api/user/login/",
        data: JSON.stringify({
          email: emailState,
          password: passwordState,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          console.log(res);
          setIsloading(false);
          setIsLoggedIn(res.status === 200);
          if (res.status === 200) {
            toast.success("Logged In Successfully");
          } else {
            toast.warn("unAuthenticated");
          }
        })
        .catch((err) => {
          console.log("errerrerrerrerrerr");
          toast.error("Failed To Login");
          setIsloading(false);
          setIsLoggedIn(false);
        });
      console.log("userLoginResponse");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
      setIsloading(false);
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center p-8">
          <Spinner loading={isLoading} />
        </div>
      ) : null}

      {isLoading && isLoggedIn ? null : (
        <div>
          <h1 className="title-comp">login to your store</h1>
          <form>
            {buildInputGroup("Email", "email", "email", emailState, setEmail)}
            {buildInputGroup(
              "password",
              "password",
              "password",
              passwordState,
              setPassword
            )}
            {buildSubmitGroup("Login", createLoginRequest)}
          </form>
        </div>
      )}
    </div>
  );
};

const buildInputGroup = (
  lbl,
  lblFor,
  inputType,
  dataState,
  setData,
  errorState = ""
) => {
  return (
    <div className="div-input">
      <label htmlFor={lblFor} className="lbl-comp">
        {lbl}
      </label>

      <input
        required
        type={inputType}
        name={lblFor}
        id={lblFor}
        className="input-comp"
        value={dataState}
        onChange={(e) => setData(e.target.value)}
      />

      {errorState.length > 0 && (
        <span className="error-comp">{errorState} 🤔</span>
      )}
    </div>
  );
};

function buildSubmitGroup(value, handleAction) {
  return (
    <div className="div-submit">
      <button className="btn-submit" onClick={handleAction}>
        {value}
      </button>
    </div>
  );
}

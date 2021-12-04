const axios = require("axios").default;
// import React from "react";

export const postLogin = async (email, password) => {

  console.log("----------------------------");
  try {

    const userLoginResponse = await axios({
      method: "post",
      url: "http://localhost:5000/api/user/login",
      data: JSON.stringify({ email, password }),
      headers: {'Content-Type': 'application/json'}
    });
    console.log(userLoginResponse);
  } catch (error) {
    console.log(error);
  }
};

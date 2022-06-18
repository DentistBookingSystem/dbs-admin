import { useState } from "react";
import axiosClient from "./axiosClient";

class AuthApi {

  login = async (data) => {
    const url = "/login";
    const res = await axiosClient.post(
      axiosClient.getUri().replace("admin", "auth") + url,
      data
    )
    // console.log(res);
    .then((result) => {
      console.log(result);
      if (result.accessToken) {
        console.log("Return token and phone: ", result);
        localStorage.setItem('user', result.accessToken);
        return result;
      }
      return null;
    });
  };

  logout() {
    localStorage.removeItem('user');
  };

  getCurrentUser(){
      console.log('Get user');
      return localStorage.getItem('user');
  }
}

const authApi = new AuthApi();
export default authApi;

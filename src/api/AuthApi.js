import axios from "axios";
import axiosClient from "./axiosClient";
class AuthApi {
  login = async (data) => {
    const url = "/login";
    try {
      await axios
        .post("http://localhost:8080/rade/auth/login", data)
        .then((result) => {
          console.log(result);
          if (result.data.accessToken.length !== 0) {
            console.log("Return token and phone: ", result);
            localStorage.setItem("user", result.data.accessToken);
            return result;
          }
        });
    } catch (error) {
      console.log("Login failed");
    }finally{
      return null;
    }
    // await axiosClient
    //   .post(axiosClient.getUri().replace("admin", "auth") + url, data)
    //   .then((result) => {
    //     console.log(result);
    //     if (result.data.accessToken) {
    //       console.log("Return token and phone: ", result);
    //       localStorage.setItem("user", result.accessToken);
    //       return result;
    //     } else {
    //       console.log("failed");
    //     }
    //     return null;
    //   });
  };

  logout() {
    localStorage.removeItem("user");
    window.location.href = "/auth/login-page";
    console.log("user now: ", localStorage.getItem("user"));
  }

  getCurrentUser() {
    console.log("Get user");
    return localStorage.getItem("user");
  }
}

const authApi = new AuthApi();
export default authApi;

import axios from "axios";
import axiosClient from "./axiosClient";
class AuthApi {
  login = async (data) => {
    const url = "/login";
    axios.post("http://localhost:8080/rade/auth/login", data).then((result) => {
      console.log(result);
      if (result.data.accessToken.length !== 0) {
        console.log("Return token and phone: ", result);
        localStorage.setItem("user", result.data.accessToken);
        return result;
      } else {
        console.log("failed");
      }
      return null;
    });
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
  }

  getCurrentUser() {
    console.log("Get user");
    return localStorage.getItem("user");
  }
}

const authApi = new AuthApi();
export default authApi;

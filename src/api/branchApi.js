import axios from "axios";
import axiosClient from "./axiosClient";

const API_GET_BRANCH_LIST = "http://localhost:8080/rade/admin/branch/list";
const API_GET_BRANCH_BY_ID = "http://localhost:8080/rade/admin/branch/";
const API_ADD_BRANCH = "http://localhost:8080/rade/admin/branch/add";
const API_ADD_IMAGE = "http://localhost:8080/rade/admin/branch/add-image";

const token = localStorage.getItem("user");

class BranchApi {


  
  // getAll = () => {
  //   console.log("branch: ", token)
  //   return axios.get(API_GET_BRANCH_LIST, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token}`,
  //     },
  //   });
  // };
  getBranchById = (id) => {
    return axios.get(API_GET_BRANCH_BY_ID + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  insert = (formData) => {
    return axios.post(API_ADD_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  };

  insertBranch = (data) => {
    return axios.post(API_ADD_BRANCH, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // BASE_URL = "/branch";
  getAll = () => {
    const url = "/branch" + "/list";
    return axiosClient.get(url);
  };
  // getBranchById = (id) => {
  //   const url = "/branch/" + id;
  //   return axiosClient.get(url);
  // };
  // insert = (formData) => {
  //   const url = "/branch" + "/add";
  //   return axiosClient
  //     .post(url, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => {
  //       return res;
  //     });
  // };
}
const branchApi = new BranchApi();
export default branchApi;

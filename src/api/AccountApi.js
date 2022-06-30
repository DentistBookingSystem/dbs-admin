import React, { Component } from "react";
import axiosClient from "./axiosClient";

class AccountApi {
  GetAccountByRoleIdAndStatus(roleId, status, phone) {
    const url = "/account/list/" + roleId + "/" + status + "/phone=" + phone;
    console.log(url);
    return axiosClient.get(url);
  }

  AddStaff(data) {
    const url = "/account/register";
    return axiosClient.post(url, data);
  }
}

export default new AccountApi();

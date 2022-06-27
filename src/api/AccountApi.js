import React, { Component } from "react";
import axiosClient from "./axiosClient";

class AccountApi {
  GetAccountByRoleIdAndStatus(roleId, status, phone) {
    const url = "/account/list/" + roleId + "/" + status + "/phone=" + phone;
    console.log(url);
    return axiosClient.get(url);
  }
}

export default new AccountApi();

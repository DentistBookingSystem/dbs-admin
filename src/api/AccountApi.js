import axios from "axios";
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

  getAccountByPhone(phone) {
    const url = "/" + phone;
    return axiosClient.get(url);
  }
  getAccountByID(id) {
    const url = "/account/" + id;
    return axiosClient.get(url);
  }

  banAccount(phone) {
    const url = "/account/ban";
    return axiosClient.post(url, phone);
  }

  unbanAccount(phone) {
    const url = "/account/unban";
    return axiosClient.post(url, phone);
  }
}

export default new AccountApi();

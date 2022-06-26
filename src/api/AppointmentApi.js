import axios from "axios";
import axiosClient from "./axiosClient";
const token = sessionStorage.getItem("user");
class AppointmentApi {
  getAppointList = () => {
    const url = "/appointment/1";
    return axiosClient.get(url);
  };

  getAppointListForStaff = async (data) => {
    console.log("getAppointListForStaff", data);
    const url = "http://localhost:8080/rade/staff/appointment/filter/";
    console.log("come", token);
    console.log("accessntoken", sessionStorage.getItem("user"));
    return await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("user")}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMTIzNDU2Nzg5LCQyYSQxMiRRbzJyblA0SmxieXN6QnVIWWhtdDUuZ0cuZDdZQmNZd2NyYlhlaGltZnM0dXBYbjVCZTdiZSIsInJvbGUiOiJST0xFX1NUQUZGIiwiaXNzIjoiQ29kZUphdmEiLCJpYXQiOjE2NTYxMjU4MTMsImV4cCI6MTY1NjEyOTQxM30.-4RiKihpV9J1dKYbf9PqztYFmPNA_KeTNHKK_SlwLPzw_cFSpkcsVMvHVdOH4Z_9ABeB7gkj_q3zBQxTqvl4wQ`,
      },
    });
  };

  getAppointmentDetailForStaff = (data) => {
    const url = "/appointment/find/" + data;
    const mainUrl = axiosClient.getUri().replace("admin", "staff") + url;
    console.log(mainUrl);
    return axiosClient.post(mainUrl);
  };

  checkMarkDone = (id) => {
    const url = "/appointment/markdone/" + id;
    const mainUrl = axiosClient.getUri().replace("admin", "staff") + url;
    console.log(mainUrl);
    return axiosClient.post(mainUrl);
  };

  deleteAppointmentForStaff = (data) => {
    const url = "/appointment/cancel";
    const mainUrl = axiosClient.getUri().replace("admin", "staff") + url;
    console.log(mainUrl);
    return axiosClient.post(mainUrl, data);
  };
}
const appointmentApi = new AppointmentApi();
export default appointmentApi;

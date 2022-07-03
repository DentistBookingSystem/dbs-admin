import axios from "axios";
import axiosClient from "./axiosClient";
const token = sessionStorage.getItem("user");
class AppointmentApi {
  getAppointList = () => {
    const url = "/appointment/1";
    return axiosClient.get(url);
  };

  getAppointListForAdmin = async (data) => {
    console.log("getAppointListForStaff", data);
    const url = "http://localhost:8080/rade/admin/appointment/filter/";
    return await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("user")}`,
      },
    });
  };
  getAppointListForStaff = async (data) => {
    console.log("getAppointListForStaff", data);
    const url = "http://localhost:8080/rade/staff/appointment/filter/";
    return await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("user")}`,
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

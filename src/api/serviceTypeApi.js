import { idText } from "typescript";
import axiosClient from "./axiosClient";

class ServiceTypeApi {
  BASE_URL = "/service_type";
  getAll = () => {
    const url = this.BASE_URL + "/list";
    return axiosClient.get(url);
  };
  insert = (data) => {
    const url = this.BASE_URL + "/add";
    return axiosClient.post(url, data).then((res) => {
      return res;
    });
  };

  getServiceTypeById(id) {
    const url = "";
  }

  editServiceType(id, data) {
    const url = "rade/admin/service_type/edit/" + id;
    return axiosClient.post(url, data);
  }
}
const serviceTypeApi = new ServiceTypeApi();
export default serviceTypeApi;

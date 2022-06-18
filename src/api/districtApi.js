import axiosClient from "./axiosClient";

class DistrictApi {
  getDistrictList = async (province_id) => {
    if (province_id !== -1) {
      const url = "district/" + province_id;
      const mainUrl = axiosClient.getUri().replace("admin", "") + url;
      return await axiosClient.get(mainUrl).then((res) => {
        console.log("district: ", res);
        return res;
      });
    }
    return null;
  };
}

const districtApi = new DistrictApi();
export default districtApi;

import axiosClient from "./axiosClient";

class ProvinceApi{
    getProvinceList = async () => {
        const url = "province";
        const mainUrl = axiosClient.getUri().replace("admin", "") + url;
         return await axiosClient.get(mainUrl).then((res) => {
            console.log("provine: ", res);
            return res;
         });
    }
}

const provinceApi = new ProvinceApi();
export default provinceApi;
import axiosClient from "./axiosClient"

class ServiceTypeApi {
    BASE_URL = "/service-type"
    getAll = () => {
        const url = this.BASE_URL + "/list";
        return axiosClient.get(url);
    }
    insert = (data) => {
        const url = this.BASE_URL + "/add";
        return axiosClient.post(url, data).then((res) => {return res;})
    }
}
const serviceTypeApi = new ServiceTypeApi();
export default serviceTypeApi;
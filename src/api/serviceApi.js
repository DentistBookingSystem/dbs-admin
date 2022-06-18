import axiosClient from "./axiosClient";

class ServiceApi{
    SERVICE_PATH = '/service';
    getAll = (service_type_id) => {
        const url = "/service/" + service_type_id;
        return axiosClient.get(url);
    }
     getServiceList = () => {
         const url = this.SERVICE_PATH + "/list";
         return axiosClient.get(url);
     }
     getService = (service_id) => {
        const url = "/service/" + "?id=" + service_id;
        return axiosClient.get(url);
     }

}

const serviceApi = new ServiceApi();
export default serviceApi
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
        const url = "/service/"  + service_id;
        return axiosClient.get(url);
     }
     insertService =  (data, image) => {
        const urlService = this.SERVICE_PATH + '/add-service';
        const urlImage = this.SERVICE_PATH + '/add-image?image';
         axiosClient.post(urlImage, image
           ).then((res) => {
            console.log("Image: ", res);
        })
        .then(() => {
            return  axiosClient.post(urlService, data).then((res) => {
                console.log("response: ", res)
            })
        })
       
     }

     disableService = async (id) => {
        const url  = this.SERVICE_PATH + '/delete/' + id;
        return await axiosClient.get(url).then((res) => {
            console.log(res);
        })
     }

}

const serviceApi = new ServiceApi();
export default serviceApi
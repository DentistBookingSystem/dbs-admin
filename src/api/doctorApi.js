import axiosClient from './axiosClient';

class DoctorApi {
    PATH = "/doctor";
    getDoctorList = () => {
        const url = this.PATH + "/list";
        return axiosClient.get(url);
    }
}
const doctorApi = new DoctorApi();
export default doctorApi
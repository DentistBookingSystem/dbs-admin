import axiosClient from './axiosClient';

class DoctorApi {
    PATH = "/doctor";
    getDoctorList = () => {
        const url = this.PATH + "/list";
        return axiosClient.get(url);
    }

    disableDoctor = async (id) => {
        const url = this.PATH + "/delete/" + id;
        return await  axiosClient.get(url).then((res) => {
            console.log("Mess: ", res);
        })
    }
}
const doctorApi = new DoctorApi();
export default doctorApi
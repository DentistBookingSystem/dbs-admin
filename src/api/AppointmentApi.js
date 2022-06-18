import axiosClient from "./axiosClient"
class AppointmentApi{
    getAppointList = () => {
        const url = "/appointment/1";
        return axiosClient.get(url);
    }
}
const appointmentApi = new AppointmentApi();
export default appointmentApi;
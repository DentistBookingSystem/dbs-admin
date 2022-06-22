import axiosClient from "./axiosClient"

class DiscountApi{
    BASE_URL = "/discount"
    getDiscountList = () => {
        const url = this.BASE_URL +"/list";
         return axiosClient.get(url);
    }
    insert = async (data) => {
        const url = this.BASE_URL + "/add";
        return await axiosClient.post(url, data).then((res) => {
            return res;
        })  
    }
}

const discountApi = new DiscountApi();
export default discountApi;
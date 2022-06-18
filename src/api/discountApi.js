import axiosClient from "./axiosClient"

class DiscountApi{
    BASE_URL = "/discount"
    getDiscountList = () => {
        const url = this.BASE_URL +"/list";
         return axiosClient.get(url);
    }
}

const discountApi = new DiscountApi();
export default discountApi;
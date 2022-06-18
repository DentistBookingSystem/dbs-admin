import axiosClient from "./axiosClient";

class BranchApi{
    BASE_URL = "/branch"
    getAll = () => {
        const url = this.BASE_URL + "/list";
        return axiosClient.get(url);
      };
    getBranchById = (id) => {
      const url = '/branch/' + id
      return axiosClient.get(url);
    }
    insert = (formData) => {
      const url = this.BASE_URL + '/add'
      return axiosClient.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then((res)=>{
        return res;
      })
    }
}
const branchApi = new BranchApi();
export default branchApi;

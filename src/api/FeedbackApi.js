import axiosClient from "./axiosClient";

class FeedbackApi {
  getFeedback(data) {
    const url = "/feedback/filter";
    const tmpUrl = axiosClient.getUri().replace("/admin", "/staff") + url;
    return axiosClient.post(tmpUrl, data);
  }

  approveFeedback(id) {
    const url = "/feedback/approve/" + id;
    const tmpUrl = axiosClient.getUri().replace("/admin", "/staff") + url;
    return axiosClient.post(tmpUrl);
  }

  disapproveFeedback(id) {
    const url = "/feedback/disapprove/" + id;
    const tmpUrl = axiosClient.getUri().replace("/admin", "/staff") + url;
    return axiosClient.post(tmpUrl);
  }
}

export default new FeedbackApi();

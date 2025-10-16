import axios from "axios";

const api = axios.create({
  baseURL: "http://ecommerce.reworkstaging.name.ng/v2",
  timeout: 10000, 
});

api.interceptors.request.use(
  (config) => {

    return config; 
  },
  (error) => {
    console.log("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log(
        `🚨 API Error [${error.response.status}]: ${error.response.statusText}`
      );
      alert(`Server Error: ${error.response.statusText}`);
    } else if (error.request) {
      console.log("🌐 Network Error: No response from server");
      alert("Network Error: Please check your internet connection");
    } else {
      console.log("⚠️ Unexpected Error:", error.message);
      alert("Unexpected Error Occurred");
    }

    return Promise.reject(error);
  }
);

export default api;

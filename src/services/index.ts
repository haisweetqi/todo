import axios from "axios";

const apiURL = {
  baseURl: "http://localhost:9000/",
};

const apiConfig = axios.create({
  baseURL: apiURL.baseURl,
  headers: { "Content-Type": "application/json" },
});

apiConfig.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const apiService = {
  post(urlApi: string, params?: any) {
    return apiConfig
      .post(urlApi, params)
      .then((response) => response)
      .catch((error) => error);
  },
  patch(urlApi: string, params?: any) {
    return apiConfig
      .patch(urlApi, params)
      .then((response) => response)
      .catch((error) => error);
  },
  put(urlApi: string, params?: any) {
    return apiConfig
      .put(urlApi, params)
      .then((response) => response)
      .catch((error) => error);
  },
  get(urlApi: string, params?: any) {
    return apiConfig
      .get(urlApi, params)
      .then((response) => response)
      .catch((error) => error);
  },
  delete(urlApi: string) {
    return apiConfig
      .delete(urlApi)
      .then((response) => response)
      .catch((error) => error);
  },
};

export default apiService;

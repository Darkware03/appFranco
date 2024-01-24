import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

export default ({ app, Vue }) => {
  const axiosInstance = axios.create({
    baseURL: 'https://koon-app.com', // Reemplaza con tu URL base
    //baseURL: 'http://127.0.0.1:8002', // Reemplaza con tu URL base
  });
  console.log(axiosInstance);
  const makeRequest = async (url, method, data) => {
    try {
      const token = JSON.parse(localStorage.getItem('access_token')); // Obtén el token almacenado en el almacenamiento local

      if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = "Bearer "+token; // Agrega el token al encabezado de la solicitud
      }

      const response = await axiosInstance({
        method,
        url,
        data,
      });

      return response.data;
    } catch (error) {
      throw new Error(`Error making ${method} request to ${url}: ${error.message}`);
    }
  };

  Vue.prototype.$axios = axiosInstance;
  app.axios = axiosInstance;
  Vue.prototype.$makeRequest = makeRequest;
  app.makeRequest = makeRequest;
};

import axios from 'axios';

const axiosClientLocation = axios.create({
  baseURL: 'https://dev-online-gateway.ghn.vn/shiip/public-api/',
  headers: {
    'Content-type': 'application/json',
  },
});

// Interceptors

axiosClientLocation.interceptors.request.use(
  function (config) {
    config.headers.token = `d7e2ef64-0189-11ec-b5ad-92f02d942f87`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClientLocation.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { config, status, data } = error.response;
    const URLS = ['/user/m/login', '/auth/local'];
    if (URLS.includes(config.url) && status === 401) {
      throw new Error(data.msg);
    }
    console.log('error :', data.msg);
    return Promise.reject(error);
  }
);

export default axiosClientLocation;

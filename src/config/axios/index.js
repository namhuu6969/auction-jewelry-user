import { notification } from 'antd';
import axios from 'axios';
// import { setTokens } from '@/core/store/auth/authenticate';

const api = axios.create({
  baseURL: 'http://167.71.212.203:8080/api/v1/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

const openNotificationWithIcon = (type, title) => {
  notification[type]({
    message: title,
    placement: 'top',
    duration: 5,
  });
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh) {
    throw new Error('No refresh token available');
  }
  const response = await axios.post(
    'http://167.71.212.203:8080/api/v1/user/refresh',
    { refresh }
  );
  const { accessToken } = response.data;
  localStorage.setItem('accessToken', accessToken);
  return accessToken;
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (error) {
        window.location.href = '/login';
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('fullName');
        openNotificationWithIcon('warning', error.message);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
// const refreshTokenAPI = () => {
//   const refreshTokenCurrent = JSON.parse(localStorage.getItem('tokens'))?.refreshToken;
//   return new Promise((resolve, reject) => {
//     axios
//       .post(
//         'http://anataarisa.hopto.org:8080/api/v1/auth/re-token',
//         {},
//         {
//           headers: {
//             token: refreshTokenCurrent,
//           },
//         }
//       )
//       .then((response) => {
//         resolve(response);
//       })
//       .catch((error) => {
//         window.location.href = '/login';
//         localStorage.clear();
//         reject(error);
//       });
//   });
// };

// let refreshTokenPromise = null;

// api.interceptors.request.use(async (config) => {
//   const accessTokenCurrent = JSON.parse(localStorage.getItem('tokens'))?.accessToken;

//   await axios
//     .get('http://anataarisa.hopto.org:8080/api/v1/auth/check-auth', {
//       headers: {
//         Authorization: `Bearer ${accessTokenCurrent}`,
//       },
//     })
//     .then((res) => {
//       console.log('res', res);
//       const ROLE_NAME = localStorage.getItem('roleName');
//       if (res.data || ROLE_NAME !== 'SUPER ADMIN')
//         config.headers.Authorization = `Bearer ${accessTokenCurrent}`;
//       else {
//         window.location.href = '/login';
//         localStorage.clear();
//         return;
//       }
//       refreshTokenPromise = null;
//     })
//     .catch(async () => {
//       refreshTokenPromise = refreshTokenPromise || refreshTokenAPI();
//       const refreshTokenResponse = await refreshTokenPromise;
//       refreshTokenPromise = null;

//       if (refreshTokenResponse) {
//         const { accessToken, refreshToken } = refreshTokenResponse.data;
//         setTokens(accessToken, refreshToken);
//         localStorage.setItem('tokens', JSON.stringify({ accessToken, refreshToken }));
//         config.headers.Authorization = `Bearer ${accessToken}`;
//       }
//     });
//   return config;
// });

export default api;

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clearUserData } from '../../core/store/PersonalStore/personal';
import { clearToken } from '../../core/store/Auth/auth';
// import { setTokens } from '@/core/store/auth/authenticate';

const api = axios.create({
  baseURL: 'http://apijewelryauction.techx.id.vn:8081/api/v1/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

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
    'http://apijewelryauction.techx.id.vn:8081/api/v1/user/refresh',
    { refreshToken: refresh }
  );
  const { accessToken } = response.data.data;
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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('fullName');
        localStorage.removeItem('money');
        // window.location.href = '/login';
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

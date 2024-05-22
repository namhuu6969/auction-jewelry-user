import axios from 'axios';
// import { setTokens } from '@/core/store/auth/authenticate';

const api = axios.create({
  baseURL: 'http://anataarisa.hopto.org:8080/api/v1',
});

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

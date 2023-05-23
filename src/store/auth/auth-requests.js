import axios from "axios";
import { apiLogin, apiMe, apiRegister, apiToken } from "../../constants/api";

export const requestAuthRegister = (data) => {
  return axios.post(apiRegister, {
    ...data,
  });
};

export const requestAuthLogin = (data) => {
  return axios.post(apiLogin, {
    ...data,
  });
};

export const requestAuthFetchMe = (token) => {
  if (!token) return;
  return axios.get(apiMe, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const requestAuthRefreshToken = (token) => {
  if (!token) return;
  console.log(token);
  return axios.post(apiToken, {
    refreshToken: token,
  });
};

// export const requestAuthLogout = (payload) => {
//   return axios.delete("http://localhost:5000/logout", { payload });
// };

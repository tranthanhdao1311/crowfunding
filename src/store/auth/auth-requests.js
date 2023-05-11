import axios from "axios";

export const requestAuthRegister = (data) => {
  return axios.post("http://localhost:5000/auth/register", {
    ...data,
  });
};

export const requestAuthLogin = (data) => {
  return axios.post("http://localhost:5000/auth/login", {
    ...data,
  });
};

export const requestAuthFetchMe = (token) => {
  if (!token) return;
  return axios.get("http://localhost:5000/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const requestAuthRefreshToken = (token) => {
  if (!token) return;
  return axios.post("http://localhost:5000/token", {
    refreshToken: token,
  });
};

// export const requestAuthLogout = (payload) => {
//   return axios.delete("http://localhost:5000/logout", { payload });
// };

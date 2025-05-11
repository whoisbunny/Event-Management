import API from "@/configs/API";
import type { LoginCredentials } from "@/utils/types";

const login = async (data: LoginCredentials) => {
  const res = await API.post(`auth/login`, data);

  if (res.data) {
    localStorage.setItem("TOKEN", res.data.token);
    localStorage.setItem("expiryDate", JSON.stringify(res.data.expiryDate));
  }
  return res.data;
};

const signup = async (data: LoginCredentials) => {
  const res = await API.post(`auth/signup`, data);

  if (res.data) {
    localStorage.setItem("TOKEN", res.data.token);
  }
  return res.data;
};

const logout = async () => {
  const res = await API.get(`auth/logout`);

  if (res.data) {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("USER");
  }
  return res.data;
};
const getProfile = async () => {
  const res = await API.get(`auth/profile`);
  if (res.data) {
    localStorage.setItem("USER", JSON.stringify(res.data));
  }
  return res.data;
};

export { login, signup, logout, getProfile };

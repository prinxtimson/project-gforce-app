/* eslint-disable no-throw-literal */
import axios from "axios";

const API_URL = "/api/users/";

const register = async (userData) => {
  //const res = await axios.post(API_URL, userData);

  const isExist = sessionStorage.getItem(userData.email);

  if (isExist) throw { message: "User alreaady exist." };

  sessionStorage.setItem(userData.email, JSON.stringify(userData));

  if (userData) {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("profile", JSON.stringify({ user: userData }));
  }

  return { user: userData, token: "HH2i93nind0303ndKLsidw2obZh0" };
};

const logout = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("profile");
};

// const login = async (userData) => {
//   const res = await axios.post(API_URL, userData);

//   if (res.data) {
//     localStorage.setItem("user", JSON.stringify(res.data));
//   }

//   return res.data;
// };

const login = async (userData) => {
  const user = JSON.parse(sessionStorage.getItem(userData.email));

  if (!user || user.password !== userData.password) {
    throw {
      message:
        "Sorry, your login is invalid. Please re-enter your details carefully.",
    };
  } else {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("profile", JSON.stringify({ user }));
  }

  return { user, token: "HH2i93nind0303ndKLsidw2obZh0" };
};

const forgotPass = async (email) => {
  const res = await axios.post(API_URL, email);

  return res.data;
};

const resetPass = async (data) => {
  const res = await axios.post(API_URL, data);

  return res.data;
};

const changePass = async (data) => {
  const res = await axios.post(API_URL, data);

  return res.data;
};

const authService = {
  register,
  logout,
  login,
  forgotPass,
  resetPass,
  changePass,
};

export default authService;

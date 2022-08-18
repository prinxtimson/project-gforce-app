import axios from "axios";

const API_URL = "/api/";

const register = async (userData) => {
    const res = await axios.post(API_URL, userData);

    if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
    }

    return res.data;
};

const logout = async () => {
    await axios.get(`/sanctum/csrf-cookie`);
    await axios.post(API_URL + "logout");
    localStorage.removeItem("user");
};

const login = async (userData) => {
    const res = await axios.post(API_URL + "login", userData);

    if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
    }

    return res.data;
};

const forgotPass = async (email) => {
    const res = await axios.post(API_URL + "forgot-password", email);

    return res.data;
};

const verifyCode = async (data) => {
    const res = await axios.post(API_URL + "two-factor-auth", data);

    return res.data;
};

const resendCode = async () => {
    const res = await axios.get(API_URL + "two-factor-auth/resend");

    return res.data;
};

const resetPass = async (data) => {
    const res = await axios.post(API_URL + "reset-password", data);

    return res.data;
};

const changePass = async (data) => {
    const res = await axios.post(API_URL + "change-password", data);

    return res.data;
};

const authService = {
    register,
    logout,
    login,
    forgotPass,
    resetPass,
    verifyCode,
    resendCode,
    changePass,
};

export default authService;

import axios from "axios";

const API_URL = "/api/users";

const getProfile = async () => {
    const res = await axios.get("/api/me");

    return res.data;
};

const updateProfile = async (data) => {
    const res = await axios.put("/api/update", data);

    return res.data;
};

const addNewUser = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateUserProfile = async (data) => {
    const res = await axios.put(`${API_URL}/${data.id}`, data);

    return res.data;
};

const getAllProfile = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getAllProfileByPage = async (page) => {
    const res = await axios.get("/api/users?page=" + page);

    return res.data;
};

const getProfileById = async (id) => {
    const res = await axios.get(API_URL + "/" + id);

    return res.data;
};

const removeProfile = async (id) => {
    const res = await axios.delete(API_URL + "/" + id);

    return res.data;
};

const addCard = async (data) => {
    // let data = {};

    return data;
};

const removeCard = async (data) => {
    //let data = {};

    return data;
};

const productService = {
    getProfile,
    updateProfile,
    addNewUser,
    updateUserProfile,
    getAllProfile,
    removeProfile,
    getProfileById,
    getAllProfileByPage,
    addCard,
    removeCard,
};

export default productService;

import axios from "axios";

const API_URL = "/api/incedent";

const getIncedents = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getIncedentById = async (id) => {
    const res = await axios.get(API_URL + "/" + id);

    return res.data;
};

const getIncedentsByPage = async (page) => {
    const res = await axios.get("/api/incedents?page=" + page);

    return res.data;
};

const saveIncedent = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateIncedent = async (data) => {
    const res = await axios.post(API_URL + "/" + data.id, data);

    return res.data;
};

const removeIncedent = async (id) => {
    const res = await axios.post(API_URL + "/" + id);

    return res.data;
};

const incedentService = {
    getIncedents,
    getIncedentById,
    getIncedentsByPage,
    saveIncedent,
    updateIncedent,
    removeIncedent,
};

export default incedentService;

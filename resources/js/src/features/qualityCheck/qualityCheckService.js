import axios from "axios";

const API_URL = "/api/quality-check";

const getQualityChecks = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getQualityChecksByPage = async (page) => {
    const res = await axios.get("/api/quality-check?page=" + page);

    return res.data;
};

const getQualityCheckById = async (id) => {
    const res = await axios.get(API_URL + "/" + id);

    return res.data;
};

const saveQualityCheck = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateQualityCheck = async (formData) => {
    const res = await axios.post(API_URL + "/" + formData.id, formData.data);

    return res.data;
};

const removeQualityCheck = async (id) => {
    await axios.delete(API_URL + "/" + id);

    return id;
};

const qualityCheckService = {
    getQualityChecks,
    getQualityCheckById,
    getQualityChecksByPage,
    saveQualityCheck,
    updateQualityCheck,
    removeQualityCheck,
};

export default qualityCheckService;

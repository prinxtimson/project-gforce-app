import axios from "axios";

const API_URL = "/api/dispatcher";

const getDispatchers = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getDispatcherByPage = async (page) => {
    const res = await axios.get("/api/dispatcher?page=" + page);

    return res.data;
};

const getDispatcherById = async (id) => {
    const res = await axios.get(API_URL + "/" + id);

    return res.data;
};

const saveDispatcher = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateDispatcher = async (formData) => {
    const res = await axios.post(API_URL + "/" + formData.id, formData);

    return res.data;
};

const removeDispatcher = async (id) => {
    await axios.delete(API_URL + "/" + id);

    return id;
};

const dispatcherService = {
    getDispatchers,
    getDispatcherById,
    getDispatcherByPage,
    saveDispatcher,
    updateDispatcher,
    removeDispatcher,
};

export default dispatcherService;

const axios = window.axios;

const API_URL = "https://blackyrestaurant.herokuapp.com/api/tasks/";

const getTasks = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getTaskById = async (id) => {
    const res = await axios.get(API_URL + id);

    return res.data;
};

const getTasksByPage = async (page) => {
    const res = await axios.get("/api/tasks?page=" + page);

    return res.data;
};

const saveTask = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateTask = async (data) => {
    const res = await axios.post(API_URL + data.id, data);

    return res.data;
};

const removeTask = async (id) => {
    const res = await axios.post(API_URL + id);

    return res.data;
};

const taskService = {
    getTasks,
    getTaskById,
    getTasksByPage,
    saveTask,
    updateTask,
    removeTask,
};

export default taskService;

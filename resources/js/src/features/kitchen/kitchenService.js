const axios = window.axios;

const API_URL = "/api/order/";

const getKitchenOrder = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getKitchenOrderByPage = async (page) => {
    const res = await axios.get("/api/order?page=" + page);

    return res.data;
};

const getKitchenOrderById = async (id) => {
    const res = await axios.get(API_URL + id);

    return res.data;
};

const saveKitchenOrder = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateKitchenOrder = async (data) => {
    const res = await axios.post(API_URL + data.id, data);

    return res.data;
};

const removeKitchenOrder = async (id) => {
    const res = await axios.post(API_URL + id);

    return res.data;
};

const kitchenService = {
    getKitchenOrder,
    getKitchenOrderById,
    getKitchenOrderByPage,
    saveKitchenOrder,
    updateKitchenOrder,
    removeKitchenOrder,
};

export default kitchenService;

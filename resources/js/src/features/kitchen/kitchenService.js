import axios from "axios";

const API_URL = "/api/orders-items";

const getKitchenOrder = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getKitchenOrderByPage = async (page) => {
    const res = await axios.get(`${API_URL}?page=${page}`);

    return res.data;
};

const getKitchenCanceledOrder = async () => {
    const res = await axios.get(API_URL + "/canceled");

    return res.data;
};

const getKitchenOrderById = async (id) => {
    const res = await axios.get(API_URL + "/" + id);

    return res.data;
};

const cancelKitchenOrder = async (id) => {
    const res = await axios.get(`${API_URL}/cancel/${id}`);

    return res.data;
};

const saveKitchenOrder = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateKitchenOrder = async (data) => {
    const res = await axios.put(API_URL + "/" + data.id, data);

    return res.data;
};

const removeKitchenOrder = async (id) => {
    const res = await axios.delete(API_URL + "/" + id);

    return res.data;
};

const kitchenService = {
    getKitchenOrder,
    getKitchenOrderById,
    getKitchenOrderByPage,
    cancelKitchenOrder,
    getKitchenCanceledOrder,
    saveKitchenOrder,
    updateKitchenOrder,
    removeKitchenOrder,
};

export default kitchenService;

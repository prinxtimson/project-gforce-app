import axios from "axios";

const API_URL = "/api/orders";

const getOrders = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getOrderItems = async () => {
    const res = await axios.get("/api/orders-items");

    return res.data;
};

const getOrdersByPage = async (page) => {
    const res = await axios.get("/api/orders?page=" + page);

    return res.data;
};

const getOrderById = async (id) => {
    const res = await axios.get(API_URL + "/" + id);

    return res.data;
};

const saveOrder = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateOrder = async (data) => {
    const res = await axios.put(API_URL + "/" + data.id, data);

    return res.data;
};

const removeOrder = async (id) => {
    const res = await axios.delete(API_URL + "/" + id);

    return res.data;
};

const orderService = {
    getOrders,
    getOrderItems,
    getOrderById,
    getOrdersByPage,
    saveOrder,
    updateOrder,
    removeOrder,
};

export default orderService;

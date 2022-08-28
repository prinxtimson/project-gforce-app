import axios from "axios";

const API_URL = "/api/delivery";

const getDeliveries = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getDeliveriesByPage = async (page) => {
    const res = await axios.get("/api/delivery?page=" + page);

    return res.data;
};

const getDeliveryById = async (id) => {
    const res = await axios.get(API_URL + "/" + id);

    return res.data;
};

const saveDelivery = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateDelivery = async (formData) => {
    const res = await axios.put(API_URL + "/" + formData.id, formData);

    return res.data;
};

const removeDelivery = async (id) => {
    await axios.delete(API_URL + "/" + id);

    return id;
};

const deliveryService = {
    getDeliveries,
    getDeliveryById,
    getDeliveriesByPage,
    saveDelivery,
    updateDelivery,
    removeDelivery,
};

export default deliveryService;

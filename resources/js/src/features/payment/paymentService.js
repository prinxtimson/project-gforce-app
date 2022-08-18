import axios from "axios";

const API_URL = "/api/payments/";

const getPayments = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getPaymentsByPage = async (page) => {
    const res = await axios.get("/api/payments?page=" + page);

    return res.data;
};

const getPaymentById = async (id) => {
    const res = await axios.get(API_URL + id);

    return res.data;
};

const savePayment = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updatePayment = async (data) => {
    const res = await axios.post(API_URL + data.id, data);

    return res.data;
};

const removePayment = async (id) => {
    const res = await axios.post(API_URL + id);

    return res.data;
};

const paymentService = {
    getPayments,
    getPaymentById,
    getPaymentsByPage,
    savePayment,
    updatePayment,
    removePayment,
};

export default paymentService;

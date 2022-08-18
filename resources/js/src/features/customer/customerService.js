import axios from "axios";

const API_URL = "/api/customers/";

const getCustomers = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getCustomersByPage = async (page) => {
    const res = await axios.get("/api/customers?page=" + page);

    return res.data;
};

const getCustomerById = async (id) => {
    const res = await axios.get(API_URL + id);

    return res.data;
};

const saveCustomer = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateCustomer = async (data) => {
    const res = await axios.post(API_URL + data.id, data);

    return res.data;
};

const removeCustomer = async (id) => {
    const res = await axios.post(API_URL + id);

    return res.data;
};

const customerService = {
    getCustomers,
    getCustomerById,
    getCustomersByPage,
    saveCustomer,
    updateCustomer,
    removeCustomer,
};

export default customerService;

import axios from "axios";

const API_URL = "/api/customers";

const getCustomers = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getCustomersByPage = async (page) => {
    const res = await axios.get("/api/customers?page=" + page);

    return res.data;
};

const getActiveCustomers = async () => {
    const res = await axios.get(API_URL + "/active");

    return res.data;
};

const getActiveCustomersByPage = async (page) => {
    const res = await axios.get("/api/customers/active?page=" + page);

    return res.data;
};

const getCustomersBirthday = async () => {
    const res = await axios.get(API_URL + "/birthday");

    return res.data;
};

const getCustomersBirthdayByPage = async (page) => {
    const res = await axios.get("/api/customers/birthday?page=" + page);

    return res.data;
};

const getCustomerById = async (id) => {
    const res = await axios.get(API_URL + "/" + id);

    return res.data;
};

const saveCustomer = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateCustomer = async (data) => {
    const res = await axios.put(API_URL + "/" + data.id, data);

    return res.data;
};

const removeCustomer = async (id) => {
    const res = await axios.delete(API_URL + "/" + id);

    return res.data;
};

const customerService = {
    getCustomers,
    getCustomerById,
    getCustomersBirthday,
    getActiveCustomers,
    getCustomersBirthdayByPage,
    getActiveCustomersByPage,
    getCustomersByPage,
    saveCustomer,
    updateCustomer,
    removeCustomer,
};

export default customerService;

import axios from "axios";

const API_URL = "/api/category";

const getCategories = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const saveCategory = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateCategory = async (data) => {
    const res = await axios.put(API_URL + "/" + data.id, data);

    return res.data;
};

const productService = {
    updateCategory,
    saveCategory,
    getCategories,
};

export default productService;

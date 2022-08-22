import axios from "axios";

const API_URL = "/api/products";

const getProducts = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getProductsByPage = async (page) => {
    const res = await axios.get("/api/products?page=" + page);

    return res.data;
};

const getProductById = async (id) => {
    const res = await axios.get(API_URL + "/" + id);

    return res.data;
};

const saveProduct = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateProduct = async (formData) => {
    const res = await axios.post(API_URL + "/" + formData.id, formData.data);

    return res.data;
};

const removeProduct = async (id) => {
    await axios.delete(API_URL + "/" + id);

    return id;
};

const productService = {
    getProducts,
    getProductById,
    getProductsByPage,
    saveProduct,
    updateProduct,
    removeProduct,
};

export default productService;

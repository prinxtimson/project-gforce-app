import axios from "axios";

const API_URL = "/api/inventory";

const getInventories = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getInventoriesByPage = async (page) => {
    const res = await axios.get("/api/inventory?page=" + page);

    return res.data;
};

const getInventoryById = async (id) => {
    const res = await axios.get(API_URL + "/" + id);

    return res.data;
};

const saveInventory = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateInventory = async (formData) => {
    const res = await axios.put(API_URL + "/" + formData.id, formData);

    return res.data;
};

const removeInventory = async (id) => {
    await axios.delete(API_URL + "/" + id);

    return id;
};

const inventoryService = {
    getInventories,
    getInventoryById,
    getInventoriesByPage,
    saveInventory,
    updateInventory,
    removeInventory,
};

export default inventoryService;

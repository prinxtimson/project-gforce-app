import axios from "axios";

const API_URL = "/api/complaint";

const getComplaints = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getComplaintsByPage = async (page) => {
    const res = await axios.get("/api/complaint?page=" + page);

    return res.data;
};

const getComplaintById = async (id) => {
    const res = await axios.get(API_URL + "/" + id);

    return res.data;
};

const saveComplaint = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateComplaint = async (formData) => {
    const res = await axios.post(API_URL + "/" + formData.id, formData.data);

    return res.data;
};

const removeComplaint = async (id) => {
    await axios.delete(API_URL + "/" + id);

    return id;
};

const complaintService = {
    getComplaints,
    getComplaintById,
    getComplaintsByPage,
    saveComplaint,
    updateComplaint,
    removeComplaint,
};

export default complaintService;

import axios from "axios";

const API_URL = "/api/reports";

const getReports = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getReportsByPage = async (page) => {
    const res = await axios.get("/api/reports?page=" + page);

    return res.data;
};

const getReportById = async (id) => {
    const res = await axios.get(API_URL + "/" + id);

    return res.data;
};

const saveReport = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateReport = async (data) => {
    const res = await axios.post(API_URL + "/" + data.id, data);

    return res.data;
};

const removeReport = async (id) => {
    const res = await axios.post(API_URL + "/" + id);

    return res.data;
};

const reportService = {
    getReports,
    getReportById,
    getReportsByPage,
    saveReport,
    updateReport,
    removeReport,
};

export default reportService;

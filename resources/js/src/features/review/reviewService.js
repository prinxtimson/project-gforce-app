import axios from "axios";

const API_URL = "/api/review";

const getReviews = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getReviewById = async (id) => {
    const res = await axios.get(API_URL + "/" + id);

    return res.data;
};

const getReviewsByPage = async (page) => {
    const res = await axios.get("/api/review?page=" + page);

    return res.data;
};

const saveReview = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateReview = async (data) => {
    const res = await axios.put(API_URL + "/" + data.id, data);

    return res.data;
};

const removeReview = async (id) => {
    const res = await axios.delete(API_URL + "/" + id);

    return res.data;
};

const reviewService = {
    getReviews,
    getReviewById,
    getReviewsByPage,
    saveReview,
    updateReview,
    removeReview,
};

export default reviewService;

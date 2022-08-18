const axios = window.axios;

const API_URL = "/api/reviews/";

const getReviews = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getReviewById = async (id) => {
    const res = await axios.get(API_URL + id);

    return res.data;
};

const getReviewsByPage = async (page) => {
    const res = await axios.get("/api/reviews?page=" + page);

    return res.data;
};

const saveReview = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateReview = async (data) => {
    const res = await axios.post(API_URL + data.id, data);

    return res.data;
};

const removeReview = async (id) => {
    const res = await axios.post(API_URL + id);

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

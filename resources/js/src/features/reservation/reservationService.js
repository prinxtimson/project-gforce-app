import axios from "axios";

const API_URL = "/api/reservation";

const getReservations = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getReservationsByPage = async (page) => {
    const res = await axios.get("/api/reservation?page=" + page);

    return res.data;
};

const getReservationById = async (id) => {
    const res = await axios.get(API_URL + "/" + id);

    return res.data;
};

const saveReservation = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const updateReservation = async (formData) => {
    const res = await axios.post(API_URL + "/" + formData.id, formData.data);

    return res.data;
};

const removeReservation = async (id) => {
    await axios.delete(API_URL + "/" + id);

    return id;
};

const reservationService = {
    getReservations,
    getReservationById,
    getReservationsByPage,
    saveReservation,
    updateReservation,
    removeReservation,
};

export default reservationService;

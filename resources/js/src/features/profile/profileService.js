/* eslint-disable no-throw-literal */
// import axios from "axios";

// const API_URL = "/api/users/";

const getProfile = async () => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  if (!profile) {
    throw {
      message: "Profile not found.",
    };
  }

  return profile;
};

const updateProfile = async (data) => {
  let profile = JSON.parse(localStorage.getItem("profile"));
  profile = { ...profile, user: data };

  localStorage.setItem("profile", JSON.stringify(profile));
  sessionStorage.setItem(data.email, JSON.stringify(data));

  return profile;
};

const addCard = async (data) => {
  // let data = {};

  return data;
};

const removeCard = async (data) => {
  //let data = {};

  return data;
};

const productService = {
  getProfile,
  updateProfile,
  addCard,
  removeCard,
};

export default productService;

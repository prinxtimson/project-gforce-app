import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";

const initialState = {
    profile: null,
    profiles: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getProfile = createAsyncThunk("profile/get", async (thunkAPI) => {
    try {
        return await profileService.getProfile();
    } catch (err) {
        const msg =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

        return thunkAPI.rejectWithValue(msg);
    }
});

export const updateProfile = createAsyncThunk(
    "profile/update",
    async (data, thunkAPI) => {
        try {
            return await profileService.updateProfile(data);
        } catch (err) {
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const addNewUser = createAsyncThunk(
    "profile/add-user",
    async (data, thunkAPI) => {
        try {
            return await profileService.addNewUser(data);
        } catch (err) {
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            console.log(err);

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const getAllProfile = createAsyncThunk(
    "profile/all",
    async (thunkAPI) => {
        try {
            return await profileService.getAllProfile();
        } catch (err) {
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const getAllProfileByPage = createAsyncThunk(
    "profile/all-by-page",
    async (page, thunkAPI) => {
        try {
            return await profileService.getAllProfileByPage(page);
        } catch (err) {
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const getProfileById = createAsyncThunk(
    "profile/get-by-id",
    async (id, thunkAPI) => {
        try {
            return await profileService.getProfileById(id);
        } catch (err) {
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const addCard = createAsyncThunk(
    "profile/add-card",
    async (data, thunkAPI) => {
        try {
            return await profileService.addCard(data);
        } catch (err) {
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const removeCard = createAsyncThunk(
    "profile/remove-card",
    async (data, thunkAPI) => {
        try {
            return await profileService.removeCard(data);
        } catch (err) {
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.profile = null;
            state.profiles = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.profile = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getProfileById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProfileById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(getProfileById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profiles = action.payload;
            })
            .addCase(getAllProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllProfileByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProfileByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profiles = action.payload;
            })
            .addCase(getAllProfileByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addNewUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "Staff had been added.";
            })
            .addCase(addNewUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addCard.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(addCard.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeCard.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeCard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(removeCard.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = profileSlice.actions;
export default profileSlice.reducer;

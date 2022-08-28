import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reservationService from "./reservationService";

const initialState = {
    reservations: null,
    reservation: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getReservations = createAsyncThunk(
    "reservation/get",
    async (thunkAPI) => {
        try {
            return await reservationService.getReservations();
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

export const getReservationsByPage = createAsyncThunk(
    "reservation/by-page",
    async (page, thunkAPI) => {
        try {
            return await reservationService.getReservationsByPage(page);
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

export const getReservationById = createAsyncThunk(
    "reservation/get-single-reservation",
    async (id, thunkAPI) => {
        try {
            return await reservationService.getReservationById(id);
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

export const approveReservation = createAsyncThunk(
    "reservation/approve-reservation",
    async (id, thunkAPI) => {
        try {
            return await reservationService.approveReservation(id);
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

export const disapproveReservation = createAsyncThunk(
    "reservation/disapprove-reservation",
    async (id, thunkAPI) => {
        try {
            return await reservationService.disapproveReservation(id);
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

export const saveReservation = createAsyncThunk(
    "reservation/add",
    async (data, thunkAPI) => {
        try {
            return await reservationService.saveReservation(data);
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

export const updateReservation = createAsyncThunk(
    "reservation/update",
    async (data, thunkAPI) => {
        try {
            return await reservationService.updateReservation(data);
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

export const removeReservation = createAsyncThunk(
    "reservation/remove",
    async (id, thunkAPI) => {
        try {
            await reservationService.removeReservation(id);

            return id;
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

export const reservationSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.reservations = null;
            state.reservation = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReservationById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReservationById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reservation = action.payload;
            })
            .addCase(getReservationById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getReservations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReservations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reservations = action.payload;
            })
            .addCase(getReservations.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(approveReservation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(approveReservation.fulfilled, (state, action) => {
                state.isLoading = false;
                const ind = state.reservations.data.findIndex(
                    (val) => val.id === action.payload.id
                );
                state.reservations.data.splice(ind, 1, action.payload);
                state.reservations = { ...state.reservations };
            })
            .addCase(approveReservation.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(disapproveReservation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(disapproveReservation.fulfilled, (state, action) => {
                state.isLoading = false;
                const ind = state.reservations.data.findIndex(
                    (val) => val.id === action.payload.id
                );
                state.reservations.data.splice(ind, 1, action.payload);
                state.reservations = { ...state.reservations };
            })
            .addCase(disapproveReservation.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getReservationsByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReservationsByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reservations = action.payload;
            })
            .addCase(getReservationsByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(saveReservation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveReservation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "reservation had been added";
                //state.reservation = action.payload;
            })
            .addCase(saveReservation.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateReservation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateReservation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "reservation had been updated";
                state.reservation = action.payload;
            })
            .addCase(updateReservation.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeReservation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeReservation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "reservation deleted";
                const newreservations = state.reservations.data.filter(
                    (prod) => prod.id !== action.payload
                );
                state.reservations = {
                    ...state.reservations,
                    data: newreservations,
                };
            })
            .addCase(removeReservation.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = reservationSlice.actions;
export default reservationSlice.reducer;

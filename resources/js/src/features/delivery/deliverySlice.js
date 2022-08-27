import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import deliveryService from "./deliveryService";

const initialState = {
    deliveries: null,
    delivery: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getDeliveries = createAsyncThunk(
    "delivery/get",
    async (thunkAPI) => {
        try {
            return await deliveryService.getDeliveries();
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

export const getDeliveriesByPage = createAsyncThunk(
    "delivery/by-page",
    async (page, thunkAPI) => {
        try {
            return await deliveryService.getDeliveriesByPage(page);
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

export const getDeliveryById = createAsyncThunk(
    "delivery/get-single-delivery",
    async (id, thunkAPI) => {
        try {
            return await deliveryService.getDeliveryById(id);
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

export const saveDelivery = createAsyncThunk(
    "delivery/add",
    async (data, thunkAPI) => {
        try {
            return await deliveryService.saveDelivery(data);
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

export const updateDelivery = createAsyncThunk(
    "delivery/update",
    async (data, thunkAPI) => {
        try {
            return await deliveryService.updateDelivery(data);
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

export const removeDelivery = createAsyncThunk(
    "delivery/remove",
    async (id, thunkAPI) => {
        try {
            await deliveryService.removeDelivery(id);

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

export const deliverySlice = createSlice({
    name: "delivery",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.deliveries = null;
            state.delivery = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDeliveryById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDeliveryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.delivery = action.payload;
            })
            .addCase(getDeliveryById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getDeliveries.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDeliveries.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deliverys = action.payload;
            })
            .addCase(getDeliveries.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getDeliveriesByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDeliveriesByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deliverys = action.payload;
            })
            .addCase(getDeliveriesByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(saveDelivery.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveDelivery.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "delivery had been added";
                //state.delivery = action.payload;
            })
            .addCase(saveDelivery.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateDelivery.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateDelivery.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "delivery had been updated";
                state.delivery = action.payload;
            })
            .addCase(updateDelivery.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeDelivery.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeDelivery.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "delivery deleted";
                const newdeliverys = state.deliveries.data.filter(
                    (prod) => prod.id !== action.payload
                );
                state.deliveries = {
                    ...state.deliveries,
                    data: newdeliverys,
                };
            })
            .addCase(removeDelivery.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = deliverySlice.actions;
export default deliverySlice.reducer;

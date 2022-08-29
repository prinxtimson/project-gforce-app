import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import kitchenService from "./kitchenService";

const initialState = {
    orders: null,
    order: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getKitchenOrder = createAsyncThunk(
    "kitchen/get",
    async (thunkAPI) => {
        try {
            return await kitchenService.getKitchenOrder();
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

export const getKitchenOrderByPage = createAsyncThunk(
    "kitchen/by-page",
    async (page, thunkAPI) => {
        try {
            return await kitchenService.getKitchenOrderByPage(page);
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

export const getKitchenCanceledOrder = createAsyncThunk(
    "kitchen/canceled-order",
    async (id, thunkAPI) => {
        try {
            return await kitchenService.getKitchenCanceledOrder(id);
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

export const cancelKitchenOrder = createAsyncThunk(
    "kitchen/cancel-order",
    async (id, thunkAPI) => {
        try {
            return await kitchenService.cancelKitchenOrder(id);
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

export const getKitchenOrderById = createAsyncThunk(
    "kitchen/get-order-by-id",
    async (id, thunkAPI) => {
        try {
            return await kitchenService.getKitchenOrderById(id);
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

export const saveKitchenOrder = createAsyncThunk(
    "kitchen/add-order",
    async (data, thunkAPI) => {
        try {
            return await kitchenService.saveKitchenOrder(data);
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

export const updateKitchenOrder = createAsyncThunk(
    "kitchen/update-order",
    async (data, thunkAPI) => {
        try {
            return await kitchenService.updateKitchenOrder(data);
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

export const removeKitchenOrder = createAsyncThunk(
    "kitchen/remove-order",
    async (id, thunkAPI) => {
        try {
            await kitchenService.removeKitchenOrder(id);

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

export const kitchenSlice = createSlice({
    name: "kitchen",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.orders = null;
            state.order = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getKitchenOrderById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getKitchenOrderById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.order = action.payload;
            })
            .addCase(getKitchenOrderById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getKitchenOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getKitchenOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
            })
            .addCase(getKitchenOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(cancelKitchenOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(cancelKitchenOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                const ind = state.orders.data.findIndex(
                    (val) => val.id === action.payload.id
                );
                state.orders.data.splice(ind, 1, action.payload);
                state.orders = { ...state.orders };
            })
            .addCase(cancelKitchenOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getKitchenCanceledOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getKitchenCanceledOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
            })
            .addCase(getKitchenCanceledOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getKitchenOrderByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getKitchenOrderByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
            })
            .addCase(getKitchenOrderByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(saveKitchenOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveKitchenOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.order = action.payload;
            })
            .addCase(saveKitchenOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateKitchenOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateKitchenOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.order = action.payload;
            })
            .addCase(updateKitchenOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeKitchenOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeKitchenOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const newOrders = state.orders.data.filter(
                    (prod) => prod.id !== action.payload
                );
                state.orders = { ...newOrders };
            })
            .addCase(removeKitchenOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = kitchenSlice.actions;
export default kitchenSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
    orders: null,
    order: null,
    status: [],
    orderItems: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getOrders = createAsyncThunk("order/get", async (thunkAPI) => {
    try {
        return await orderService.getOrders();
    } catch (err) {
        const msg =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

        return thunkAPI.rejectWithValue(msg);
    }
});

export const getStatus = createAsyncThunk("order/status", async (thunkAPI) => {
    try {
        return await orderService.getStatus();
    } catch (err) {
        const msg =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

        return thunkAPI.rejectWithValue(msg);
    }
});

export const getOrderItems = createAsyncThunk(
    "order/items",
    async (thunkAPI) => {
        try {
            return await orderService.getOrderItems();
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

export const getOrdersByPage = createAsyncThunk(
    "order/by-page",
    async (page, thunkAPI) => {
        try {
            return await orderService.getOrdersByPage(page);
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

export const getOrderById = createAsyncThunk(
    "order/get-single-order",
    async (id, thunkAPI) => {
        try {
            return await orderService.getOrderById(id);
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

export const cancelOrder = createAsyncThunk(
    "order/cancel-order",
    async (id, thunkAPI) => {
        try {
            return await orderService.cancelOrder(id);
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

export const saveOrder = createAsyncThunk(
    "order/add-order",
    async (data, thunkAPI) => {
        try {
            return await orderService.saveOrder(data);
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

export const updateOrder = createAsyncThunk(
    "order/update-order",
    async (data, thunkAPI) => {
        try {
            return await orderService.updateOrder(data);
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

export const removeOrder = createAsyncThunk(
    "order/remove-order",
    async (id, thunkAPI) => {
        try {
            await orderService.removeOrder(id);

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

export const orderSlice = createSlice({
    name: "order",
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
            .addCase(getOrderById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.order = action.payload;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload;
            })
            .addCase(getStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getOrderItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderItems = action.payload;
            })
            .addCase(getOrderItems.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getOrdersByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrdersByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
            })
            .addCase(getOrdersByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(saveOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "Order had been added";
                state.order = action.payload;
            })
            .addCase(saveOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(cancelOrder.pending, (state) => {
                //state.isLoading = true;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                //state.isLoading = false;
                state.isSuccess = true;
                state.message = "Order had been cancel";
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action.payload;
                const ind = state.orders.data.findIndex(
                    (val) => val.id === action.payload.id
                );

                state.orders.data.splice(ind, 1, action.payload);
                state.orders = { ...state.orders };
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const neworders = state.orders.data.filter(
                    (prod) => prod.id !== action.payload
                );
                state.orders = { ...state.orders, data: [...neworders] };
            })
            .addCase(removeOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = orderSlice.actions;
export default orderSlice.reducer;

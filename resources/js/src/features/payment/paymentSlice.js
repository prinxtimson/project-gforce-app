import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentService from "./paymentService";

const initialState = {
    payments: null,
    payment: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getPayments = createAsyncThunk("payment/get", async (thunkAPI) => {
    try {
        return await paymentService.getPayments();
    } catch (err) {
        const msg =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

        return thunkAPI.rejectWithValue(msg);
    }
});

export const getPaymentsByPage = createAsyncThunk(
    "payment/by-page",
    async (page, thunkAPI) => {
        try {
            return await paymentService.getPaymentsByPage(page);
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

export const getPaymentById = createAsyncThunk(
    "payment/get-single-payment",
    async (id, thunkAPI) => {
        try {
            return await paymentService.getPaymentById(id);
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

export const savePayment = createAsyncThunk(
    "payment/add-payment",
    async (data, thunkAPI) => {
        try {
            return await paymentService.savePayment(data);
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

export const updatePayment = createAsyncThunk(
    "payment/update-payment",
    async (data, thunkAPI) => {
        try {
            return await paymentService.updatePayment(data);
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

export const removePayment = createAsyncThunk(
    "payment/remove-payment",
    async (id, thunkAPI) => {
        try {
            await paymentService.removePayment(id);

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

export const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.payments = null;
            state.payment = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPaymentById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPaymentById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.payment = action.payload;
            })
            .addCase(getPaymentById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getPayments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPayments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.payments = action.payload;
            })
            .addCase(getPayments.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getPaymentsByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPaymentsByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.payments = action.payload;
            })
            .addCase(getPaymentsByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(savePayment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(savePayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.payment = action.payload;
            })
            .addCase(savePayment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updatePayment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.payment = action.payload;
            })
            .addCase(updatePayment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removePayment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removePayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const newPayments = state.payments.data.filter(
                    (val) => val.id !== action.payload
                );
                state.payments = { ...state.payments, data: [...newPayments] };
            })
            .addCase(removePayment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = paymentSlice.actions;
export default paymentSlice.reducer;

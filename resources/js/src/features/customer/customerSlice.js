import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";

const initialState = {
    customers: null,
    customer: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getCustomers = createAsyncThunk(
    "customer/get",
    async (thunkAPI) => {
        try {
            return await customerService.getCustomers();
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

export const getCustomersByPage = createAsyncThunk(
    "customer/by-page",
    async (page, thunkAPI) => {
        try {
            return await customerService.getCustomersByPage(page);
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

export const getCustomerById = createAsyncThunk(
    "customer/get-single-customer",
    async (id, thunkAPI) => {
        try {
            return await customerService.getCustomerById(id);
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

export const saveCustomer = createAsyncThunk(
    "customer/add-customer",
    async (data, thunkAPI) => {
        try {
            return await customerService.saveCustomer(data);
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

export const updateCustomer = createAsyncThunk(
    "customer/update-customer",
    async (data, thunkAPI) => {
        try {
            return await customerService.updateCustomer(data);
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

export const removeCustomer = createAsyncThunk(
    "customer/remove-customer",
    async (id, thunkAPI) => {
        try {
            await customerService.removeCustomer(id);

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

export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.customers = null;
            state.customer = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomerById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCustomerById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.customer = action.payload;
            })
            .addCase(getCustomerById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCustomers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCustomers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.customers = action.payload;
            })
            .addCase(getCustomers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCustomersByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCustomersByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.customers = action.payload;
            })
            .addCase(getCustomersByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(saveCustomer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.customer = action.payload;
            })
            .addCase(saveCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateCustomer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.customer = action.payload;
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeCustomer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const newCustomers = state.customers.data.filter(
                    (prod) => prod.id !== action.payload
                );
                state.customers = { ...newCustomers };
            })
            .addCase(removeCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = customerSlice.actions;
export default customerSlice.reducer;

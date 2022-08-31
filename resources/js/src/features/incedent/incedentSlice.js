import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import incedentService from "./incedentService";

const initialState = {
    incedents: null,
    incedent: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getIncedents = createAsyncThunk(
    "incedent/get",
    async (thunkAPI) => {
        try {
            return await incedentService.getIncedents();
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

export const getIncedentsByPage = createAsyncThunk(
    "incedent/by-page",
    async (page, thunkAPI) => {
        try {
            return await incedentService.getIncedentsByPage(page);
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

export const getIncedentById = createAsyncThunk(
    "incedent/get-single-incedent",
    async (id, thunkAPI) => {
        try {
            return await incedentService.getIncedentById(id);
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

export const saveIncedent = createAsyncThunk(
    "incedent/add-incedent",
    async (data, thunkAPI) => {
        try {
            return await incedentService.saveIncedent(data);
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

export const updateIncedent = createAsyncThunk(
    "incedent/update-incedent",
    async (data, thunkAPI) => {
        try {
            return await incedentService.updateIncedent(data);
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

export const removeIncedent = createAsyncThunk(
    "incedent/remove-incedent",
    async (id, thunkAPI) => {
        try {
            await incedentService.removeIncedent(id);

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

export const incedentSlice = createSlice({
    name: "incedent",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.incedents = null;
            state.incedent = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIncedentById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getIncedentById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.incedent = action.payload;
            })
            .addCase(getIncedentById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getIncedents.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getIncedents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.incedents = action.payload;
            })
            .addCase(getIncedents.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getIncedentsByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getIncedentsByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getIncedentsByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(saveIncedent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveIncedent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.incedent = action.payload;
            })
            .addCase(saveIncedent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateIncedent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateIncedent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.incedent = action.payload;
            })
            .addCase(updateIncedent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeIncedent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeIncedent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const newincedents = state.incedents.data.filter(
                    (prod) => prod.id !== action.payload
                );
                state.incedents = {
                    ...state.incedents,
                    data: [...newincedents],
                };
            })
            .addCase(removeIncedent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = incedentSlice.actions;
export default incedentSlice.reducer;

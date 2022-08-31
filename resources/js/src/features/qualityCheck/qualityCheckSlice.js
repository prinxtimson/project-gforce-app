import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import qualityCheckService from "./qualityCheckService";

const initialState = {
    checks: null,
    check: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getQualityChecks = createAsyncThunk(
    "check/get",
    async (thunkAPI) => {
        try {
            return await qualityCheckService.getQualityChecks();
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

export const getQualityChecksByPage = createAsyncThunk(
    "check/by-page",
    async (page, thunkAPI) => {
        try {
            return await qualityCheckService.getQualityChecksByPage(page);
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

export const getQualityCheckById = createAsyncThunk(
    "check/get-single-check",
    async (id, thunkAPI) => {
        try {
            return await qualityCheckService.getQualityCheckById(id);
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

export const saveQualityCheck = createAsyncThunk(
    "check/add",
    async (data, thunkAPI) => {
        try {
            return await qualityCheckService.saveQualityCheck(data);
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

export const updateQualityCheck = createAsyncThunk(
    "check/update",
    async (data, thunkAPI) => {
        try {
            return await qualityCheckService.updateQualityCheck(data);
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

export const removeQualityCheck = createAsyncThunk(
    "check/remove",
    async (id, thunkAPI) => {
        try {
            await qualityCheckService.removeQualityCheck(id);

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

export const qualityCheckSlice = createSlice({
    name: "check",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.QualityCheck = null;
            state.check = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQualityCheckById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getQualityCheckById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.check = action.payload;
            })
            .addCase(getQualityCheckById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getQualityChecks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getQualityChecks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.checks = action.payload;
            })
            .addCase(getQualityChecks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getQualityChecksByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getQualityChecksByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.checks = action.payload;
            })
            .addCase(getQualityChecksByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(saveQualityCheck.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveQualityCheck.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "check had been added";
                //state.check = action.payload;
            })
            .addCase(saveQualityCheck.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateQualityCheck.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateQualityCheck.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "check had been updated";
                state.check = action.payload;
            })
            .addCase(updateQualityCheck.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeQualityCheck.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeQualityCheck.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "check deleted";
                const newchecks = state.checks.data.filter(
                    (val) => val.id !== action.payload
                );
                state.checks = {
                    ...state.checks,
                    data: newchecks,
                };
            })
            .addCase(removeQualityCheck.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = qualityCheckSlice.actions;
export default qualityCheckSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportService from "./reportService";

const initialState = {
    reports: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getReports = createAsyncThunk("report/get", async (thunkAPI) => {
    try {
        return await reportService.getReports();
    } catch (err) {
        const msg =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

        return thunkAPI.rejectWithValue(msg);
    }
});

export const getReportsByPage = createAsyncThunk(
    "report/by-page",
    async (page, thunkAPI) => {
        try {
            return await reportService.getReportsByPage(page);
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

// export const updateOrder = createAsyncThunk(
//     "report/update-order",
//     async (data, thunkAPI) => {
//         try {
//             return await reportService.updateOrder(data);
//         } catch (err) {
//             const msg =
//                 (err.response &&
//                     err.response.data &&
//                     err.response.data.message) ||
//                 err.message ||
//                 err.toString();

//             return thunkAPI.rejectWithValue(msg);
//         }
//     }
// );

export const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.reports = {};
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReports.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReports.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.reports = action.payload;
            })
            .addCase(getReports.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getReportsByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReportsByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.reports = action.payload;
            })
            .addCase(getReportsByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = reportSlice.actions;
export default reportSlice.reducer;

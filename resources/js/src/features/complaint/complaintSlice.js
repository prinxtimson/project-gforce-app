import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import complaintService from "./complaintService";

const initialState = {
    complaints: null,
    complaint: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getComplaints = createAsyncThunk(
    "complaint/get",
    async (thunkAPI) => {
        try {
            return await complaintService.getComplaints();
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

export const getComplaintsByPage = createAsyncThunk(
    "complaint/by-page",
    async (page, thunkAPI) => {
        try {
            return await complaintService.getComplaintsByPage(page);
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

export const getComplaintById = createAsyncThunk(
    "complaint/get-single-complaint",
    async (id, thunkAPI) => {
        try {
            return await complaintService.getComplaintById(id);
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

export const saveComplaint = createAsyncThunk(
    "complaint/add",
    async (data, thunkAPI) => {
        try {
            return await complaintService.saveComplaint(data);
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

export const updateComplaint = createAsyncThunk(
    "complaint/update",
    async (data, thunkAPI) => {
        try {
            return await complaintService.updateComplaint(data);
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

export const removeComplaint = createAsyncThunk(
    "complaint/remove",
    async (id, thunkAPI) => {
        try {
            await complaintService.removeComplaint(id);

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

export const complaintSlice = createSlice({
    name: "complaint",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.complaints = null;
            state.complaint = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getComplaintById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getComplaintById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.complaint = action.payload;
            })
            .addCase(getComplaintById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getComplaints.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getComplaints.fulfilled, (state, action) => {
                state.isLoading = false;
                state.complaints = action.payload;
            })
            .addCase(getComplaints.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getComplaintsByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getComplaintsByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.complaints = action.payload;
            })
            .addCase(getComplaintsByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(saveComplaint.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveComplaint.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "complaint had been added";
                //state.complaint = action.payload;
            })
            .addCase(saveComplaint.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateComplaint.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateComplaint.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "complaint had been updated";
                state.complaint = action.payload;
            })
            .addCase(updateComplaint.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeComplaint.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeComplaint.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "complaint deleted";
                const newcomplaints = state.complaints.data.filter(
                    (prod) => prod.id !== action.payload
                );
                state.complaints = {
                    ...state.complaints,
                    data: newcomplaints,
                };
            })
            .addCase(removeComplaint.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = complaintSlice.actions;
export default complaintSlice.reducer;

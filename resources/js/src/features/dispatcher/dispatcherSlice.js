import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dispatcherService from "./dispatcherService";

const initialState = {
    dispatchers: null,
    dispatcher: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getDispatchers = createAsyncThunk(
    "dispatcher/get",
    async (thunkAPI) => {
        try {
            return await dispatcherService.getDispatchers();
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

export const searchDispatchers = createAsyncThunk(
    "dispatcher/search",
    async (query, thunkAPI) => {
        try {
            return await dispatcherService.searchDispatchers(query);
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

export const getDispatchersByPage = createAsyncThunk(
    "dispatcher/by-page",
    async (page, thunkAPI) => {
        try {
            return await dispatcherService.getDispatchersByPage(page);
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

export const getDispatcherById = createAsyncThunk(
    "dispatcher/get-single-dispatcher",
    async (id, thunkAPI) => {
        try {
            return await dispatcherService.getDispatcherById(id);
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

export const saveDispatcher = createAsyncThunk(
    "dispatcher/add",
    async (data, thunkAPI) => {
        try {
            return await dispatcherService.saveDispatcher(data);
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

export const updateDispatcher = createAsyncThunk(
    "dispatcher/update",
    async (data, thunkAPI) => {
        try {
            return await dispatcherService.updateDispatcher(data);
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

export const removeDispatcher = createAsyncThunk(
    "dispatcher/remove",
    async (id, thunkAPI) => {
        try {
            await dispatcherService.removeDispatcher(id);

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

export const dispatcherSlice = createSlice({
    name: "dispatcher",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.dispatchers = null;
            state.dispatcher = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDispatcherById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDispatcherById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dispatcher = action.payload;
            })
            .addCase(getDispatcherById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getDispatchers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDispatchers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dispatchers = action.payload;
            })
            .addCase(getDispatchers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(searchDispatchers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchDispatchers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dispatchers = {
                    ...state.dispatchers,
                    data: action.payload,
                };
            })
            .addCase(searchDispatchers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getDispatchersByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDispatchersByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dispatchers = action.payload;
            })
            .addCase(getDispatchersByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(saveDispatcher.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveDispatcher.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "dispatcher had been added";
                //state.dispatcher = action.payload;
            })
            .addCase(saveDispatcher.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateDispatcher.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateDispatcher.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "dispatcher had been updated";
                state.dispatcher = action.payload;
            })
            .addCase(updateDispatcher.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeDispatcher.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeDispatcher.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "dispatcher deleted";
                const newdispatchers = state.dispatchers.data.filter(
                    (prod) => prod.id !== action.payload
                );
                state.dispatchers = {
                    ...state.dispatchers,
                    data: newdispatchers,
                };
            })
            .addCase(removeDispatcher.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = dispatcherSlice.actions;
export default dispatcherSlice.reducer;

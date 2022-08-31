import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
    tasks: null,
    task: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getTasks = createAsyncThunk("task/get", async (thunkAPI) => {
    try {
        return await taskService.getTasks();
    } catch (err) {
        const msg =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

        return thunkAPI.rejectWithValue(msg);
    }
});

export const getTasksByPage = createAsyncThunk(
    "task/by-page",
    async (page, thunkAPI) => {
        try {
            return await taskService.getTasksByPage(page);
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

export const getTaskById = createAsyncThunk(
    "task/get-single-task",
    async (id, thunkAPI) => {
        try {
            return await taskService.getTaskById(id);
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

export const saveTask = createAsyncThunk(
    "task/add-task",
    async (data, thunkAPI) => {
        try {
            return await taskService.saveTask(data);
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

export const updateTask = createAsyncThunk(
    "task/update-task",
    async (data, thunkAPI) => {
        try {
            return await taskService.updateTask(data);
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

export const markTask = createAsyncThunk(
    "task/mark-task",
    async (id, thunkAPI) => {
        try {
            return await taskService.markTask(id);
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

export const removeTask = createAsyncThunk(
    "task/remove-task",
    async (id, thunkAPI) => {
        try {
            await taskService.removeTask(id);

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

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.tasks = null;
            state.task = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTaskById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTaskById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.task = action.payload;
            })
            .addCase(getTaskById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTasksByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTasksByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(getTasksByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(saveTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.task = action.payload;
            })
            .addCase(saveTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.task = action.payload;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(markTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(markTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const ind = state.tasks.data.findIndex(
                    (val) => val.id === action.payload.id
                );
                state.tasks.data.splice(ind, 1, action.payload);
                state.tasks = { ...state.tasks };
            })
            .addCase(markTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const newtasks = state.tasks.data.filter(
                    (prod) => prod.id !== action.payload
                );
                state.tasks = { ...state.tasks, data: [...newtasks] };
            })
            .addCase(removeTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = taskSlice.actions;
export default taskSlice.reducer;

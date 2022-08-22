import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

const initialState = {
    categories: [],
    category: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getCategories = createAsyncThunk(
    "category/get",
    async (thunkAPI) => {
        try {
            return await categoryService.getCategories();
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

export const saveCategory = createAsyncThunk(
    "category/save",
    async (data, thunkAPI) => {
        try {
            return await categoryService.saveCategory(data);
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

export const updateCategory = createAsyncThunk(
    "category/update",
    async (data, thunkAPI) => {
        try {
            return await categoryService.updateCategory(data);
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

export const productSlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.categories = [];
            state.category = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(saveCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.category = action.payload;
                state.categories = [action.payload, ...state.categories];
            })
            .addCase(saveCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.categories.findIndex(
                    (val) => val.id === action.payload.id
                );
                state.categories.splice(index, 1, action.payload);
                state.categories = [...state.categories];
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = productSlice.actions;
export default productSlice.reducer;

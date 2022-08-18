import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "./reviewService";

const initialState = {
    reviews: null,
    review: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getReviews = createAsyncThunk("review/get", async (thunkAPI) => {
    try {
        return await reviewService.getReviews();
    } catch (err) {
        const msg =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

        return thunkAPI.rejectWithValue(msg);
    }
});

export const getReviewsByPage = createAsyncThunk(
    "review/by-page",
    async (page, thunkAPI) => {
        try {
            return await reviewService.getReviewsByPage(page);
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

export const getReviewById = createAsyncThunk(
    "review/get-single-review",
    async (id, thunkAPI) => {
        try {
            return await reviewService.getReviewById(id);
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

export const saveReview = createAsyncThunk(
    "review/add-review",
    async (data, thunkAPI) => {
        try {
            return await reviewService.saveReview(data);
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

export const updateReview = createAsyncThunk(
    "review/update-review",
    async (data, thunkAPI) => {
        try {
            return await reviewService.updateReview(data);
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

export const removeReview = createAsyncThunk(
    "review/remove-review",
    async (id, thunkAPI) => {
        try {
            await reviewService.removeReview(id);

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

export const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.reviews = null;
            state.review = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReviewById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReviewById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.review = action.payload;
            })
            .addCase(getReviewById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.reviews = action.payload;
            })
            .addCase(getReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getReviewsByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReviewsByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getReviewsByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(saveReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.review = action.payload;
            })
            .addCase(saveReview.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.review = action.payload;
            })
            .addCase(updateReview.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const newreviews = state.reviews.data.filter(
                    (prod) => prod.id !== action.payload
                );
                state.reviews = { ...newreviews };
            })
            .addCase(removeReview.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = reviewSlice.actions;
export default reviewSlice.reducer;

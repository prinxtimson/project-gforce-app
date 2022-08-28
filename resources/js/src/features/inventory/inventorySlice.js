import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import inventoryService from "./inventoryService";

const initialState = {
    inventories: null,
    inventory: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getInventories = createAsyncThunk(
    "inventory/get",
    async (thunkAPI) => {
        try {
            return await inventoryService.getInventories();
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

export const getInventoriesByPage = createAsyncThunk(
    "inventory/by-page",
    async (page, thunkAPI) => {
        try {
            return await inventoryService.getInventoriesByPage(page);
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

export const getInventoryById = createAsyncThunk(
    "inventory/get-single-inventory",
    async (id, thunkAPI) => {
        try {
            return await inventoryService.getInventoryById(id);
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

export const saveInventory = createAsyncThunk(
    "inventory/add",
    async (data, thunkAPI) => {
        try {
            return await inventoryService.saveInventory(data);
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

export const updateInventory = createAsyncThunk(
    "inventory/update",
    async (data, thunkAPI) => {
        try {
            return await inventoryService.updateInventory(data);
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

export const removeInventory = createAsyncThunk(
    "inventory/remove",
    async (id, thunkAPI) => {
        try {
            await inventoryService.removeInventory(id);

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

export const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.inventories = null;
            state.inventory = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getInventoryById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getInventoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.inventory = action.payload;
            })
            .addCase(getInventoryById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getInventories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getInventories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.inventories = action.payload;
            })
            .addCase(getInventories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getInventoriesByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getInventoriesByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.inventories = action.payload;
            })
            .addCase(getInventoriesByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(saveInventory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveInventory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "inventory had been added";
                //state.inventory = action.payload;
            })
            .addCase(saveInventory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateInventory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateInventory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "inventory had been updated";
                state.inventory = action.payload;
            })
            .addCase(updateInventory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeInventory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeInventory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "inventory deleted";
                const newInventories = state.inventories.data.filter(
                    (prod) => prod.id !== action.payload
                );
                state.inventories = {
                    ...state.inventories,
                    data: newInventories,
                };
            })
            .addCase(removeInventory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = inventorySlice.actions;
export default inventorySlice.reducer;

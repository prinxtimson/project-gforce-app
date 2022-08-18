import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import profileReducer from "./features/profile/profileSlice";
import productReducer from "./features/product/productSlice";
import customerReducer from "./features/customer/customerSlice";
import kitchenReducer from "./features/kitchen/kitchenSlice";
import orderReducer from "./features/order/orderSlice";
import paymentReducer from "./features/payment/paymentSlice";
import taskReducer from "./features/task/taskSlice";
import reviewReducer from "./features/review/reviewSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        product: productReducer,
        customer: customerReducer,
        kitchen: kitchenReducer,
        order: orderReducer,
        payment: paymentReducer,
        task: taskReducer,
        review: reviewReducer,
    },
});

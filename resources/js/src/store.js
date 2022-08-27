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
import reportReducer from "./features/report/reportSlice";
import categoryReducer from "./features/category/categorySlice";
import incedentReducer from "./features/incedent/incedentSlice";
import inventoryReducer from "./features/inventory/inventorySlice";
import complaintReducer from "./features/complaint/complaintSlice";
import deliveryReducer from "./features/delivery/deliverySlice";
import dispatcherReducer from "./features/dispatcher/dispatcherSlice";
import reservationReducer from "./features/reservation/reservationSlice";
import qualityCheckReducer from "./features/qualityCheck/qualityCheckSlice";

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
        report: reportReducer,
        category: categoryReducer,
        incedent: incedentReducer,
        inventory: inventoryReducer,
        complaint: complaintReducer,
        delivery: deliveryReducer,
        dispatcher: dispatcherReducer,
        reservation: reservationReducer,
        qualityCheck: qualityCheckReducer,
    },
});

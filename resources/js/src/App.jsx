import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store";

import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "../../css/input.css";

import Login from "./Pages/Auth/Login";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
import Dashboard from "./Pages/Dashboard";
import AddUser from "./Pages/AddUser";
import Orders from "./Pages/OrdersTable";
import SingleOrder from "./Pages/SingleOrder";
import PaymentsTable from "./Pages/PaymentsTable";
import CustomersTable from "./Pages/CustomersTable";
import Home from "./Pages/Home";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/customers" element={<CustomersTable />} />
                    <Route path="/payments" element={<PaymentsTable />} />
                    <Route path="/orders/:id" element={<SingleOrder />} />
                    <Route path="/create-user" element={<AddUser />} />
                    <Route
                        path="/password/reset/:token"
                        element={<ResetPassword />}
                    />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </Provider>
    );
};

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}

import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Guest from "../../Layouts/Guest";
import { resetPass, reset } from "../../features/auth/authSlice";

export default function ResetPassword() {
    const { token } = useParams();
    const search = new URLSearchParams(useLocation().search);
    const [data, setData] = useState({
        token: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        setData({ ...data, token, email: search.get("email") });
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
            setData({
                token: "",
                email: "",
                password: "",
                password_confirmation: "",
            });
            if (message === "Password reset successfully") {
                dispatch(reset());
                navigate("/login");
            }
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(resetPass(data));
    };

    return (
        <Guest>
            <div className="tw-p-6">
                <div className="form-demo tw-mb-4 tw-text-white">
                    <div className="flex justify-content-center tw-flex-col tw-items-center">
                        <div className="tw-my-3">
                            <img
                                src="/blacky_logo.jpg"
                                style={{ height: 85 }}
                                alt="Blacky Restaurant"
                            />
                        </div>
                        <div className="card">
                            <h5 className="text-center">Reset Password</h5>
                            <form onSubmit={submit} className="tw-py-5 p-fluid">
                                <div className="field">
                                    <span className="p-float-label custom-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            className=""
                                            onChange={handleOnChange}
                                            readOnly
                                        />
                                        <label htmlFor="email" className="">
                                            Email*
                                        </label>
                                    </span>
                                </div>
                                <div className="field">
                                    <span className="p-float-label custom-label">
                                        <Password
                                            id="password"
                                            name="password"
                                            value={data.password}
                                            toggleMask
                                            className=""
                                            onChange={handleOnChange}
                                            required
                                        />

                                        <label htmlFor="password" className="">
                                            Password*
                                        </label>
                                    </span>
                                </div>
                                <div className="field">
                                    <span className="p-float-label custom-label">
                                        <Password
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={handleOnChange}
                                            toggleMask
                                            className=""
                                            required
                                        />

                                        <label
                                            htmlFor="password_confirmation"
                                            className=""
                                        >
                                            Confirm password*
                                        </label>
                                    </span>
                                </div>

                                <Button
                                    className="tw-ml-4 custom-btn mt-2"
                                    id="custom"
                                    type="submit"
                                    label="Submit"
                                    disabled={isLoading}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    );
}

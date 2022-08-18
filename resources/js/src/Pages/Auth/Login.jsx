import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { toast } from "react-toastify";

import Guest from "../../Layouts/Guest";
import { login, reset } from "../../features/auth/authSlice";

export default function Login() {
    const [data, setData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const { email, password, remember } = data;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            navigate("/two-factor-auth");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const handleOnChange = (event) => {
        setData({
            ...data,
            [event.target.name]:
                event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(data));
    };

    return (
        <Guest>
            <div className="tw-p-6">
                <div className="form-demo tw-text-white">
                    <div className="flex justify-content-center tw-flex-col tw-items-center">
                        <div className="tw-my-3">
                            <img
                                src="/blacky_logo.jpg"
                                style={{ height: 85 }}
                                alt="Blacky Restaurant"
                            />
                        </div>
                        <div className="card">
                            <h5 className="text-center">Sign In</h5>
                            <form onSubmit={onSubmit} className="p-fluid">
                                <div className="field">
                                    <span className="p-float-label custom-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText
                                            id="email"
                                            name="email"
                                            className=""
                                            value={email}
                                            autoComplete="off"
                                            onChange={handleOnChange}
                                        />
                                        <label
                                            htmlFor="email"
                                            className="tw-text-white"
                                        >
                                            Email*
                                        </label>
                                    </span>
                                </div>
                                <div className="field">
                                    <span className="p-float-label custom-label">
                                        <Password
                                            id="password"
                                            name="password"
                                            toggleMask
                                            value={password}
                                            autoComplete="off"
                                            feedback={false}
                                            onChange={handleOnChange}
                                            className=""
                                        />

                                        <label htmlFor="password" className="">
                                            Password*
                                        </label>
                                    </span>
                                </div>
                                <div className="tw-flex tw-mb-4 tw-justify-between">
                                    <div className="field-checked">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            value={remember}
                                            onChange={handleOnChange}
                                            checked={data.remember}
                                            className="tw-mr-2"
                                        />

                                        <label htmlFor="accept" className="">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link
                                        to="/forgot-password"
                                        className="tw-underline tw-text-sm tw-text-white hover:tw-text-gray-200 tw-float-right"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>

                                <Button
                                    id="custom"
                                    type="submit"
                                    label="Submit"
                                    disabled={isLoading}
                                    className="custom-btn "
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    );
}

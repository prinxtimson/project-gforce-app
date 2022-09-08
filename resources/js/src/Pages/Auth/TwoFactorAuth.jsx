import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Knob } from "primereact/knob";
import { toast } from "react-toastify";

import Guest from "../../Layouts/Guest";
import {
    verifyCode,
    resendCode,
    reset,
    updateCount,
} from "../../features/auth/authSlice";

const TwoFactorAuth = () => {
    const [data, setData] = useState({
        code: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { count, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
            if (message === "Successful") {
                navigate("/dashboard");
            }
        }

        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(verifyCode(data));
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
                            <h2 className="text-center tw-text-bold">
                                Two-factor Confirmation
                            </h2>
                            <div className="tw-my-2 tw-text-sm tw-text-white tw-flex tw-justify-center">
                                <p className="tw-px-6 tw-w-96 tw-text-center">
                                    Please confirm access to your account by
                                    entering the authentication code sent to
                                    your email.
                                </p>
                            </div>
                            <form onSubmit={submit} className="tw-py-2 p-fluid">
                                <div className="field">
                                    <span className="p-float-label custom-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText
                                            id="code"
                                            name="code"
                                            value={data.code}
                                            className=""
                                            onChange={handleOnChange}
                                        />
                                        <label htmlFor="code" className="">
                                            Code *
                                        </label>
                                    </span>
                                </div>
                                {/* <div className="tw-my-4">
                                    <Knob value={count} max={60} />
                                </div> */}
                                <Button
                                    className="tw-ml-4 tw-mb-2 custom-btn "
                                    id="custom"
                                    type="submit"
                                    label="Verify Code"
                                    disabled={isLoading}
                                    loading={isLoading}
                                />
                                <Button
                                    type="button"
                                    label="Resend Code"
                                    className="p-button-link"
                                    style={{ marginTop: 10 }}
                                    onClick={() => dispatch(resendCode())}
                                    disabled={isLoading}
                                    loading={isLoading}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    );
};

export default TwoFactorAuth;

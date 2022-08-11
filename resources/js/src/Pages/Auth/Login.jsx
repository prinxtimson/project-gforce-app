import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Link } from "react-router-dom";
import Guest from "../../Layouts/Guest";

export default function Login() {
    const [data, setData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const handleOnChange = (event) => {
        setData(
            event.target.id,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Guest>
            <div className="form-demo">
                <div className="flex justify-content-center">
                    <div className="card">
                        <h5 className="text-center">Sign In</h5>
                        <form onSubmit={onSubmit} className="p-fluid">
                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <InputText
                                        id="email"
                                        className=""
                                        autoComplete="off"
                                        onChange={handleOnChange}
                                    />
                                    <label htmlFor="email" className="">
                                        Email*
                                    </label>
                                </span>
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Password
                                        id="password"
                                        toggleMask
                                        autoComplete="off"
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
                                    className="tw-underline tw-text-sm tw-text-gray-600 hover:tw-text-gray-900 tw-float-right"
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                label="Submit"
                                className="tw-mb-4 "
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Guest>
    );
}

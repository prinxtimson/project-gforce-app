import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import Guest from "../../Layouts/Guest";

export default function ForgotPassword() {
    const [data, setData] = useState({
        email: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
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
                            <h5 className="text-center">Forgot Password</h5>
                            <form onSubmit={submit} className="p-fluid">
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right custom-label">
                                        <i className="pi pi-envelope" />
                                        <InputText
                                            id="name"
                                            name="email"
                                            value={data.email}
                                            //isFocused={true}
                                            onChange={onHandleChange}
                                        />
                                        <label htmlFor="email" className="">
                                            Email*
                                        </label>
                                    </span>
                                </div>
                                <Button
                                    className="tw-mb-2 custom-btn"
                                    id="custom"
                                    type="submit"
                                    label="Reset Password"
                                />

                                <Link
                                    to="/login"
                                    className="tw-mt-6 tw-underline tw-text-sm hover:tw-text-gray-200"
                                >
                                    Remember password?
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    );
}

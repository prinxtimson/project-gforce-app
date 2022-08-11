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
            <div className="form-demo tw-mb-4">
                <div className="flex justify-content-center">
                    <div className="card">
                        <h5 className="text-center">Forgot Password</h5>
                        <form onSubmit={submit} className="p-fluid">
                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <InputText
                                        id="name"
                                        name="email"
                                        value={data.email}
                                        //className="tw-mt-1 tw-block tw-w-full"
                                        //isFocused={true}
                                        onChange={onHandleChange}
                                    />
                                    <label htmlFor="email" className="">
                                        Email*
                                    </label>
                                </span>
                            </div>
                            <Button
                                className="tw-mb-2"
                                type="submit"
                                label="Reset Password"
                            />

                            <Link
                                to="/login"
                                className="tw-mt-2 tw-underline tw-text-sm tw-text-gray-600 hover:tw-text-gray-900"
                            >
                                Remember password?
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </Guest>
    );
}

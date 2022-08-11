import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import Guest from "../../Layouts/Guest";

export default function ResetPassword() {
    const [data, setData] = useState({
        token: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleOnChange = (event) => {
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
                        <h5 className="text-center">Reset Password</h5>
                        <form onSubmit={submit} className="tw-py-5 p-fluid">
                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <InputText
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        className=""
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
                                        name="password"
                                        value={data.password}
                                        toggleMask
                                        className=""
                                        onChange={handleOnChange}
                                    />

                                    <label htmlFor="password" className="">
                                        Password*
                                    </label>
                                </span>
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Password
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={handleOnChange}
                                        toggleMask
                                        className=""
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
                                className="tw-ml-4 mt-2"
                                type="submit"
                                label="Submit"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Guest>
    );
}

import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Guest from "../../Layouts/Guest";

const TwoFactorAuth = () => {
    const [data, setData] = useState({
        code: "",
    });

    const handleOnChange = (event) => {
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
                            <h5 className="text-center">
                                Two-factor Confirmation
                            </h5>
                            <div class="tw-mb-4 tw-text-sm tw-text-gray-600">
                                <template>
                                    Please confirm access to your account by
                                    entering the authentication code provided by
                                    your authenticator application.
                                </template>

                                {/* <template >
                Please confirm access to your account by entering one of your emergency recovery codes.
            </template> */}
                            </div>
                            <form onSubmit={submit} className="tw-py-5 p-fluid">
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
                                            Code*
                                        </label>
                                    </span>
                                </div>

                                <Button
                                    className="tw-ml-4 mt-2 custom-btn "
                                    id="custom"
                                    type="submit"
                                    label="Submit"
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

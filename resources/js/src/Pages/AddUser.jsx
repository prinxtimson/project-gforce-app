import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Authenticated from "../Layouts/Authenticated";
import { Password } from "primereact/password";

const AddUser = () => {
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
    });
    const handleOnChange = (event) => {
        setData(event.target.id, event.target.value);
    };

    return (
        <Authenticated>
            <div className="tw-flex tw-items-center tw-justify-center">
                <div className="tw-card tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md tw-w-full md:tw-w-[36.5rem]">
                    <div className="tw-text-center tw-mb-5">
                        <div className="tw-text-900 tw-text-xl tw-font-medium tw-mb-12">
                            Add User
                        </div>
                    </div>

                    <form className="p-fluid">
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <InputText
                                    id="first_name"
                                    type="text"
                                    className="tw-w-full "
                                    value={data.first_name}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                    autoFocus
                                />
                                <label htmlFor="first_name" className="">
                                    First name*
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <InputText
                                    id="last_name"
                                    type="text"
                                    className="tw-w-full "
                                    value={data.last_name}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                />
                                <label htmlFor="last_name" className="">
                                    Last name*
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-user" />
                                <InputText
                                    name="username"
                                    type="text"
                                    className="tw-w-full "
                                    autoComplete="off"
                                    value={data.username}
                                    onChange={handleOnChange}
                                />
                                <label htmlFor="username" className="">
                                    Username*
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText
                                    id="email"
                                    type="email"
                                    className="tw-w-full "
                                    value={data.email}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                />
                                <label htmlFor="email" className="">
                                    Email*
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label">
                                <Password
                                    id="password"
                                    type="password"
                                    toggleMask
                                    className="tw-w-full"
                                    value={data.password}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                />

                                <label htmlFor="password" className="">
                                    Default password*
                                </label>
                            </span>
                        </div>
                        <Button label="Submit" className="tw-w-full" />
                    </form>
                </div>
            </div>
        </Authenticated>
    );
};

export default AddUser;

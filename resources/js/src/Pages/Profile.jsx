import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";

import Input from "../components/Input";
import Label from "../components/Label";
import ProfileAvatar from "../components/ProfileAvatar";
import Authenticated from "../Layouts/Authenticated";

const Profile = () => {
    const [data, setData] = useState({
        avatar: "",
        email: "",
        username: "",
        last_name: "",
        first_name: "",
        phone: "",
    });

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            setData({
                ...user.user,
                phone: user.phone || "",
            });
        }
    }, [user]);

    const onProfileSave = (e) => {
        e.preventDefault();
    };

    const onHandleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    return (
        <Authenticated>
            <div className="tw-mb-10">
                <div className="tw-rounded-lg">
                    <div className="tw-py-12">
                        <div className="tw-max-w-3xl tw-mx-auto sm:tw-px-6 lg:tw-px-8 tw-px-5">
                            <div className="tw-bg-white tw-overflow-hidden tw-shadow-sm sm:tw-rounded-lg">
                                <div className="tw-p-6 tw-bg-white tw-border-b tw-border-gray-200 ">
                                    <div className="tw-py-5">
                                        <form
                                            onSubmit={onProfileSave}
                                            className="lg:tw-p-5 tw-p-2"
                                        >
                                            <div className="tw-pb-10">
                                                <h2 className="tw-text-center tw-font-semibold tw-text-2xl">
                                                    Account
                                                </h2>
                                            </div>
                                            <div className="tw-flex tw-flex-col tw-items-center">
                                                <ProfileAvatar
                                                    source={`${
                                                        user?.user.avatar
                                                    }?${new Date().getTime()}`}
                                                />
                                            </div>
                                            <div className="tw-my-5  ">
                                                <div className="tw-mt-4 tw-grid tw-grid-cols-3 tw-gap-4 tw-items-center ">
                                                    <div className="tw-justify-self-end">
                                                        <Label
                                                            forInput="first_name"
                                                            value="First Name"
                                                        />
                                                    </div>
                                                    <div className="tw-col-span-2">
                                                        <Input
                                                            type="text"
                                                            name="first_name"
                                                            value={
                                                                data.first_name
                                                            }
                                                            className="tw-mt-1 tw-block tw-w-full"
                                                            autoComplete="first_name"
                                                            placeholder="First Name"
                                                            handleChange={
                                                                onHandleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="tw-mt-4 tw-grid tw-grid-cols-3 tw-gap-4 tw-items-center ">
                                                    <div className="tw-justify-self-end">
                                                        <Label
                                                            forInput="last_name"
                                                            value="Last Name"
                                                        />
                                                    </div>
                                                    <div className="tw-col-span-2">
                                                        <Input
                                                            type="text"
                                                            name="last_name"
                                                            value={
                                                                data.last_name
                                                            }
                                                            className="tw-mt-1 tw-block tw-w-full"
                                                            autoComplete="last_name"
                                                            placeholder="Last Name"
                                                            handleChange={
                                                                onHandleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="tw-mt-4 tw-grid tw-grid-cols-3 tw-gap-4 tw-items-center">
                                                    <div className="tw-justify-self-end">
                                                        <Label
                                                            forInput="email"
                                                            value="Email"
                                                        />
                                                    </div>
                                                    <div className="tw-col-span-2">
                                                        <Input
                                                            type="text"
                                                            name="email"
                                                            value={data.email}
                                                            className="tw-mt-1 tw-block tw-w-full"
                                                            readOnly
                                                            placeholder="Email"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="tw-mt-4 tw-grid tw-grid-cols-3 tw-gap-4 tw-items-center">
                                                    <div className="tw-justify-self-end">
                                                        <Label
                                                            forInput="phone"
                                                            value="Phone Number"
                                                        />
                                                    </div>
                                                    <div className="tw-col-span-2">
                                                        <Input
                                                            type="text"
                                                            name="phone"
                                                            value={data.phone}
                                                            className="tw-mt-1 tw-block tw-w-full"
                                                            handleChange={
                                                                onHandleChange
                                                            }
                                                            placeholder="Phone Number"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tw-flex tw-items-center tw-justify-between tw-mt-4 tw-mx-4">
                                                <Button
                                                    className="tw-ml-4"
                                                    label="Save"
                                                />
                                                <Button
                                                    className="tw-ml-4"
                                                    label="Cancel"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Profile;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { toast } from "react-toastify";

import {
    getProfile,
    reset,
    clear,
    updateProfile,
} from "../features/profile/profileSlice";
import Input from "../components/Input";
import Label from "../components/Label";
import ProfileAvatar from "../components/ProfileAvatar";
import Authenticated from "../Layouts/Authenticated";

const Profile = () => {
    const [data, setData] = useState({
        avatar: "",
        email: "",
        username: "",
        lastname: "",
        firstname: "",
        phone: "",
    });

    const dispatch = useDispatch();

    const { profile, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.profile
    );

    useEffect(() => {
        dispatch(getProfile());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success("profile updated successfuly");
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    useEffect(() => {
        if (profile) {
            const {
                email,
                avatar,
                username,
                profile: { lastname, firstname, phone },
            } = profile;
            setData({
                ...data,
                email,
                avatar,
                username,
                lastname,
                firstname,
                phone,
            });
        }
    }, [profile]);

    const onProfileSave = (e) => {
        e.preventDefault();
        dispatch(updateProfile(data));
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
                                                        profile?.avatar
                                                    }?${new Date().getTime()}`}
                                                />
                                            </div>
                                            <div className="tw-my-5  ">
                                                <div className="tw-mt-4 tw-grid tw-grid-cols-3 tw-gap-4 tw-items-center ">
                                                    <div className="tw-justify-self-end">
                                                        <Label
                                                            forInput="firstname"
                                                            value="First Name"
                                                        />
                                                    </div>
                                                    <div className="tw-col-span-2">
                                                        <Input
                                                            type="text"
                                                            name="firstname"
                                                            value={
                                                                data.firstname
                                                            }
                                                            className="tw-mt-1 tw-block tw-w-full"
                                                            autoComplete="firstname"
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
                                                            forInput="lastname"
                                                            value="Last Name"
                                                        />
                                                    </div>
                                                    <div className="tw-col-span-2">
                                                        <Input
                                                            type="text"
                                                            name="lastname"
                                                            value={
                                                                data.lastname
                                                            }
                                                            className="tw-mt-1 tw-block tw-w-full"
                                                            autoComplete="lastname"
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
                                                    type="submit"
                                                    disabled={isLoading}
                                                />
                                                <Button
                                                    className="tw-ml-4"
                                                    label="Cancel"
                                                    type="button"
                                                    disabled={isLoading}
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

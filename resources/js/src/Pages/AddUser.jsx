import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";

import {
    addNewUser,
    reset,
    getProfileById,
    updateUserProfile,
    clear,
} from "../features/profile/profileSlice";
import Authenticated from "../Layouts/Authenticated";

const AddUser = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        role: "",
        password: "",
    });

    const selectItems = [
        { label: "Waiter", value: "waiter" },
        { label: "Cashier", value: "cashier" },
        { label: "Supervisor", value: "supervisor" },
        { label: "Kitchen Manager", value: "kitchen-manager" },
        { label: "Manager", value: "manager" },
        { label: "Admin", value: "admin" },
    ];

    const dispatch = useDispatch();

    const { profile, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.profile
    );

    useEffect(() => {
        if (id) {
            dispatch(getProfileById(id));
        }
        return () => dispatch(clear());
    }, [id]);

    useEffect(() => {
        if (profile) {
            console.log(profile);
            setData({
                id: profile.id,
                firstname: profile.profile?.firstname || "",
                lastname: profile.profile?.lastname || "",
                email: profile.email || "",
                role: profile.roles[0]?.name || "",
                username: profile.username || "",
            });
        }
    }, [profile]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
            setData({
                id: profile?.id,
                firstname: profile?.profile?.firstname || "",
                lastname: profile?.profile?.lastname || "",
                role: profile?.roles[0]?.name || "",
                username: profile?.username || "",
                email: profile?.email || "",
                password: "",
            });
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (id) {
            dispatch(updateUserProfile(data));
        } else {
            const password = generatePassword();
            dispatch(addNewUser({ ...data, password }));
        }
    };

    const generatePassword = () => {
        let result = [];
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@-%$#!&+?";
        const charLength = characters.length;
        for (let i = 0; i < 8; i++) {
            result.push(
                characters.charAt(Math.floor(Math.random() * charLength))
            );
        }
        return result.join("");
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

                    <form className="p-fluid" onSubmit={onSubmit}>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <InputText
                                    name="firstname"
                                    type="text"
                                    className="tw-w-full "
                                    value={data.firstname}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                    autoFocus
                                />
                                <label htmlFor="firstname" className="">
                                    First name *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <InputText
                                    name="lastname"
                                    type="text"
                                    className="tw-w-full "
                                    value={data.lastname}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                />
                                <label htmlFor="lastname" className="">
                                    Last name *
                                </label>
                            </span>
                        </div>

                        <div className="field tw-mb-6">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText
                                    name="email"
                                    type="email"
                                    className="tw-w-full "
                                    value={data.email}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                    readOnly={Boolean(id)}
                                />
                                <label htmlFor="email" className="">
                                    Email *
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
                                    Username
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label">
                                <Dropdown
                                    name="role"
                                    value={data.role}
                                    options={selectItems}
                                    onChange={handleOnChange}
                                    placeholder="Select role"
                                />
                                <label htmlFor="role" className="">
                                    Role *
                                </label>
                            </span>
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            label="Submit"
                            className="tw-w-full"
                        />
                    </form>
                </div>
            </div>
        </Authenticated>
    );
};

export default AddUser;

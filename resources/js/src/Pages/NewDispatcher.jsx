import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";

import {
    getDispatcherById,
    saveDispatcher,
    updateDispatcher,
    clear,
    reset,
} from "../features/dispatcher/dispatcherSlice";
import Authenticated from "../Layouts/Authenticated";

const NewDispatcher = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        name: "",
        phone: "",
        availability: "",
        status: "",
        description: "",
    });

    const selectItems = ["Offline", "Online"];

    const selectItems2 = ["Available", "Busy", "Unavailable"];

    const dispatch = useDispatch();

    const { dispatcher, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.dispatcher
    );

    useEffect(() => {
        if (id) {
            dispatch(getDispatcherById(id));
        }

        return () => dispatch(clear());
    }, [id]);

    useEffect(() => {
        if (dispatcher) {
            setData({
                id: dispatcher.id,
                name: dispatcher.name || "",
                phone: dispatcher.phone || "",
                availability: dispatcher.availability || "",
                status: dispatcher.status || "",
                description: dispatcher.description || "",
            });
        }
    }, [dispatcher]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
            setData({
                id: dispatcher?.id,
                name: dispatcher?.name || "",
                phone: dispatcher?.phone || "",
                availability: dispatcher?.availability || "",
                status: dispatcher?.status || "",
                description: dispatcher?.description || "",
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
            dispatch(updateDispatcher(data));
        } else {
            dispatch(saveDispatcher(data));
        }
    };

    return (
        <Authenticated>
            <div className="tw-flex tw-items-center tw-justify-center">
                <div className="tw-card tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md tw-w-full md:tw-w-[36.5rem]">
                    <div className="tw-text-center tw-mb-5">
                        <div className="tw-text-900 tw-text-xl tw-font-medium tw-mb-12">
                            Add New Dispatcher
                        </div>
                    </div>

                    <form className="p-fluid" onSubmit={onSubmit}>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <InputText
                                    name="name"
                                    className="tw-w-full "
                                    value={data.name}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                    autoFocus
                                />
                                <label htmlFor="name" className="">
                                    Full Name
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <InputNumber
                                    name="phone"
                                    inputId="withoutgrouping"
                                    className="tw-w-full"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            phone: e.value,
                                        })
                                    }
                                    autoComplete="off"
                                    useGrouping={false}
                                />
                                <label htmlFor="phone" className="">
                                    Phone number
                                </label>
                            </span>
                        </div>

                        <div className="field tw-mb-6">
                            <span className="p-float-label">
                                <Dropdown
                                    name="availability"
                                    value={data.availability}
                                    options={selectItems2}
                                    onChange={handleOnChange}
                                    placeholder="Select availability"
                                />
                                <label htmlFor="availability" className="">
                                    Availability
                                </label>
                            </span>
                        </div>

                        <div className="field tw-mb-6">
                            <span className="p-float-label">
                                <Dropdown
                                    name="status"
                                    value={data.status}
                                    options={selectItems}
                                    onChange={handleOnChange}
                                    placeholder="Select status"
                                />
                                <label htmlFor="status" className="">
                                    Status
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label">
                                <InputTextarea
                                    name="description"
                                    className="tw-w-full "
                                    value={data.description}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                    rows={3}
                                    cols={30}
                                />
                                <label htmlFor="description" className="">
                                    Description
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

export default NewDispatcher;

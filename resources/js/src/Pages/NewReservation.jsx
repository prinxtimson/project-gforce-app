import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";

import Authenticated from "../Layouts/Authenticated";
import {
    getReservationById,
    saveReservation,
    updateReservation,
    clear,
    reset,
} from "../features/reservation/reservationSlice";

const NewReservation = () => {
    const { id } = useParams();
    const d = new Date();
    const previous = new Date(d.getDate() - 1);

    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        no_of_guest: "",
        date: "",
        end_at: "",
        start_at: "",
        type: "Table Reservation",
        other: "",
        special_request: "",
    });

    const dispatch = useDispatch();

    const { reservation, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.reservation
    );

    const selectItems = [
        "Table Reservation",
        "Catering Reservation",
        "Event Management",
        "Other",
    ];

    const selectItems2 = [
        "Dish of the week",
        "Birthday Surprise",
        "Taster session",
        "Chef's special",
    ];

    useEffect(() => {
        if (id) {
            dispatch(getReservationById(id));
        }

        return () => dispatch(clear());
    }, [id]);

    useEffect(() => {
        if (reservation) {
            setData({
                id: reservation.id,
                firstname: reservation.firstname || "",
                lastname: reservation.lastname || "",
                email: reservation.email || "",
                phone: reservation.phone || "",
                no_of_guest: reservation.no_of_guest || 0,
                date: new Date(reservation.date || ""),
                end_at: reservation.end_at || "",
                start_at: reservation.start_at || "",
                type: reservation.type || "Table Reservation",
                other: "",
                special_request: reservation.special_request || "",
            });
        }
    }, [reservation]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
            setData({
                id: reservation?.id,
                firstname: reservation?.firstname || "",
                lastname: reservation?.lastname || "",
                email: reservation?.email || "",
                phone: reservation?.phone || "",
                no_of_guest: reservation?.no_of_guest || 0,
                date: new Date(reservation.date || ""),
                end_at: reservation?.end_at || "",
                start_at: reservation?.start_at || "",
                type: reservation?.type || "Table Reservation",
                other: "",
                special_request: reservation?.special_request || "",
            });
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = {
            ...data,
            end_at: `${data.end_at.getHours()}:${data.end_at.getMinutes()}`,
            start_at: `${data.start_at.getHours()}:${data.start_at.getMinutes()}`,
        };

        if (id) {
            dispatch(updateReservation(formData));
        } else {
            dispatch(saveReservation(formData));
        }
    };

    return (
        <Authenticated>
            <div className="tw-flex tw-items-center tw-justify-center tw-mb-10">
                <div className="tw-card tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md tw-w-full md:tw-w-[36.5rem]">
                    <div className="tw-text-center tw-mb-5">
                        <div className="tw-text-900 tw-text-xl tw-font-medium tw-mb-12">
                            Book Reservation
                        </div>
                    </div>

                    <div className="">
                        <form onSubmit={onSubmit}>
                            <div className="field tw-mb-6">
                                <span className="p-float-label ">
                                    <InputText
                                        name="firstname"
                                        className="tw-w-full "
                                        value={data.firstname}
                                        onChange={handleOnChange}
                                        autoComplete="off"
                                        autoFocus
                                        required
                                    />
                                    <label htmlFor="firstname" className="">
                                        Firstname *
                                    </label>
                                </span>
                            </div>
                            <div className="field tw-mb-6">
                                <span className="p-float-label ">
                                    <InputText
                                        name="lastname"
                                        className="tw-w-full "
                                        value={data.lastname}
                                        onChange={handleOnChange}
                                        autoComplete="off"
                                        required
                                    />
                                    <label htmlFor="lastname" className="">
                                        Lastname *
                                    </label>
                                </span>
                            </div>
                            <div className="field tw-mb-6">
                                <span className="p-float-label p-input-icon-right tw-w-full">
                                    <i className="pi pi-envelope" />
                                    <InputText
                                        name="email"
                                        type="email"
                                        className="tw-w-full"
                                        value={data.email}
                                        onChange={handleOnChange}
                                        autoComplete="off"
                                        required
                                    />
                                    <label htmlFor="email" className="">
                                        Email *
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
                                        required
                                    />
                                    <label htmlFor="phone" className="">
                                        Phone number
                                    </label>
                                </span>
                            </div>
                            <div className="field tw-mb-6">
                                <span className="p-float-label ">
                                    <InputNumber
                                        name="no_of_guest"
                                        inputId="integeronly"
                                        className="tw-w-full "
                                        value={data.no_of_guest}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                no_of_guest: e.value,
                                            })
                                        }
                                        autoComplete="off"
                                        required
                                    />
                                    <label htmlFor="no_of_guest" className="">
                                        No of Guests
                                    </label>
                                </span>
                            </div>
                            <div className="field tw-mb-4">
                                <span className="p-float-label ">
                                    <Calendar
                                        name="date"
                                        value={data.date}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                date: e.value,
                                            })
                                        }
                                        showIcon
                                        className="tw-w-full"
                                        minDate={previous}
                                        readOnlyInput
                                        required
                                    />
                                    <label htmlFor="sku" className="">
                                        Date
                                    </label>
                                </span>
                            </div>
                            <div className="tw-mb-6">
                                <label htmlFor="start" className="">
                                    Time
                                </label>
                                <div className="tw-grid tw-grid-cols-2 tw-gap-3 tw-mt-4">
                                    <div className="field ">
                                        <span className="p-float-label ">
                                            <Calendar
                                                name="start_at"
                                                value={data.start_at}
                                                onChange={(e) =>
                                                    setData({
                                                        ...data,
                                                        start_at: e.value,
                                                    })
                                                }
                                                timeOnly
                                                hourFormat="12"
                                                className="tw-w-full"
                                                required
                                            />
                                            <label htmlFor="start" className="">
                                                Start
                                            </label>
                                        </span>
                                    </div>

                                    <div className="field ">
                                        <span className="p-float-label ">
                                            <Calendar
                                                name="end_at"
                                                value={data.end_at}
                                                onChange={(e) =>
                                                    setData({
                                                        ...data,
                                                        end_at: e.value,
                                                    })
                                                }
                                                timeOnly
                                                hourFormat="12"
                                                className="tw-w-full"
                                                required
                                            />
                                            <label htmlFor="end" className="">
                                                End
                                            </label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="field tw-mb-6">
                                <span className="p-float-label">
                                    <Dropdown
                                        name="type"
                                        value={data.type}
                                        options={selectItems}
                                        onChange={handleOnChange}
                                        placeholder="Select type"
                                        className="tw-w-full"
                                    />
                                    <label htmlFor="type" className="">
                                        Reservation type
                                    </label>
                                </span>
                            </div>
                            <div className="field tw-mb-6">
                                <span className="p-float-label">
                                    <InputTextarea
                                        name="other"
                                        className="tw-w-full "
                                        value={data.other}
                                        onChange={handleOnChange}
                                        autoComplete="off"
                                        rows={2}
                                        cols={30}
                                        disabled={data.type !== "Other"}
                                    />
                                    <label htmlFor="other" className="">
                                        If other above, please specify
                                    </label>
                                </span>
                            </div>
                            <div className="field tw-mb-6">
                                <span className="p-float-label">
                                    <Dropdown
                                        name="special_request"
                                        value={data.special_request}
                                        options={selectItems2}
                                        onChange={handleOnChange}
                                        placeholder="Any Special request"
                                        className="tw-w-full"
                                    />
                                    <label
                                        htmlFor="special_request"
                                        className=""
                                    >
                                        Any Special request
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
            </div>
        </Authenticated>
    );
};

export default NewReservation;

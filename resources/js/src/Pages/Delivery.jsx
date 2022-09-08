import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";

import Authenticated from "../Layouts/Authenticated";
import {
    getDeliveryById,
    saveDelivery,
    updateDelivery,
    clear,
    reset,
} from "../features/delivery/deliverySlice";
import {
    getDispatchers,
    clear as dClear,
    searchDispatchers,
} from "../features/dispatcher/dispatcherSlice";
import {
    getOrderById,
    clear as orderClear,
} from "../features/order/orderSlice";

const Delivery = () => {
    const { id, order_id } = useParams();
    const [data, setData] = useState({
        order_id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        status: "",
        dispatcher_id: "",
    });

    const dispatch = useDispatch();

    const { delivery, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.delivery
    );

    const { dispatchers } = useSelector((state) => state.dispatcher);

    const { order } = useSelector((state) => state.order);

    useEffect(() => {
        if (id) {
            dispatch(getDeliveryById(id));
        }
        dispatch(getDispatchers());

        return () => {
            dispatch(clear());
            dispatch(dClear());
        };
    }, [id]);

    useEffect(() => {
        if (order_id) {
            dispatch(getOrderById(order_id));
        }

        return () => {
            dispatch(orderClear());
        };
    }, [order_id]);

    useEffect(() => {
        if (order) {
            const delivery_add = JSON.parse(order.delivery_address);
            setData({
                order_id: order.id,
                name: `${order.firstname} ${order.lastname}`,
                email: order.email,
                phone: order.phone,
                address: `${delivery_add.address1}, ${delivery_add.city}`,
                status: "",
                dispatcher_id: "",
            });
        }
    }, [order]);

    useEffect(() => {
        if (delivery) {
            setData({
                id: delivery.id,
                order_id: delivery.order_id || "",
                name: delivery.name || "",
                email: delivery.email || "",
                phone: delivery.phone || "",
                address: delivery.address || "",
                status: delivery.status || "",
                dispatcher_id: delivery.dispatcher_id || "",
            });
        }
    }, [delivery]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (id) {
            dispatch(updateDelivery(data));
        } else {
            dispatch(saveDelivery(data));
        }
    };

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    return (
        <Authenticated>
            <div className="tw-flex tw-items-center tw-justify-center">
                <div className="tw-card tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md tw-w-full md:tw-w-[36.5rem]">
                    <div className="tw-text-center tw-mb-5">
                        <div className="tw-text-900 tw-text-xl tw-font-medium tw-mb-12">
                            Add/Update Delivery
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
                                    Customer Name *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <InputText
                                    name="email"
                                    className="tw-w-full "
                                    value={data.email}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                />
                                <label htmlFor="email" className="">
                                    Customer Email *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <InputText
                                    name="phone"
                                    className="tw-w-full "
                                    value={data.phone}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                />
                                <label htmlFor="phone" className="">
                                    Customer Phone *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <InputText
                                    name="address"
                                    className="tw-w-full "
                                    value={data.address}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                />
                                <label htmlFor="address" className="">
                                    Customer Address *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <Dropdown
                                    value={data.dispatcher_id}
                                    className="p-inputtext-sm"
                                    optionLabel="name"
                                    optionValue="id"
                                    options={dispatchers?.data}
                                    filter
                                    showClear
                                    showFilterClear
                                    resetFilterOnHide
                                    filterBy="name"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            dispatcher_id: e.value,
                                        })
                                    }
                                    // onFilter={(e) =>
                                    //     dispatch(searchDispatchers(e.filter))
                                    // }
                                />
                                <label htmlFor="dispatcher" className="">
                                    Select Dispatcher
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <InputText
                                    name="status"
                                    className="tw-w-full "
                                    value={data.status}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                />
                                <label htmlFor="status" className="">
                                    Status *
                                </label>
                            </span>
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            label="Submit"
                            className="tw-w-full"
                            loading={isLoading}
                        />
                    </form>
                </div>
            </div>
        </Authenticated>
    );
};

export default Delivery;

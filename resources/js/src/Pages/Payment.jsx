import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";

import Authenticated from "../Layouts/Authenticated";
import {
    getPaymentById,
    savePayment,
    updatePayment,
    clear,
    reset,
} from "../features/payment/paymentSlice";

const Payment = () => {
    const { id, order_id } = useParams();
    const [data, setData] = useState({
        order_id: order_id ? order_id : "",
        name: "",
        amount: "",
        provider: "",
        channel: "",
    });

    const dispatch = useDispatch();

    const { payment, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.payment
    );

    useEffect(() => {
        if (id) {
            dispatch(getPaymentById(id));
        }

        return () => dispatch(clear());
    }, [id]);

    useEffect(() => {
        if (payment) {
            setData({
                order_id: order_id,
                name: payment.name,
                amount: payment.amount,
                provider: payment.provider,
                channel: payment.channel,
            });
        }
    }, [payment]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
            setData({
                id: payment.id,
                order_id: payment.order_id || "",
                name: payment.name || "",
                amount: payment.amount || "",
                provider: payment.provider || "",
                channel: payment.channel || "",
            });
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (id) {
            dispatch(updatePayment(data));
        } else {
            dispatch(savePayment(data));
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
                            Add/Update Payment
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
                                <InputNumber
                                    name="amount"
                                    mode="decimal"
                                    prefix="£"
                                    className="tw-w-full "
                                    value={data.amount}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            amount: e.value,
                                        })
                                    }
                                    autoComplete="off"
                                />
                                <label htmlFor="amount" className="">
                                    Amount *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <InputText
                                    name="provider"
                                    className="tw-w-full "
                                    value={data.provider}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                />
                                <label htmlFor="provider" className="">
                                    Payment Type *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <InputText
                                    name="channel"
                                    className="tw-w-full "
                                    value={data.channel}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                />
                                <label htmlFor="channel" className="">
                                    Payment detail *
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

export default Payment;

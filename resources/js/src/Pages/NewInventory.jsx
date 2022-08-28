import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";

import Authenticated from "../Layouts/Authenticated";
import {
    getInventoryById,
    saveInventory,
    updateInventory,
    clear,
    reset,
} from "../features/inventory/inventorySlice";

const NewInventory = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        name: "",
        quantity: 0,
    });

    const dispatch = useDispatch();

    const { inventory, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.inventory
    );

    useEffect(() => {
        if (id) {
            dispatch(getInventoryById(id));
        }

        return () => dispatch(clear());
    }, [id]);

    useEffect(() => {
        if (inventory) {
            setData({
                id: inventory.id,
                name: inventory.name || "",
                quantity: inventory.quantity || 0,
            });
        }
    }, [inventory]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
            setData({
                name: inventory?.name || "",
                quantity: inventory?.quantity || 0,
            });
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (id) {
            dispatch(updateInventory(data));
        } else {
            dispatch(saveInventory(data));
        }
    };

    return (
        <Authenticated>
            <div className="tw-flex tw-items-center tw-justify-center">
                <div className="tw-card tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md tw-w-full md:tw-w-[36.5rem]">
                    <div className="tw-text-center tw-mb-5">
                        <div className="tw-text-900 tw-text-xl tw-font-medium tw-mb-12">
                            Add Item
                        </div>
                    </div>

                    <form className="p-fluid" onSubmit={onSubmit}>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <InputText
                                    name="name"
                                    className="tw-w-full "
                                    value={data.name}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            name: e.target.value,
                                        })
                                    }
                                    autoComplete="off"
                                    autoFocus
                                />
                                <label htmlFor="name" className="">
                                    Name *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <InputNumber
                                    name="quantity"
                                    inputId="integeronly"
                                    className="tw-w-full "
                                    value={data.quantity}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            quantity: e.value,
                                        })
                                    }
                                    autoComplete="off"
                                />
                                <label htmlFor="quantity" className="">
                                    Quantity *
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

export default NewInventory;

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";

import Authenticated from "../Layouts/Authenticated";

import { getProducts, clear } from "../features/product/productSlice";
import { saveOrder, reset } from "../features/order/orderSlice";
import axios from "axios";

const AddOrder = () => {
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState(null);
    const [items, setItems] = useState([]);
    const [item, setItem] = useState({
        product_id: "",
        quantity: 0,
        allergies: "",
        preferences: "",
    });
    const [billing_address, setBillingAddress] = useState({
        address1: "",
        address2: " ",
        city: "",
        postal_code: "",
    });
    const [data, setData] = useState({
        lastname: "",
        firstname: "",
        email: "",
        phone: "",
        mode: "",
    });

    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.product);
    const { isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.order
    );

    const optionItems = ["Eat-In", "Eat-Out", "Pick-Up"];

    useEffect(() => {
        dispatch(getProducts());

        return () => {
            dispatch(clear());
        };
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
            setData({
                lastname: "",
                firstname: "",
                email: "",
                phone: "",
                mode: "",
            });
            setBillingAddress({
                address1: "",
                address2: " ",
                city: "",
                postal_code: "",
            });
            setItems([]);
            setCart(null);
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        const orderData = { ...data, billing_address, cart_id: cart.id };
        dispatch(saveOrder(orderData));
    };

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleOnChange2 = (event) => {
        setBillingAddress({
            ...billing_address,
            [event.target.name]: event.target.value,
        });
    };

    const onAddItem = (e) => {
        e.preventDefault();
        if (item.quantity < 1 || !item.product_id) return;
        setLoading(true);
        const cartData = {
            cart_id: cart ? cart.id : null,
            cart_items: [...items, item],
        };
        axios
            .post("/api/cart", cartData)
            .then((res) => {
                setCart(res.data);
                setLoading(false);

                const prod = products.data.find(
                    (val) => val.id === item.product_id
                );
                setItems([
                    ...items,
                    {
                        ...item,
                        name: prod.name,
                        price: prod.price,
                        featured_image: prod.featured_image,
                    },
                ]);

                setItem({
                    product_id: "",
                    quantity: 0,
                    allergies: "",
                    preferences: "",
                });
            })
            .catch((e) => {
                setLoading(false);
            });
    };

    const handleOnDelete = (ind) => {
        let _items = items;
        _items.splice(ind, 1);
        const cartData = {
            cart_id: cart ? cart.id : null,
            cart_items: [...items],
        };
        axios.post("/api/cart", cartData).then((res) => {
            setCart(res.data);
            setItems([..._items]);
        });
    };

    return (
        <Authenticated>
            <div className="tw-py-10 tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4">
                <div className="">
                    <div className="tw-bg-white tw-shadow-md tw-rounded-md tw-p-4">
                        <div className="tw-text-center tw-mb-5">
                            <div className="tw-text-900 tw-text-xl tw-font-medium tw-mb-12">
                                Add Item
                            </div>
                        </div>

                        <div className="">
                            <div className="tw-mt-10">
                                <form onSubmit={onAddItem} className="p-fluid">
                                    <div className="field tw-mb-6">
                                        <span className="p-float-label ">
                                            <Dropdown
                                                value={item.product_id}
                                                className="p-inputtext-sm"
                                                optionLabel="name"
                                                optionValue="id"
                                                options={products?.data}
                                                filter
                                                showClear
                                                showFilterClear
                                                resetFilterOnHide
                                                filterBy="name"
                                                onChange={(e) =>
                                                    setItem({
                                                        ...item,
                                                        product_id: e.value,
                                                    })
                                                }
                                            />
                                            <label htmlFor="name">Menu *</label>
                                        </span>
                                    </div>
                                    <div className="field tw-mb-6">
                                        <span className="p-float-label ">
                                            <InputNumber
                                                name="quantity"
                                                inputId="integeronly"
                                                className="tw-w-full "
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    setItem({
                                                        ...item,
                                                        quantity: e.value,
                                                    })
                                                }
                                                autoComplete="off"
                                            />
                                            <label
                                                htmlFor="quantity"
                                                className=""
                                            >
                                                Quantity *
                                            </label>
                                        </span>
                                    </div>
                                    <div className="field tw-mb-3">
                                        <span className="p-float-label">
                                            <InputText
                                                name="allergies"
                                                className="tw-w-full "
                                                value={item.allergies}
                                                onChange={(e) =>
                                                    setItem({
                                                        ...item,
                                                        allergies:
                                                            e.target.value,
                                                    })
                                                }
                                                autoComplete="off"
                                            />
                                            <label htmlFor="allergies">
                                                Allergies
                                            </label>
                                        </span>
                                    </div>
                                    <div className="field tw-mb-3">
                                        <span className="p-float-label">
                                            <InputText
                                                name="preferences"
                                                className="tw-w-full "
                                                value={item.preferences}
                                                onChange={(e) =>
                                                    setItem({
                                                        ...item,
                                                        preferences:
                                                            e.target.value,
                                                    })
                                                }
                                                autoComplete="off"
                                            />
                                            <label htmlFor="preferences">
                                                Preferences
                                            </label>
                                        </span>
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        label="Add Item"
                                        className="tw-w-full"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tw-flex tw-items-center tw-justify-center">
                    <div className="tw-card tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md tw-w-full">
                        <div className="tw-text-center tw-mb-5">
                            <div className="tw-text-900 tw-text-xl tw-font-medium tw-mb-12">
                                Add Order
                            </div>
                        </div>
                        <div className="tw-mb-8">
                            <h4 className="tw-font-semibold">Order Items</h4>
                            <div className="tw-my-2">
                                <ul>
                                    <li>
                                        <div className="tw-grid tw-grid-cols-7 tw-gap-2 tw-justify-items-center tw-items-center">
                                            <div className=""></div>
                                            <div className="tw-font-semi">
                                                Image
                                            </div>
                                            <div className="tw-font-semi tw-col-span-2">
                                                Name
                                            </div>
                                            <div className="tw-font-semi">
                                                Quantity
                                            </div>
                                            <div className="tw-font-semi">
                                                Price
                                            </div>
                                            <div className="tw-font-semi">
                                                Action
                                            </div>
                                        </div>
                                    </li>
                                    {items.length < 1 && (
                                        <li className="tw-border-t ">
                                            No Items, add item(s) to order
                                        </li>
                                    )}
                                    {items.map((val, ind) => (
                                        <li key={ind} className="tw-border-t ">
                                            <div className="tw-py-1 tw-grid tw-grid-cols-7 tw-justify-items-center tw-items-center">
                                                <div className="">
                                                    {ind + 1}
                                                </div>
                                                <div className="">
                                                    <img
                                                        src={val.feature_image}
                                                        style={{
                                                            width: 40,
                                                            height: 40,
                                                        }}
                                                        alt=""
                                                        className="rounded"
                                                    />
                                                </div>
                                                <div className="tw-col-span-2">
                                                    {val.name}
                                                </div>
                                                <div className="">
                                                    {val.quantity}
                                                </div>
                                                <div className="">
                                                    £{val.price.toFixed(2)}
                                                </div>
                                                <div className="">
                                                    <button
                                                        type="button"
                                                        className="btn"
                                                        onClick={() =>
                                                            handleOnDelete(ind)
                                                        }
                                                    >
                                                        <i className="pi pi-fw pi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <form className="p-fluid" onSubmit={onSubmit}>
                            <div className="tw-mb-6">
                                <h4 className="tw-font-semibold">
                                    Order Details
                                </h4>
                            </div>
                            <div className="field tw-mb-6">
                                <span className="p-float-label ">
                                    <InputText
                                        name="firstname"
                                        className="tw-w-full "
                                        value={data.firstname}
                                        onChange={handleOnChange}
                                        autoComplete="off"
                                        autoFocus
                                    />
                                    <label htmlFor="firstname" className="">
                                        Customer Firstname *
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
                                        autoFocus
                                    />
                                    <label htmlFor="lastname" className="">
                                        Customer Lastname *
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

                            <div className="tw-my-2">
                                <div className="tw-mb-6">
                                    <h4 className="tw-font-semibold">
                                        Billing Address
                                    </h4>
                                </div>

                                <div className="field tw-mb-6">
                                    <span className="p-float-label ">
                                        <InputText
                                            name="address1"
                                            className="tw-w-full "
                                            value={billing_address.address1}
                                            onChange={handleOnChange2}
                                            autoComplete="off"
                                        />
                                        <label htmlFor="address1" className="">
                                            Address 1 *
                                        </label>
                                    </span>
                                </div>

                                <div className="field tw-mb-6">
                                    <span className="p-float-label ">
                                        <InputText
                                            name="address2"
                                            className="tw-w-full "
                                            value={billing_address.address2}
                                            onChange={handleOnChange2}
                                            autoComplete="off"
                                        />
                                        <label htmlFor="address2" className="">
                                            Address 2
                                        </label>
                                    </span>
                                </div>

                                <div className="field tw-mb-6">
                                    <span className="p-float-label ">
                                        <InputText
                                            name="city"
                                            className="tw-w-full "
                                            value={billing_address.city}
                                            onChange={handleOnChange2}
                                            autoComplete="off"
                                        />
                                        <label htmlFor="city" className="">
                                            City
                                        </label>
                                    </span>
                                </div>

                                <div className="field tw-mb-6">
                                    <span className="p-float-label ">
                                        <InputText
                                            name="postal_code"
                                            className="tw-w-full "
                                            value={billing_address.postal_code}
                                            onChange={handleOnChange2}
                                            autoComplete="off"
                                        />
                                        <label
                                            htmlFor="postal_code"
                                            className=""
                                        >
                                            Postal Code
                                        </label>
                                    </span>
                                </div>
                            </div>

                            <div className="field tw-mb-6">
                                <span className="p-float-label ">
                                    <Dropdown
                                        value={data.mode}
                                        className="p-inputtext-sm"
                                        options={optionItems}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                mode: e.value,
                                            })
                                        }
                                    />
                                    <label htmlFor="mode" className="">
                                        Select Mode
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
            </div>
        </Authenticated>
    );
};

export default AddOrder;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import moment from "moment";

import Authenticated from "../Layouts/Authenticated";
import {
    getCustomers,
    clear as cClear,
} from "../features/customer/customerSlice";
import {
    getReports,
    getOrderReports,
    clear as rClear,
    getMostSelling,
} from "../features/report/reportSlice";
import { getOrderItems, clear as oClear } from "../features/order/orderSlice";
import ReportMenu from "../components/ReportMenu";

const Reports = () => {
    const [birthdays, setBirthdays] = useState([]);
    const [selectedItem, setSelectedItem] = useState("newest");
    const [barBasicData] = useState({
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
        ],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "#42A5F5",
                data: [65, 59, 80, 81, 56, 55, 40],
            },
            {
                label: "My Second dataset",
                backgroundColor: "#FFA726",
                data: [28, 48, 40, 19, 86, 27, 90],
            },
        ],
    });

    const selectItems = [
        { label: "Newest", value: "newest" },
        { label: "Daily", value: "day" },
        { label: "Weekly", value: "week" },
        { label: "Monthly", value: "month" },
    ];

    const dispatch = useDispatch();

    const { reports, orderReports } = useSelector((state) => state.report);
    const { orderItems } = useSelector((state) => state.order);
    const { customers } = useSelector((state) => state.customer);

    useEffect(() => {
        dispatch(getCustomers());
        dispatch(getOrderItems());
        dispatch(getOrderReports());
        dispatch(getReports());

        return () => {
            dispatch(cClear());
            dispatch(rClear());
            dispatch(oClear());
        };
    }, []);

    useEffect(() => {
        if (customers) {
            const d = new Date();
            let filterUser = customers.data.filter((val) =>
                moment(val.profile.date_of_birth).isSame(d, "month")
            );

            setBirthdays(filterUser.slice(0, 6));
        }
    }, [customers]);

    const handleOnChange = (e) => {
        setSelectedItem(e.target.value);
        dispatch(getMostSelling(e.target.value));
    };

    return (
        <Authenticated>
            <ReportMenu />
            <div className="tw-mb-10">
                <div className="tw-grid tw-grid-cols-1 xl:tw-grid-cols-2 tw-gap-4">
                    <div className="tw-flex tw-flex-col">
                        <div className="tw-shadow-md tw-p-3 tw-rounded-md tw-bg-white tw-mb-4">
                            <div className="tw-flex tw-justify-around">
                                <div className="text-center">
                                    <h3>{orderReports?.new_orders || 0}</h3>
                                    <p>New Order</p>
                                </div>
                                <div className="text-center">
                                    <h3>
                                        {orderReports?.in_transit_orders || 0}
                                    </h3>
                                    <p>On Delivery</p>
                                </div>
                                <div className="text-center">
                                    <h3>
                                        {orderReports?.delivered_orders || 0}
                                    </h3>
                                    <p>Delivered</p>
                                </div>
                                <div className="text-center">
                                    <h3>
                                        {orderReports?.canceled_orders || 0}
                                    </h3>
                                    <p>Canceled</p>
                                </div>
                            </div>
                        </div>
                        <div className="tw-grow tw-shadow-md tw-p-3 tw-rounded-md tw-bg-white ">
                            <div className="">
                                <div className="tw-flex tw-justify-between tw-items-center">
                                    <h4>Most Selling Menus</h4>
                                    <div className="">
                                        <span className="p-float-label">
                                            <Dropdown
                                                name="select"
                                                value={selectedItem}
                                                options={selectItems}
                                                onChange={handleOnChange}
                                                placeholder="Select"
                                            />
                                        </span>
                                    </div>
                                </div>

                                <div className="tw-flex tw-justify-around tw-my-6">
                                    <button className="tw-rounded-full tw-p-2 tw-bg-neutral-900 hover:tw-bg-neutral-800 tw-text-white lg:tw-px-6 ">
                                        All Categories
                                    </button>
                                    <button className="tw-rounded-full tw-p-2 tw-bg-neutral-900 hover:tw-bg-neutral-800 tw-text-white lg:tw-px-6 ">
                                        Foods
                                    </button>
                                    <button className="tw-rounded-full tw-p-2 tw-bg-neutral-900 hover:tw-bg-neutral-800 tw-text-white lg:tw-px-6 ">
                                        Beverages
                                    </button>
                                </div>
                            </div>

                            <div className="" style={{ maxHeight: 400 }}>
                                {reports?.most_selling
                                    ?.slice(0, 4)
                                    .map((order) => (
                                        <div
                                            className="tw-grid tw-grid-cols-5 tw-border-b tw-pb-2"
                                            key={order.id}
                                        >
                                            <div className="">
                                                <img
                                                    src={order.product_img}
                                                    alt={order.product_name}
                                                    style={{ height: 60 }}
                                                />
                                            </div>
                                            <div className="tw-col-span-4">
                                                <div className="tw-flex tw-justify-between tw-mb-2">
                                                    <h4 className="tw-font-semibold">
                                                        {order.product_name}
                                                    </h4>
                                                    <span className="tw-mx-2">
                                                        {order.reviews.reduce(
                                                            (total, review) =>
                                                                total +
                                                                parseFloat(
                                                                    review.rating
                                                                ),
                                                            0
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="tw-flex tw-justify-between">
                                                    <span>
                                                        {order.product_price}
                                                    </span>
                                                    <span>+2.6%</span>
                                                    <span>
                                                        {order.count} served
                                                    </span>
                                                    <span>5-10 min Cook</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="tw-shadow-md tw-p-3 tw-rounded-md tw-bg-white">
                            <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
                                <div className="">
                                    <h4>Recent Customers</h4>
                                </div>
                                <div className="">
                                    <button className="tw-rounded-full tw-p-2 tw-bg-dark">
                                        New Customer
                                    </button>
                                </div>
                            </div>
                            <div className="tw-grid tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-3">
                                {customers?.data
                                    ?.slice(0, 6)
                                    .map((customer, ind) => (
                                        <div
                                            className="tw-shadow-md tw-rounded tw-p-2"
                                            key={ind}
                                        >
                                            <div className="">
                                                <img
                                                    src={customer.avatar}
                                                    alt=""
                                                />
                                                <div className="">
                                                    <h5>{customer.name}</h5>
                                                    <p>
                                                        {
                                                            customer
                                                                .addresses[0]
                                                                ?.address_line1
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="tw-bg-white tw-shadow-md tw-rounded  tw-p-3">
                            <div className="">
                                <h4>Monthly Birthdays</h4>
                            </div>

                            <ul>
                                {birthdays.map((user) => (
                                    <li
                                        key={user.id}
                                        className="tw-divide-y tw-divide-slate-200"
                                    >
                                        <div className="tw-flex tw-justify-between tw-py-3">
                                            <div className="">
                                                <h4>{user.name}</h4>
                                            </div>
                                            <div className="">
                                                <p>
                                                    {user.profile.date_of_birth}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="">
                        <div className="tw-bg-white tw-shadow-md tw-rounded  tw-p-3">
                            <Chart
                                type="bar"
                                data={barBasicData}
                                options={basicOptions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Reports;

const basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
        legend: {
            labels: {
                color: "#495057",
            },
        },
    },
    scales: {
        x: {
            ticks: {
                color: "#495057",
            },
            grid: {
                color: "#ebedef",
            },
        },
        y: {
            ticks: {
                color: "#495057",
            },
            grid: {
                color: "#ebedef",
            },
        },
    },
};

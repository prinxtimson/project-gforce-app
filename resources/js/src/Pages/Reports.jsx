import { useState } from "react";
import { Chart } from "primereact/chart";

import Authenticated from "../Layouts/Authenticated";

const Reports = () => {
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
    const [basicData] = useState({
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
                label: "First Dataset",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: "#42A5F5",
                tension: 0.4,
            },
            {
                label: "Second Dataset",
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: "#FFA726",
                tension: 0.4,
            },
        ],
    });
    return (
        <Authenticated>
            <div className="tw-mb-10">
                <div className="tw-grid tw-grid-cols-1 xl:tw-grid-cols-2 tw-gap-4">
                    <div className="tw-flex tw-flex-col">
                        <div className="tw-shadow-md tw-p-3 tw-rounded-md tw-bg-white tw-mb-4">
                            <div className="tw-flex tw-justify-around">
                                <div className="text-center">
                                    <h3>455</h3>
                                    <p>New Order</p>
                                </div>
                                <div className="text-center">
                                    <h3>340</h3>
                                    <p>On Delivery</p>
                                </div>
                                <div className="text-center">
                                    <h3>234</h3>
                                    <p>Delivered</p>
                                </div>
                                <div className="text-center">
                                    <h3>541</h3>
                                    <p>Canceled</p>
                                </div>
                            </div>
                        </div>
                        <div className="tw-grow tw-shadow-md tw-p-3 tw-rounded-md tw-bg-white ">
                            <div className="">
                                <h4>Most Selling Menus</h4>
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
                                <div className="tw-grid tw-grid-cols-5 tw-border-b tw-pb-2">
                                    <div className="">
                                        <img
                                            src="/images/veg_img_2.jpg"
                                            alt=""
                                            style={{ height: 60 }}
                                        />
                                    </div>
                                    <div className="tw-col-span-4">
                                        <div className="tw-flex tw-justify-between tw-mb-2">
                                            <h4 className="tw-font-semibold">
                                                Special Spicy Fired Rice
                                            </h4>
                                            <span className="tw-mx-2">4.8</span>
                                        </div>
                                        <div className="tw-flex tw-justify-between">
                                            <span>$9.88</span>
                                            <span>+2.6%</span>
                                            <span>342 served</span>
                                            <span>5-10 min Cook</span>
                                        </div>
                                    </div>
                                </div>
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
                                <div className="tw-shadow-md tw-rounded tw-p-2">
                                    <div className="">
                                        <img src="/images/no_img.png" alt="" />
                                        <div className="">
                                            <h5>Pascal Dupla</h5>
                                            <p>Brixton, London. UK</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tw-shadow-md tw-rounded tw-p-2">
                                    <img src="/images/no_img.png" alt="" />
                                    <div className="">
                                        <h5>Pascal Dupla</h5>
                                        <p>Brixton, London. UK</p>
                                    </div>
                                </div>
                                <div className="tw-shadow-md tw-rounded tw-p-2">
                                    <img src="/images/no_img.png" alt="" />
                                    <div className="">
                                        <h5>Pascal Dupla</h5>
                                        <p>Brixton, London. UK</p>
                                    </div>
                                </div>
                                <div className="tw-shadow-md tw-rounded tw-p-2">
                                    <img src="/images/no_img.png" alt="" />
                                    <div className="">
                                        <h5>Pascal Dupla</h5>
                                        <p>Brixton, London. UK</p>
                                    </div>
                                </div>
                                <div className="tw-shadow-md tw-rounded tw-p-2">
                                    <img src="/images/no_img.png" alt="" />
                                    <div className="">
                                        <h5>Pascal Dupla</h5>
                                        <p>Brixton, London. UK</p>
                                    </div>
                                </div>
                                <div className="tw-shadow-md tw-rounded tw-p-2">
                                    <img src="/images/no_img.png" alt="" />
                                    <div className="">
                                        <h5>Pascal Dupla</h5>
                                        <p>Brixton, London. UK</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tw-bg-white tw-shadow-md tw-rounded  tw-p-3">
                        <Chart
                            type="line"
                            data={basicData}
                            options={basicOptions}
                        />
                    </div>
                    <div className="tw-bg-white tw-shadow-md tw-rounded  tw-p-3">
                        <Chart
                            type="bar"
                            data={barBasicData}
                            options={basicOptions}
                        />
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

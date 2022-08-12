import { useState } from "react";
import { Chart } from "primereact/chart";

import Authenticated from "../Layouts/Authenticated";

const Dashboard = () => {
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
            <div className="">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 xl:tw-grid-cols-4 tw-gap-4">
                    <div className="">
                        <div className="tw-surface tw-shadow-md tw-p-3 tw-border tw-rounded-md tw-bg-white">
                            <div className="tw-flex tw-justify-between tw-mb-3">
                                <div>
                                    <span className="tw-block tw-text-500 tw-font-medium tw-mb-3">
                                        Total Orders
                                    </span>
                                    <div className="tw-text-900 tw-font-medium tw-text-xl">
                                        152
                                    </div>
                                </div>
                                <div
                                    className="tw-flex tw-items-center tw-justify-center tw-bg-blue-100 tw-rounded-md"
                                    style={{
                                        width: "2.5rem",
                                        height: "2.5rem",
                                    }}
                                >
                                    <i className="pi pi-shopping-cart tw-text-blue-500 tw-text-xl"></i>
                                </div>
                            </div>
                            {/* <span className="tw-text-green-500 tw-font-medium">
                                24 new{" "}
                            </span>
                            <span className="tw-text-500">
                                since last visit
                            </span> */}
                        </div>
                    </div>
                    <div className="">
                        <div className="tw-surface tw-shadow-md tw-p-3 tw-border tw-rounded-md tw-bg-white">
                            <div className="tw-flex tw-justify-between tw-mb-3">
                                <div>
                                    <span className="tw-block tw-text-500 tw-font-medium tw-mb-3">
                                        Total Revenue
                                    </span>
                                    <div className="tw-text-900 tw-font-medium tw-text-xl">
                                        $2.100
                                    </div>
                                </div>
                                <div
                                    className="tw-flex tw-items-center tw-justify-center tw-bg-orange-100 tw-rounded-md"
                                    style={{
                                        width: "2.5rem",
                                        height: "2.5rem",
                                    }}
                                >
                                    <i className="pi pi-map-marker tw-text-orange-500 tw-text-xl"></i>
                                </div>
                            </div>
                            {/* <span className="tw-text-green-500 tw-font-medium">
                                %52+{" "}
                            </span>
                            <span className="tw-text-500">since last week</span> */}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="tw-surface tw-shadow-md tw-p-3 tw-border tw-rounded-md tw-bg-white">
                            <div className="tw-flex tw-justify-between tw-mb-3">
                                <div>
                                    <span className="tw-block tw-text-500 tw-font-medium tw-mb-3">
                                        Total Customers
                                    </span>
                                    <div className="tw-text-900 tw-font-medium tw-text-xl">
                                        28441
                                    </div>
                                </div>
                                <div
                                    className="tw-flex tw-items-center tw-justify-center tw-bg-cyan-100 tw-rounded-md"
                                    style={{
                                        width: "2.5rem",
                                        height: "2.5rem",
                                    }}
                                >
                                    <i className="pi pi-inbox tw-text-cyan-500 tw-text-xl"></i>
                                </div>
                            </div>
                            {/* <span className="tw-text-green-500 tw-font-medium">
                                520{" "}
                            </span>
                            <span className="tw-text-500">
                                newly registered
                            </span> */}
                        </div>
                    </div>
                    <div className="">
                        <div className="tw-surface tw-shadow-md tw-p-3 tw-border tw-rounded-md tw-bg-white">
                            <div className="tw-flex tw-justify-between tw-mb-3">
                                <div>
                                    <span className="tw-block tw-text-500 tw-font-medium tw-mb-3">
                                        Total Menu
                                    </span>
                                    <div className="tw-text-900 tw-font-medium tw-text-xl">
                                        152
                                    </div>
                                </div>
                                <div
                                    className="tw-flex tw-items-center tw-justify-center tw-bg-purple-100 tw-rounded-md"
                                    style={{
                                        width: "2.5rem",
                                        height: "2.5rem",
                                    }}
                                >
                                    <i className="pi pi-comment tw-text-purple-500 tw-text-xl"></i>
                                </div>
                            </div>
                            {/* <span className="tw-text-green-500 tw-font-medium">
                                85{" "}
                            </span>
                            <span className="tw-text-500">responded</span> */}
                        </div>
                    </div>
                </div>

                <div className="tw-py-10 tw-grid tw-grid-cols-1 xl:tw-grid-cols-2 tw-gap-4">
                    <div className="tw-p-4 tw-shadow-lg tw-rounded-md tw-bg-white">
                        <div className="tw-mt-4 tw-mb-2 tw-border-b tw-pb-2">
                            <h5>Revenue</h5>
                        </div>
                        <Chart
                            type="line"
                            data={basicData}
                            options={basicOptions}
                        />
                    </div>
                    <div className="tw-p-4 tw-shadow-lg tw-rounded-md tw-bg-white">
                        <div className="tw-mt-4 tw-mb-2 tw-border-b tw-pb-2">
                            <h5>Daily Trending Menu</h5>
                        </div>
                        <div className="">
                            <ul>
                                <li className="tw-border-b tw-p-4">
                                    <div className="tw-flex">
                                        <div className="tw-flex tw-grow">
                                            <div className="tw-mr-2">1.</div>
                                            <div className="">
                                                <h4>Spicy Chicken</h4>
                                                <p>£8.99</p>
                                            </div>
                                        </div>
                                        <div className="tw-rounded">
                                            <img
                                                src="/images/veg_img_2.jpg"
                                                alt=""
                                                height={50}
                                                width={100}
                                            />
                                        </div>
                                    </div>
                                </li>
                                <li className="tw-border-b tw-p-4">
                                    <div className="tw-flex">
                                        <div className="tw-flex tw-grow">
                                            <div className="tw-mr-2">2.</div>
                                            <div className="">
                                                <h4>Amala</h4>
                                                <p>£5.99</p>
                                            </div>
                                        </div>
                                        <div className="tw-rounded">
                                            <img
                                                src="/images/veg_img_3.jpg"
                                                alt=""
                                                height={50}
                                                width={100}
                                            />
                                        </div>
                                    </div>
                                </li>
                                <li className="tw-border-b tw-p-4">
                                    <div className="tw-flex">
                                        <div className="tw-flex tw-grow">
                                            <div className="tw-mr-2">3.</div>
                                            <div className="">
                                                <h4> Irish Jollof</h4>
                                                <p>£8.99</p>
                                            </div>
                                        </div>
                                        <div className="tw-rounded">
                                            <img
                                                src="/images/veg_img_2.jpg"
                                                alt=""
                                                height={50}
                                                width={100}
                                            />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Dashboard;

let basicOptions = {
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

import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

import Authenticated from "../Layouts/Authenticated";

const Marketing = () => {
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
        ],
    });

    const [basicData2] = useState({
        labels: ["Eat In", "Telephone Take away", "Onlne", "Pick up", "Others"],
        datasets: [
            {
                label: "Sales",
                data: [65, 59, 80, 81, 56],
                backgroundColor: "#FFA726",
            },
        ],
    });

    return (
        <Authenticated>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-my-2 tw-gap-4">
                <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                    Today's Sale
                    <h3>£17,000</h3>
                </div>
                <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                    July's Sale
                    <h3>£17,000</h3>
                </div>
                <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                    Average spend
                    <h3>£25,000</h3>
                </div>
            </div>

            <div className="tw-py-5">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                    <div className="">
                        <div className="tw-p-4 tw-shadow-lg tw-rounded-md tw-bg-white">
                            <div className="tw-mt-4 tw-mb-2 tw-border-b tw-pb-2">
                                <h5>Daily Sales tracking overvie</h5>
                            </div>
                            <Chart
                                type="line"
                                data={basicData}
                                options={basicOptions}
                            />
                        </div>
                    </div>

                    <div className="">
                        <div className="tw-p-4 tw-shadow-lg tw-rounded-md tw-bg-white">
                            <div className="tw-mt-4 tw-mb-2 tw-border-b tw-pb-2">
                                <h5>Sales by platforms</h5>
                            </div>
                            <Chart
                                type="bar"
                                data={basicData2}
                                options={basicOptions}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="tw-my-10">
                <ul>
                    <li className="">
                        <div className="tw-grid tw-grid-cols-5 tw-gap-2 tw-p-2">
                            <div className="tw-col-span-2">Customer Name</div>
                            <div className="">Amount</div>
                            <div className="">Purchase mode</div>
                            <div className="">Customer type</div>
                        </div>
                    </li>
                    <li className="tw-mb-2">
                        <div className="tw-bg-white tw-grid tw-grid-cols-5 tw-gap-2 tw-rounded tw-p-3">
                            <div className="tw-col-span-2">John Doe</div>
                            <div className="">£1,700</div>
                            <div className="">Eat In</div>
                            <div className="">Returning</div>
                        </div>
                    </li>
                    <li className="tw-mb-2">
                        <div className="tw-bg-white tw-grid tw-grid-cols-5 tw-gap-2 tw-rounded tw-p-3">
                            <div className="tw-col-span-2">Jane Doe</div>
                            <div className="">£1,500</div>
                            <div className="">Online</div>
                            <div className="">First Timer</div>
                        </div>
                    </li>
                </ul>
            </div>
        </Authenticated>
    );
};

export default Marketing;

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

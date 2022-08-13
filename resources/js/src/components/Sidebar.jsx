import React from "react";
import { Link } from "react-router-dom";
import {
    MdOutlineAssignment,
    MdOutlinePermContactCalendar,
    MdOutlineGroup,
    MdOutlineNoteAlt,
    MdOutlinePayment,
    MdOutlineReceipt,
    MdOutlineReviews,
    MdOutlineHome,
    MdViewModule,
} from "react-icons/md";
import { FaChartArea } from "react-icons/fa";
import { BsMegaphone } from "react-icons/bs";

const Sidebar = () => {
    return (
        <div>
            <nav id="nav" className="lg:tw-text-sm lg:tw-leading-6 rtw-elative">
                <ul>
                    <li>
                        <Link
                            to="/dashboard"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-white hover:tw-text-slate-200"
                        >
                            <MdOutlineHome size={20} className="tw-mr-2" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/orders"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-white hover:tw-text-slate-200"
                        >
                            <MdOutlineAssignment
                                size={20}
                                className="tw-mr-2"
                            />
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/payments"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-white hover:tw-text-slate-200"
                        >
                            <MdOutlinePayment size={20} className="tw-mr-2" />
                            Payment
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/customers"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-white hover:tw-text-slate-200"
                        >
                            <MdOutlineGroup size={20} className="tw-mr-2" />
                            Customers
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/reports"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-white hover:tw-text-slate-200"
                        >
                            <FaChartArea size={20} className="tw-mr-2" />
                            Analytics & Reports
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/tasks"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-white hover:tw-text-slate-200"
                        >
                            <MdOutlineNoteAlt size={20} className="tw-mr-2" />
                            Tasks
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/reviews"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-white hover:tw-text-slate-200"
                        >
                            <MdOutlineReviews size={20} className="tw-mr-2" />
                            Reviews
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-white hover:tw-text-slate-200"
                        >
                            <MdViewModule size={20} className="tw-mr-2" />
                            Reservations
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-white hover:tw-text-slate-200"
                        >
                            <MdOutlineReceipt size={20} className="tw-mr-2" />
                            Billing & Invoice
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-white hover:tw-text-slate-200"
                        >
                            <BsMegaphone size={20} className="tw-mr-2" />
                            Marketing
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/staffs"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-white hover:tw-text-slate-200"
                        >
                            <MdOutlinePermContactCalendar
                                size={20}
                                className="tw-mr-2"
                            />
                            Staffs
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;

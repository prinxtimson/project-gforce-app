import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    MdOutlineAssignment,
    MdOutlinePermContactCalendar,
    MdOutlineGroup,
    MdOutlineNoteAlt,
    MdOutlinePayment,
    MdKitchen,
    MdOutlineReviews,
    MdOutlineHome,
    MdAssignment,
    MdViewModule,
    MdInventory,
} from "react-icons/md";
import { FaChartArea } from "react-icons/fa";
import { BsMegaphone } from "react-icons/bs";

const Sidebar = () => {
    const location = useLocation();

    return (
        <div>
            <nav id="nav" className="lg:tw-text-sm lg:tw-leading-6 rtw-elative">
                <ul>
                    <li>
                        <Link
                            to="/dashboard"
                            className={`tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-2 tw-p-2 tw-font-semibold tw-text-white ${
                                location.pathname === "/dashboard"
                                    ? "tw-bg-white tw-text-amber-700 hover:tw-text-amber-800 tw-rounded-lg"
                                    : "tw-text-white hover:tw-text-slate-200"
                            }`}
                        >
                            <MdOutlineHome size={20} className="tw-mr-2" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/orders"
                            className={`tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-2 tw-p-2 tw-font-semibold tw-text-white ${
                                location.pathname === "/orders"
                                    ? "tw-bg-white tw-text-amber-700 hover:tw-text-amber-800 tw-rounded-lg"
                                    : "tw-text-white hover:tw-text-slate-200"
                            }`}
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
                            className={`tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-2 tw-p-2 tw-font-semibold tw-text-white ${
                                location.pathname === "/payments"
                                    ? "tw-bg-white tw-text-amber-700 hover:tw-text-amber-800 tw-rounded-lg"
                                    : "tw-text-white hover:tw-text-slate-200"
                            }`}
                        >
                            <MdOutlinePayment size={20} className="tw-mr-2" />
                            Payment
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/customers"
                            className={`tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-2 tw-p-2 tw-font-semibold tw-text-white ${
                                location.pathname === "/customers"
                                    ? "tw-bg-white tw-text-amber-700 hover:tw-text-amber-800 tw-rounded-lg"
                                    : "tw-text-white hover:tw-text-slate-200"
                            }`}
                        >
                            <MdOutlineGroup size={20} className="tw-mr-2" />
                            Customers
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/inventory"
                            className={`tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-2 tw-p-2 tw-font-semibold tw-text-white ${
                                location.pathname === "/inventory"
                                    ? "tw-bg-white tw-text-amber-700 hover:tw-text-amber-800 tw-rounded-lg"
                                    : "tw-text-white hover:tw-text-slate-200"
                            }`}
                        >
                            <MdInventory size={20} className="tw-mr-2" />
                            Inventory
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/products"
                            className={`tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-2 tw-p-2 tw-font-semibold tw-text-white ${
                                location.pathname === "/products"
                                    ? "tw-bg-white tw-text-amber-700 hover:tw-text-amber-800 tw-rounded-lg"
                                    : "tw-text-white hover:tw-text-slate-200"
                            }`}
                        >
                            <MdAssignment size={20} className="tw-mr-2" />
                            Product List
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/reports"
                            className={`tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-2 tw-p-2 tw-font-semibold tw-text-white ${
                                location.pathname === "/reports"
                                    ? "tw-bg-white tw-text-amber-700 hover:tw-text-amber-800 tw-rounded-lg"
                                    : "tw-text-white hover:tw-text-slate-200"
                            }`}
                        >
                            <FaChartArea size={20} className="tw-mr-2" />
                            Analytics & Reports
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/tasks"
                            className={`tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-2 tw-p-2 tw-font-semibold tw-text-white ${
                                location.pathname === "/tasks"
                                    ? "tw-bg-white tw-text-amber-700 hover:tw-text-amber-800 tw-rounded-lg"
                                    : "tw-text-white hover:tw-text-slate-200"
                            }`}
                        >
                            <MdOutlineNoteAlt size={20} className="tw-mr-2" />
                            Tasks
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/reviews"
                            className={`tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-2 tw-p-2 tw-font-semibold tw-text-white ${
                                location.pathname === "/reviews"
                                    ? "tw-bg-white tw-text-amber-700 hover:tw-text-amber-800 tw-rounded-lg"
                                    : "tw-text-white hover:tw-text-slate-200"
                            }`}
                        >
                            <MdOutlineReviews size={20} className="tw-mr-2" />
                            Reviews
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/reservations"
                            className={`tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-2 tw-p-2 tw-font-semibold tw-text-white ${
                                location.pathname === "/reservations"
                                    ? "tw-bg-white tw-text-amber-700 hover:tw-text-amber-800 tw-rounded-lg"
                                    : "tw-text-white hover:tw-text-slate-200"
                            }`}
                        >
                            <MdViewModule size={20} className="tw-mr-2" />
                            Reservations
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/kitchen"
                            className={`tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-2 tw-p-2 tw-font-semibold tw-text-white ${
                                location.pathname === "/kitchen"
                                    ? "tw-bg-white tw-text-amber-700 hover:tw-text-amber-800 tw-rounded-lg"
                                    : "tw-text-white hover:tw-text-slate-200"
                            }`}
                        >
                            <MdKitchen size={20} className="tw-mr-2" />
                            Kitchen Management
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/marketing"
                            className={`tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-2 tw-p-2 tw-font-semibold tw-text-white  ${
                                location.pathname === "/marketing"
                                    ? "tw-bg-white tw-text-amber-700 hover:tw-text-amber-800 tw-rounded-lg"
                                    : "tw-text-white hover:tw-text-slate-200"
                            }`}
                        >
                            <BsMegaphone size={20} className="tw-mr-2" />
                            Marketing
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/staffs"
                            className={`tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-2 tw-p-2 tw-font-semibold tw-text-white  ${
                                location.pathname === "/staffs"
                                    ? "tw-bg-white hover:tw-text-amber-800 tw-text-amber-700 tw-rounded-lg"
                                    : "tw-text-white hover:tw-text-slate-200"
                            }`}
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

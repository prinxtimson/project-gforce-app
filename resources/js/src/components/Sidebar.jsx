import React from "react";
import { Link } from "react-router-dom";
import {
    MdOutlineAssignment,
    MdOutlineGroupAdd,
    MdOutlineGroup,
    MdOutlineNoteAlt,
    MdOutlinePayment,
    MdOutlineReceipt,
    MdOutlinePoll,
    MdOutlineHome,
} from "react-icons/md";

const Sidebar = () => {
    return (
        <div>
            <nav id="nav" className="lg:tw-text-sm lg:tw-leading-6 rtw-elative">
                <ul>
                    <li>
                        <Link
                            to="/dashboard"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-sky-500 dark:tw-text-sky-400"
                        >
                            <MdOutlineHome size={20} className="tw-mr-2" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-sky-500 dark:tw-text-sky-400"
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
                            to="#"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-sky-500 dark:tw-text-sky-400"
                        >
                            <MdOutlinePayment size={20} className="tw-mr-2" />
                            Payment
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-sky-500 dark:tw-text-sky-400"
                        >
                            <MdOutlineGroup size={20} className="tw-mr-2" />
                            Customers
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-sky-500 dark:tw-text-sky-400"
                        >
                            <MdOutlineNoteAlt size={20} className="tw-mr-2" />
                            Tasks
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-sky-500 dark:tw-text-sky-400"
                        >
                            Reviews
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-sky-500 dark:tw-text-sky-400"
                        >
                            Reservations
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-sky-500 dark:tw-text-sky-400"
                        >
                            <MdOutlineReceipt size={20} className="tw-mr-2" />
                            Billing & Invoice
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-sky-500 dark:tw-text-sky-400"
                        >
                            Marketing
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/create-user"
                            className="tw-flex tw-items-center lg:tw-text-sm lg:tw-leading-6 tw-mb-4 tw-font-semibold tw-text-sky-500 dark:tw-text-sky-400"
                        >
                            <MdOutlineGroupAdd size={20} className="tw-mr-2" />
                            User Profile
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Guest({ children }) {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     if (user) {
    //         navigate("/dashboard");
    //     }
    // }, [user, navigate]);

    return (
        <div className="tw-grow tw-flex tw-flex-col sm:tw-justify-center tw-items-center tw-p-12 md:tw-pt-0 tw-bg-orange-200 ">
            <div className=" tw-bg-amber-700 tw-shadow-md tw-overflow-hidden sm:tw-rounded-lg">
                {children}
            </div>
        </div>
    );
}

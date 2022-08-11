import { useState, useEffect } from "react";
import { Badge } from "primereact/badge";
import { Dropdown } from "primereact/dropdown";

const StatusColumn = ({ data }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [status, setStatus] = useState("");

    const statusItems = [
        { label: "New Order", value: "New Order" },
        { label: "Processing", value: "Processing" },
        { label: "Transit", value: "Transit" },
        { label: "On Delivery", value: "On Delivery" },
        { label: "Delivered", value: "Delivered" },
    ];

    useEffect(() => {
        setStatus(data.status);
    }, []);

    const handleOpen = () => {
        setIsEdit(true);
    };

    const handleClose = () => {
        setIsEdit(false);
    };

    // const handleClick = () => {
    //   setIsEdit(false)
    // }
    return (
        <div className="">
            {isEdit ? (
                <div className="tw-relative">
                    <Dropdown
                        value={status}
                        className="p-inputtext-sm"
                        options={statusItems}
                        onChange={(e) => setStatus(e.value)}
                    />
                    <div className="tw-grid tw-gap-2 tw-grid-cols-2 tw-absolute ">
                        <button
                            onClick={handleClose}
                            className="tw-bg-slate-50 hover:tw-bg-slate-100 tw-drop-shadow-md tw-p-2 tw-rounded"
                        >
                            <i className="pi pi-fw pi-check"></i>
                        </button>

                        <button
                            onClick={handleClose}
                            className="tw-bg-slate-50 hover:tw-bg-slate-100 tw-drop-shadow-md tw-p-2 tw-rounded"
                        >
                            <i className="pi pi-fw pi-times"></i>
                        </button>
                    </div>
                </div>
            ) : (
                <span className="tw-text-center" onClick={handleOpen}>
                    <Badge value={status} severity="success" />
                </span>
            )}
        </div>
    );
};

export default StatusColumn;

import { useState, useEffect } from "react";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { useSelector, useDispatch } from "react-redux";

import { updateOrder } from "../features/order/orderSlice";

const StatusColumn = ({ data }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");

    const dispatch = useDispatch();

    const { status } = useSelector((state) => state.order);

    useEffect(() => {
        setSelectedStatus(data?.status_id);
    }, []);

    const handleOpen = () => {
        setIsEdit(true);
    };

    const handleClose = () => {
        setIsEdit(false);
    };

    const onCheckClick = () => {
        dispatch(updateOrder({ id: data.id, status_id: selectedStatus }));
        handleClose();
    };

    return (
        <div className="">
            {isEdit ? (
                <div className="tw-relative">
                    <Dropdown
                        value={selectedStatus}
                        className="p-inputtext-sm"
                        optionLabel="name"
                        optionValue="id"
                        options={status}
                        onChange={(e) => setSelectedStatus(e.value)}
                    />
                    <div className="tw-grid tw-gap-2 tw-grid-cols-2 tw-absolute ">
                        <button
                            onClick={onCheckClick}
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
                    <Tag
                        value={
                            status?.find((val) => val.id === selectedStatus)
                                ?.name
                        }
                        severity="info"
                    ></Tag>
                </span>
            )}
        </div>
    );
};

export default StatusColumn;

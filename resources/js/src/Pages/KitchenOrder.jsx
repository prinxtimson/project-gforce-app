import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";

import Authenticated from "../Layouts/Authenticated";
import {
    getKitchenOrder,
    getKitchenOrderByPage,
    getKitchenCanceledOrder,
    cancelKitchenOrder,
    removeKitchenOrder,
    clear,
} from "../features/kitchen/kitchenSlice";

const KitchenOrder = () => {
    const navigate = useNavigate();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();

    const { orders, isLoading } = useSelector((state) => state.kitchen);
    //console.log(orders);
    useEffect(() => {
        dispatch(getKitchenOrder());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (orders) {
            setFirst(orders.current_page - 1);
        }
    }, [orders]);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="tw-flex tw-justify-between tw-items-center">
                <h5 className="tw-m-0">Kitchen Management</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Keyword Search"
                    />
                </span>
            </div>
        );
    };

    const actionBodyTemplate = (rowData) => {
        let menu = null;
        let items = [
            {
                label: "Cancel",
                icon: "pi pi-fw pi-times",
                command: () => dispatch(cancelKitchenOrder(rowData.id)),
            },
            {
                label: "Delete",
                icon: "pi pi-fw pi-trash",
                command: () => dispatch(removeKitchenOrder(rowData.id)),
            },
        ];
        return (
            <span className="">
                <Menu model={items} popup ref={(ref) => (menu = ref)} />
                <button
                    className="tw-border-0"
                    onClick={(event) => menu.toggle(event)}
                >
                    <i className="pi pi-ellipsis-v"></i>
                </button>
            </span>
        );
    };

    const ratingBodyTemplate = (rowData) => {
        return (
            <div className="tw-flex tw-flex-col tw-justify-center">
                <p className="tw-text-center">{rowData.rating.toFixed(1)}</p>

                <Rating
                    value={rowData.rating}
                    readOnly
                    cancel={false}
                    className="tw-mx-auto"
                    style={{ margin: "auto" }}
                />
            </div>
        );
    };

    const header = renderHeader();

    return (
        <Authenticated>
            <div className="tw-mb-10">
                <div className="tw-shadow-lg tw-rounded-md tw-p-4 tw-bg-white">
                    <div className="tw-flex tw-justify-around tw-my-6">
                        <button
                            className="tw-rounded-lg tw-p-2 tw-bg-neutral-900 hover:tw-bg-neutral-800 tw-text-white lg:tw-px-6 "
                            onClick={() => dispatch(getKitchenOrder())}
                        >
                            Order Received
                        </button>
                        <button
                            className="tw-rounded-lg tw-p-2 tw-bg-neutral-900 hover:tw-bg-neutral-800 tw-text-white lg:tw-px-6 "
                            onClick={() => dispatch(getKitchenCanceledOrder())}
                        >
                            Canceled Orders
                        </button>
                        <button
                            className="tw-rounded-lg tw-p-2 tw-bg-neutral-900 hover:tw-bg-neutral-800 tw-text-white lg:tw-px-6 "
                            onClick={() => dispatch(getKitchenOrder())}
                        >
                            Special Orders
                        </button>
                    </div>
                    <DataTable
                        value={orders?.data}
                        className="p-datatable-customers"
                        header={header}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        dataKey="id"
                        rowHover
                        emptyMessage="No order found."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        filters={filters}
                        filterDisplay="menu"
                        loading={isLoading}
                        responsiveLayout="scroll"
                        paginator
                        rows={20}
                        first={first}
                        onPage={(e) =>
                            dispatch(getKitchenOrderByPage(e.first + 1))
                        }
                    >
                        <Column
                            field="id"
                            header="ID"
                            style={{ minWidth: "5rem" }}
                        />
                        <Column
                            field="name"
                            header="Meal Ordered"
                            style={{ minWidth: "14rem" }}
                            body={(rowData) => rowData.product.name}
                        />
                        <Column
                            field="type"
                            header="Delivery/Takeout"
                            style={{ minWidth: "10rem" }}
                            body={(rowData) => rowData.order?.mode}
                        />
                        <Column
                            field="order_id"
                            header="Order ID"
                            style={{ minWidth: "8rem" }}
                        />
                        <Column
                            field="customer_name"
                            header="Customer Name"
                            style={{ minWidth: "12rem" }}
                            body={(rowData) =>
                                `${rowData.order?.firstname} ${rowData.order?.lastname}`
                            }
                        />
                        <Column
                            field="preferences"
                            header="Customer Preferences"
                            style={{ minWidth: "18rem" }}
                            body={(rowData) =>
                                rowData.preferences
                                    ? JSON.parse(rowData.preferences).toString()
                                    : "Not Available"
                            }
                        />
                        <Column
                            field="allergies"
                            header="Customer Allergies"
                            style={{ minWidth: "14rem" }}
                            body={(rowData) =>
                                rowData.allergies
                                    ? JSON.parse(rowData.allergies).toString()
                                    : "Not Available"
                            }
                        />
                        <Column
                            field="status"
                            header="Order Status"
                            style={{ minWidth: "12rem" }}
                            body={(rowData) => rowData.order?.status}
                        />
                        <Column
                            field="notify"
                            header="Notify"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="is_notification_sent"
                            header="Send Notification"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            headerStyle={{
                                width: "5rem",
                                textAlign: "center",
                            }}
                            bodyStyle={{
                                textAlign: "center",
                                overflow: "visible",
                            }}
                            body={actionBodyTemplate}
                        />
                    </DataTable>
                </div>
            </div>
        </Authenticated>
    );
};

export default KitchenOrder;

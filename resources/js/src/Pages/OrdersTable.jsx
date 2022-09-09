import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import { toast } from "react-toastify";

import {
    getOrders,
    getStatus,
    getOrdersByPage,
    clear,
    reset,
    cancelOrder,
} from "../features/order/orderSlice";
import Authenticated from "../Layouts/Authenticated";
import StatusColumn from "../components/StatusColumn";

const OrdersTable = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();

    const { orders, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.order
    );

    useEffect(() => {
        dispatch(getOrders());
        dispatch(getStatus());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (orders) {
            setFirst(orders.current_page - 1);
        }
    }, [orders]);

    const formatDate = (value) => {
        const d = new Date(value);
        return d.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.created_at);
    };

    const nameBodyTemplate = (rowData) => {
        return `${rowData.firstname} ${rowData.lastname}`;
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const renderHeader = () => {
        return (
            <div className="tw-flex tw-justify-between tw-items-center">
                <h5 className="tw-m-0">Orders</h5>
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

    const statusBodyTemplate = (rowData) => {
        return <StatusColumn data={rowData} />;
    };

    const actionBodyTemplate = (rowData) => {
        let menu = null;
        let items = [
            {
                label: "View order",
                icon: "pi pi-fw pi-eye",
                command: () => navigate(`./${rowData.id}`),
            },
            {
                label: "Delivery",
                icon: "pi pi-fw pi-delivery",
                command: () => navigate(`./${rowData.id}/delivery`),
            },
            {
                label: "Cancel Order",
                icon: "pi pi-fw pi-times",
                command: () => dispatch(cancelOrder(rowData.id)),
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

    const header = renderHeader();

    return (
        <Authenticated>
            <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                <div className="tw-my-4">
                    <Link
                        to="/new-order"
                        className="tw-text-sky-500 tw-underline"
                    >
                        Add Order
                    </Link>
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
                    onPage={(e) => dispatch(getOrdersByPage(e.first + 1))}
                >
                    <Column
                        field="id"
                        header="ID"
                        style={{ minWidth: "5rem" }}
                    />
                    <Column
                        field="name"
                        header="Name"
                        sortable
                        style={{ minWidth: "14rem" }}
                        body={nameBodyTemplate}
                    />
                    <Column
                        field="mode"
                        header="Mode"
                        style={{ minWidth: "10rem" }}
                    />
                    <Column
                        field="phone"
                        header="Phone"
                        style={{ minWidth: "10rem" }}
                    />
                    <Column
                        field="email"
                        header="Email"
                        style={{ minWidth: "10rem" }}
                    />
                    <Column
                        field="date"
                        header="Date"
                        style={{ minWidth: "10rem" }}
                        body={dateBodyTemplate}
                    />
                    <Column
                        field="status"
                        header="Status"
                        style={{ minWidth: "8rem" }}
                        body={statusBodyTemplate}
                    />
                    <Column
                        field="created_at"
                        header="Created AT"
                        dataType="date"
                        style={{ minWidth: "10rem" }}
                        body={dateBodyTemplate}
                    />
                    <Column
                        headerStyle={{ width: "3rem", textAlign: "center" }}
                        bodyStyle={{ textAlign: "center", overflow: "visible" }}
                        body={actionBodyTemplate}
                    />
                </DataTable>
            </div>
        </Authenticated>
    );
};

export default OrdersTable;

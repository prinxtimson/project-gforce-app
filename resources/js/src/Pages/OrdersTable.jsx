import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";

import {
    getOrders,
    getOrdersByPage,
    clear,
} from "../features/order/orderSlice";
import Authenticated from "../Layouts/Authenticated";
import StatusColumn from "../components/StatusColumn";

const OrdersTable = () => {
    const navigate = useNavigate();
    const [selectedOrders, setSelectedOrders] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();

    const { orders, isLoading } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getOrders());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (orders) {
            setFirst(orders.current_page - 1);
        }
    }, [orders]);

    const columns = [
        { field: "id", header: "ID", width: "3rem" },
        { field: "created_at", header: "Date", width: "10rem" },
        { field: "customer_name", header: "Customer Name", width: "14rem" },
        { field: "location", header: "Location", width: "12rem" },
        { field: "amount", header: "Amount", width: "6rem" },
        { field: "status", header: "Status", width: "8rem" },
        { field: "menu", header: "", width: "3rem" },
    ];

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

    const dynamicColumns = columns.map((col, i) => {
        if (col.field === "status") {
            return (
                <Column
                    key={col.field}
                    //field={col.field}
                    header={col.header}
                    body={statusBodyTemplate}
                    style={{ minWidth: col.width }}
                />
            );
        }

        if (col.field === "menu") {
            return (
                <Column
                    key={col.field}
                    //field={col.field}
                    body={(data) => {
                        let menu = null;
                        let items = [
                            {
                                label: "View order",
                                icon: "pi pi-fw pi-eye",
                                command: () => navigate(data.id),
                            },
                            {
                                label: "Edit Order",
                                icon: "pi pi-fw pi-pen",
                            },
                            {
                                label: "Cancel Order",
                                icon: "pi pi-fw pi-times",
                            },
                        ];
                        return (
                            <span className="">
                                <Menu
                                    model={items}
                                    popup
                                    ref={(ref) => (menu = ref)}
                                />
                                <button
                                    className="tw-border-0"
                                    onClick={(event) => menu.toggle(event)}
                                >
                                    <i className="pi pi-ellipsis-v"></i>
                                </button>
                            </span>
                        );
                    }}
                    headerStyle={{ width: col.width, textAlign: "center" }}
                    bodyStyle={{ textAlign: "center", overflow: "visible" }}
                />
            );
        }
        return (
            <Column
                key={col.field}
                field={col.field}
                header={col.header}
                style={{ minWidth: col.width }}
            />
        );
    });

    const header = renderHeader();

    return (
        <Authenticated>
            <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                <DataTable
                    value={orders?.data}
                    className="p-datatable-customers"
                    header={header}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    dataKey="id"
                    rowHover
                    selection={selectedOrders}
                    emptyMessage="No order found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    filters={filters}
                    filterDisplay="menu"
                    loading={isLoading}
                    responsiveLayout="scroll"
                    onSelectionChange={(e) => setSelectedOrders(e.value)}
                    paginator
                    rows={20}
                    first={first}
                    onPage={(e) => dispatch(getOrdersByPage(e.first + 1))}
                >
                    <Column
                        selectionMode="multiple"
                        headerStyle={{ width: "3em" }}
                    ></Column>
                    {dynamicColumns}
                </DataTable>
            </div>
        </Authenticated>
    );
};

export default OrdersTable;

const exmples = [
    {
        id: "57556",
        created_at: "01/01/21 13PM",
        customer_name: "Hunter Bidden",
        location: "212 Lagos St",
        amount: "£13.99",
        status: "New Order",
    },
    {
        id: "57557",
        created_at: "01/01/21 13PM",
        customer_name: "Hunter Bidden",
        location: "212 Lagos St",
        amount: "£13.99",
        status: "Delivered",
    },
    {
        id: "57558",
        created_at: "01/01/21 13PM",
        customer_name: "Hunter Bidden",
        location: "212 Lagos St",
        amount: "£13.99",
        status: "On Delivery",
    },
];

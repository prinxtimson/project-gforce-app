import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import { toast } from "react-toastify";

import Authenticated from "../Layouts/Authenticated";
import {
    getDeliveries,
    clear,
    reset,
    getDeliveriesByPage,
    removeDelivery,
} from "../features/delivery/deliverySlice";

const DeliveryTable = () => {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { deliveries, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.delivery
    );

    useEffect(() => {
        dispatch(getDeliveries());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    useEffect(() => {
        if (deliveries) {
            setFirst(deliveries.current_page - 1);
        }
    }, [deliveries]);

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
                <h5 className="tw-m-0">Delivery</h5>
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

    const actionBodyTemplate = (rowData) => {
        let menu = null;
        let items = [
            {
                label: "Edit",
                icon: "pi pi-fw pi-pencil",
                command: () => navigate(`./${rowData.id}`),
            },
            {
                label: "Delete",
                icon: "pi pi-fw pi-trash",
                command: () => dispatch(removeDelivery(rowData.id)),
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

    const dispatcherBodyTemplate = (rowData) => rowData.dispatcher.name;

    const header = renderHeader();

    return (
        <Authenticated>
            <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                <DataTable
                    value={deliveries?.data}
                    className="p-datatable-customers"
                    header={header}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    dataKey="id"
                    rowHover
                    emptyMessage="No delivery found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    filters={filters}
                    filterDisplay="menu"
                    loading={isLoading}
                    responsiveLayout="scroll"
                    paginator
                    rows={20}
                    first={first}
                    onPage={(e) => {
                        dispatch(getDeliveriesByPage(e.first + 1));
                    }}
                >
                    <Column
                        field="id"
                        header="ID"
                        style={{ minWidth: "5rem" }}
                    />
                    <Column
                        field="order_id"
                        header="Order No"
                        style={{ minWidth: "8rem" }}
                    />
                    <Column
                        field="name"
                        header="Customer Name"
                        sortable
                        style={{ minWidth: "14rem" }}
                    />
                    <Column
                        field="email"
                        header="Email"
                        style={{ minWidth: "12rem" }}
                    />
                    <Column
                        field="phone"
                        header="Phone"
                        style={{ minWidth: "10rem" }}
                    />
                    <Column
                        field="status"
                        header="Status"
                        style={{ minWidth: "8rem" }}
                    />
                    <Column
                        field="dispatcher_id"
                        header="Dispatcher"
                        style={{ minWidth: "8rem" }}
                        body={dispatcherBodyTemplate}
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

export default DeliveryTable;

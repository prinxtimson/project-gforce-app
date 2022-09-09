import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";

import Authenticated from "../Layouts/Authenticated";
import {
    getCustomers,
    getCustomersByPage,
    clear,
} from "../features/customer/customerSlice";

const CustomersTable = () => {
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();

    const { customers, isLoading } = useSelector((state) => state.customer);

    useEffect(() => {
        dispatch(getCustomers());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (customers) {
            setFirst(customers.current_page - 1);
        }
    }, [customers]);

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
                <h5 className="tw-m-0">Customers</h5>
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
        return value.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.created_at);
    };

    const actionBodyTemplate = () => {
        let menu = null;
        let items = [
            { label: "Edit", icon: "pi pi-fw pi-check" },
            { label: "Delete", icon: "pi pi-fw pi-trash" },
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
                <DataTable
                    value={customers?.data}
                    className="p-datatable-customers"
                    header={header}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    dataKey="id"
                    rowHover
                    emptyMessage="No customers found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    filters={filters}
                    filterDisplay="menu"
                    loading={isLoading}
                    responsiveLayout="scroll"
                    paginator
                    rows={20}
                    first={first}
                    onPage={(e) => {
                        dispatch(getCustomersByPage(e.first + 1));
                    }}
                >
                    <Column
                        field="id"
                        header="ID"
                        sortable
                        style={{ minWidth: "5rem" }}
                    />
                    <Column
                        field="name"
                        header="Name"
                        sortable
                        style={{ minWidth: "14rem" }}
                    />
                    <Column
                        field="created_at"
                        header="Date"
                        sortable
                        //dataType="date"
                        style={{ minWidth: "10rem" }}
                        body={dateBodyTemplate}
                    />
                    <Column
                        field="address"
                        header="Location"
                        style={{ minWidth: "14rem" }}
                    />
                    <Column
                        field="total_spent"
                        header="Total Spent"
                        style={{ minWidth: "10rem" }}
                    />
                    <Column
                        field="last_spent"
                        header="Last Spent"
                        style={{ minWidth: "10rem" }}
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

export default CustomersTable;

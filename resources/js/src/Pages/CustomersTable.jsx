import { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Menu } from "primereact/menu";

import Authenticated from "../Layouts/Authenticated";

const CustomersTable = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [loading, setLoading] = useState(true);
    const [first, setFirst] = useState(0);

    useEffect(() => {
        setCustomers(exmples);
        setLoading(false);
    }, []);

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
        // return value.toLocaleDateString("en-US", {
        //     day: "2-digit",
        //     month: "2-digit",
        //     year: "numeric",
        // });
        return value;
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
                    value={customers}
                    className="p-datatable-customers"
                    header={header}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]}
                    dataKey="id"
                    rowHover
                    selection={selectedCustomers}
                    emptyMessage="No customers found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    filters={filters}
                    filterDisplay="menu"
                    loading={loading}
                    responsiveLayout="scroll"
                    onSelectionChange={(e) => setSelectedCustomers(e.value)}
                    paginator
                    rows={10}
                    first={first}
                    onPage={(e) => setFirst(e.first)}
                >
                    <Column
                        selectionMode="multiple"
                        headerStyle={{ width: "3em" }}
                    ></Column>
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
                        field="location"
                        header="Location"
                        sortable
                        style={{ minWidth: "14rem" }}
                    />
                    <Column
                        field="total_spent"
                        header="Total Spent"
                        sortable
                        style={{ minWidth: "8rem" }}
                    />
                    <Column
                        field="last_spent"
                        header="Last Spent"
                        sortable
                        style={{ minWidth: "8rem" }}
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

const exmples = [
    {
        id: "57556",
        created_at: "01/01/21 13PM",
        name: "Hunter Bidden",
        location: "212 Lagos St",
        total_spent: "£13.99",
        last_spent: "£5.99",
    },
    {
        id: "57557",
        created_at: "01/01/21 13PM",
        name: "Hunter Bidden",
        location: "212 Lagos St",
        total_spent: "£13.99",
        last_spent: "£6.99",
    },
    {
        id: "57558",
        created_at: "01/01/21 13PM",
        name: "Hunter Bidden",
        location: "212 Lagos St",
        total_spent: "£13.99",
        last_spent: "£9.99",
    },
];

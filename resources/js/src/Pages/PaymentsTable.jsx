import { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";

import Authenticated from "../Layouts/Authenticated";

const PaymentsTable = () => {
    const [payments, setPayments] = useState([]);
    const [selectedPayments, setSelectedPayments] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [loading, setLoading] = useState(true);
    const [first, setFirst] = useState(0);

    useEffect(() => {
        setPayments(exmples);
        setLoading(false);
    }, []);

    const columns = [
        { field: "id", header: "ID", width: "3rem" },
        { field: "name", header: "Name", width: "14rem" },
        { field: "created_at", header: "Date", width: "10rem" },
        { field: "payment_type", header: "Payment Type", width: "10rem" },
        { field: "payment_method", header: "Payment Method", width: "10rem" },
        { field: "amount", header: "Amount", width: "5rem" },
        { field: "status", header: "Status", width: "5rem" },
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
                <h5 className="tw-m-0">Payments</h5>
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

    const dynamicColumns = columns.map((col, i) => {
        let menu = null;
        let items = [
            { label: "Refund", icon: "pi pi-fw pi-check" },
            { label: "Delete", icon: "pi pi-fw pi-trash" },
        ];
        // if (col.field === "status") {
        //     return (
        //         <Column
        //             key={col.field}
        //             //field={col.field}
        //             header={col.header}
        //             body={statusBodyTemplate}
        //         />
        //     );
        // }

        if (col.field === "menu") {
            return (
                <Column
                    key={col.field}
                    //field={col.field}
                    body={() => (
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
                    )}
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
                    value={payments}
                    className="p-datatable-customers"
                    header={header}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]}
                    dataKey="id"
                    rowHover
                    selection={selectedPayments}
                    emptyMessage="No payments found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    filters={filters}
                    filterDisplay="menu"
                    loading={loading}
                    responsiveLayout="scroll"
                    onSelectionChange={(e) => setSelectedPayments(e.value)}
                    paginator
                    rows={10}
                    first={first}
                    onPage={(e) => setFirst(e.first)}
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

export default PaymentsTable;

const exmples = [
    {
        id: "57",
        created_at: "01/01/21 13PM",
        name: "Hunter Bidden",
        payment_type: "Apple pay",
        payment_method: "Online",
        amount: "£13.99",
        status: "Paid",
    },
    {
        id: "5",
        created_at: "01/01/21 13PM",
        name: "Hunter Bidden",
        payment_type: "Credit card",
        payment_method: "indoors",
        amount: "£13.99",
        status: "Paid",
    },
    {
        id: "72",
        created_at: "01/01/21 13PM",
        name: "Hunter Bidden",
        payment_type: "Bank Transfer",
        payment_method: "On phone",
        amount: "£13.99",
        status: "Paid",
    },
    {
        id: "30",
        created_at: "01/01/21 13PM",
        name: "Hunter Bidden",
        payment_type: "Cash",
        payment_method: "indoors",
        amount: "£13.99",
        status: "Paid",
    },
];

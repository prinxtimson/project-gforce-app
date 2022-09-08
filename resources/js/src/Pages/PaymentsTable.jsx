import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Link, useNavigate } from "react-router-dom";

import Authenticated from "../Layouts/Authenticated";
import {
    getPayments,
    getPaymentsByPage,
    clear,
} from "../features/payment/paymentSlice";

const PaymentsTable = () => {
    const [selectedPayments, setSelectedPayments] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();

    const { payments, isLoading } = useSelector((state) => state.payment);

    useEffect(() => {
        dispatch(getPayments());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (payments) {
            setFirst(payments.current_page - 1);
        }
    }, [payments]);

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

    const statusBodyTemplate = (rowData) => {
        return (
            <span
                className={
                    rowData.status == "succeeded"
                        ? "tw-text-green-500"
                        : rowData.status == "pending"
                        ? "tw-text-yellow-500"
                        : "tw-text-red-500"
                }
            >
                {rowData.status}
            </span>
        );
    };

    const amountBodyTemplate = (rowData) => {
        return `£${rowData.amount.toFixed(2)}`;
    };

    const header = renderHeader();

    return (
        <Authenticated>
            <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                {/* <div className="tw-my-4">
                    <Link
                        to="/add-payment"
                        className="tw-text-sky-500 tw-underline"
                    >
                        Add Payment
                    </Link>
                </div> */}
                <DataTable
                    value={payments?.data}
                    className="p-datatable-customers"
                    header={header}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    dataKey="id"
                    rowHover
                    emptyMessage="No payments found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    filters={filters}
                    filterDisplay="menu"
                    loading={isLoading}
                    responsiveLayout="scroll"
                    paginator
                    rows={20}
                    first={first}
                    onPage={(e) => dispatch(getPaymentsByPage(e.first + 1))}
                >
                    <Column
                        field="id"
                        header="ID"
                        style={{ minWidth: "5rem" }}
                    />
                    <Column
                        field="name"
                        header="Customer Name"
                        sortable
                        style={{ minWidth: "12rem" }}
                    />
                    <Column
                        field="date"
                        header="Date"
                        style={{ minWidth: "10rem" }}
                        body={dateBodyTemplate}
                    />
                    <Column
                        field="provider"
                        header="Payment Type"
                        style={{ minWidth: "10rem" }}
                    />
                    <Column
                        field="channel"
                        header="Payment Detail"
                        style={{ minWidth: "10rem" }}
                    />
                    <Column
                        field="amount"
                        header="Amount"
                        style={{ minWidth: "8rem" }}
                        body={amountBodyTemplate}
                    />
                    <Column
                        field="status"
                        header="Status"
                        style={{ minWidth: "8rem" }}
                        body={statusBodyTemplate}
                    />
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

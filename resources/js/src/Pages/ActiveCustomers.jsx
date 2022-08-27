import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import Authenticated from "../Layouts/Authenticated";
import {
    getActiveCustomers,
    getActiveCustomersByPage,
    clear,
} from "../features/customer/customerSlice";
import DownloadButton from "../components/DownloadButton";
import ReportMenu from "../components/ReportMenu";

const ActiveCustomers = () => {
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();

    const { customers, isLoading } = useSelector((state) => state.customer);

    useEffect(() => {
        dispatch(getActiveCustomers());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (customers) {
            setFirst(customers.current_page - 1);
        }
    }, [customers]);

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

    return (
        <Authenticated>
            <ReportMenu />
            <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                <div className="tw-my-4">
                    <DownloadButton path="customers" />
                </div>
                <DataTable
                    value={customers?.data}
                    className="p-datatable-customers"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    dataKey="id"
                    rowHover
                    emptyMessage="No customers found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    loading={isLoading}
                    responsiveLayout="scroll"
                    paginator
                    rows={20}
                    first={first}
                    onPage={(e) => {
                        dispatch(getActiveCustomersByPage(e.first + 1));
                    }}
                >
                    <Column
                        field="id"
                        header="ID"
                        style={{ minWidth: "5rem" }}
                    />
                    <Column
                        field="name"
                        header="Name"
                        style={{ minWidth: "14rem" }}
                    />
                    <Column
                        field="created_at"
                        header="Date"
                        dataType="date"
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
                        style={{ minWidth: "8rem" }}
                    />
                    <Column
                        field="last_spent"
                        header="Last Spent"
                        style={{ minWidth: "8rem" }}
                    />
                </DataTable>
            </div>
        </Authenticated>
    );
};

export default ActiveCustomers;

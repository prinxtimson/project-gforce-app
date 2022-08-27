import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import Authenticated from "../Layouts/Authenticated";
import {
    getCustomersBirthday,
    getCustomersBirthdayByPage,
    clear,
} from "../features/customer/customerSlice";
import ReportMenu from "../components/ReportMenu";
import DownloadButton from "../components/DownloadButton";

const BirthdayTable = () => {
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();

    const { birthdays, isLoading } = useSelector((state) => state.customer);

    useEffect(() => {
        dispatch(getCustomersBirthday());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (birthdays) {
            setFirst(birthdays.current_page - 1);
        }
    }, [birthdays]);

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

    const dobBodyTemplate = (rowData) => {
        return rowData.profile.date_of_birth;
    };

    return (
        <Authenticated>
            <ReportMenu />
            <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                <div className="tw-my-4">
                    <DownloadButton path="birthday" />
                </div>
                <DataTable
                    value={birthdays?.data}
                    className="p-datatable-customers"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    dataKey="id"
                    rowHover
                    emptyMessage="No birthday found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    loading={isLoading}
                    responsiveLayout="scroll"
                    paginator
                    rows={20}
                    first={first}
                    onPage={(e) => {
                        dispatch(getCustomersBirthdayByPage(e.first + 1));
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
                        field="date_of_birth"
                        header="Date of Birth"
                        body={dobBodyTemplate}
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
                    <Column
                        field="created_at"
                        header="Date"
                        dataType="date"
                        style={{ minWidth: "10rem" }}
                        body={dateBodyTemplate}
                    />
                </DataTable>
            </div>
        </Authenticated>
    );
};

export default BirthdayTable;

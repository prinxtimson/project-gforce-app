import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import Authenticated from "../Layouts/Authenticated";
import {
    getAllProfile,
    clear,
    getAllProfileByPage,
} from "../features/profile/profileSlice";
import ReportMenu from "../components/ReportMenu";
import DownloadButton from "../components/DownloadButton";

const PayrollTable = () => {
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();

    const { profiles, isLoading } = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(getAllProfile());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (profiles) {
            setFirst(profiles.current_page - 1);
        }
    }, [profiles]);

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

    const roleBodyTemplate = (rowData) => {
        return rowData.roles[0].name;
    };

    return (
        <Authenticated>
            <ReportMenu />
            <div className="tw-mb-10">
                <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                    <div className="tw-my-4">
                        <DownloadButton path="payroll" />
                    </div>
                    <DataTable
                        value={profiles?.data}
                        className="p-datatable-staffs"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        dataKey="id"
                        rowHover
                        emptyMessage="No staffs found."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        loading={isLoading}
                        responsiveLayout="scroll"
                        paginator
                        rows={20}
                        first={first}
                        onPage={(e) =>
                            dispatch(getAllProfileByPage(e.first + 1))
                        }
                    >
                        <Column
                            field="id"
                            header="ID"
                            style={{ minWidth: "4rem" }}
                        />
                        <Column
                            field="name"
                            header="Name"
                            style={{ minWidth: "14rem" }}
                        />
                        <Column
                            field="email"
                            header="Email"
                            dataType="date"
                            style={{ minWidth: "12rem" }}
                        />

                        <Column
                            field="role"
                            header="Role"
                            sortable
                            style={{ minWidth: "10rem" }}
                            body={roleBodyTemplate}
                        />
                        <Column
                            field="created_at"
                            header="Created At"
                            style={{ minWidth: "10rem" }}
                            body={dateBodyTemplate}
                        />
                    </DataTable>
                </div>
            </div>
        </Authenticated>
    );
};

export default PayrollTable;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import Authenticated from "../Layouts/Authenticated";
import {
    getComplaints,
    clear,
    getComplaintsByPage,
} from "../features/complaint/complaintSlice";
import ReportMenu from "../components/ReportMenu";
import DownloadButton from "../components/DownloadButton";

const ComplaintReport = () => {
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();

    const { complaints, isLoading } = useSelector((state) => state.complaint);

    useEffect(() => {
        dispatch(getComplaints());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (complaints) {
            setFirst(complaints.current_page - 1);
        }
    }, [complaints]);

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

    return (
        <Authenticated>
            <ReportMenu />
            <div className="tw-mb-10">
                <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                    <div className="tw-my-4">
                        <DownloadButton path="complaint" />
                    </div>
                    <DataTable
                        value={complaints?.data}
                        className="p-datatable-staffs"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        dataKey="id"
                        rowHover
                        emptyMessage="No Complain report found."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        loading={isLoading}
                        responsiveLayout="scroll"
                        paginator
                        rows={20}
                        first={first}
                        onPage={(e) =>
                            dispatch(getComplaintsByPage(e.first + 1))
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
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="phone"
                            header="Phone"
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="complain"
                            header="Complain"
                            style={{ minWidth: "15rem" }}
                        />
                        <Column
                            field="created_at"
                            header="Reported At"
                            style={{ minWidth: "10rem" }}
                            body={dateBodyTemplate}
                        />
                    </DataTable>
                </div>
            </div>
        </Authenticated>
    );
};

export default ComplaintReport;

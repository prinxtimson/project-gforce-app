import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import Authenticated from "../Layouts/Authenticated";
import {
    getQualityChecks,
    clear,
    getQualityChecksByPage,
} from "../features/qualityCheck/qualityCheckSlice";
import ReportMenu from "../components/ReportMenu";
import DownloadButton from "../components/DownloadButton";

const QualityCheck = () => {
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();

    const { checks, isLoading } = useSelector((state) => state.qualityCheck);

    useEffect(() => {
        dispatch(getQualityChecks());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (checks) {
            setFirst(checks.current_page - 1);
        }
    }, [checks]);

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
                        <DownloadButton path="quality-check" />
                    </div>
                    <DataTable
                        value={checks?.data}
                        className="p-datatable-staffs"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        dataKey="id"
                        rowHover
                        emptyMessage="No Quality Check found."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        loading={isLoading}
                        responsiveLayout="scroll"
                        paginator
                        rows={20}
                        first={first}
                        onPage={(e) =>
                            dispatch(getQualityChecksByPage(e.first + 1))
                        }
                    >
                        <Column
                            field="id"
                            header="ID"
                            style={{ minWidth: "4rem" }}
                        />
                        <Column
                            field="name"
                            header="Check By"
                            style={{ minWidth: "14rem" }}
                        />
                        <Column
                            field="product_name"
                            header="Product Name"
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="status"
                            header="Status"
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="details"
                            header="Details"
                            style={{ minWidth: "15rem" }}
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

export default QualityCheck;

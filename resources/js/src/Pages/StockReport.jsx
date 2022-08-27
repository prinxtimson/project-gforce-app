import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import Authenticated from "../Layouts/Authenticated";
import {
    clear,
    getInventories,
    getInventoriesByPage,
} from "../features/inventory/inventorySlice";
import ReportMenu from "../components/ReportMenu";
import DownloadButton from "../components/DownloadButton";

const StockReport = () => {
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();

    const { inventories, isLoading } = useSelector((state) => state.inventory);

    useEffect(() => {
        dispatch(getInventories());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (inventories) {
            setFirst(inventories.current_page - 1);
        }
    }, [inventories]);

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

    const categoryBodyTemplate = (rowData) => {
        return (
            <div className="">
                {rowData.categories.map((cat, i) =>
                    rowData.categories?.length - 1 === i ? (
                        <span key={i}>{`${cat.name}`}</span>
                    ) : (
                        <span key={i}>{`${cat.name}, `}</span>
                    )
                )}
            </div>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <span>
                {rowData.quantity > 10
                    ? "In Stock"
                    : rowData.quantity < 10 && rowData.quantity > 0
                    ? "Low Stock"
                    : "Out of Stock"}
            </span>
        );
    };

    return (
        <Authenticated>
            <ReportMenu />
            <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                <div className="tw-my-4">
                    <DownloadButton path="inventory" />
                </div>
                <DataTable
                    value={inventories?.data}
                    className="p-datatable-customers"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    dataKey="id"
                    rowHover
                    emptyMessage="No product found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    loading={isLoading}
                    responsiveLayout="scroll"
                    paginator
                    rows={20}
                    first={first}
                    onPage={(e) => {
                        dispatch(getInventoriesByPage(e.first + 1));
                    }}
                >
                    <Column
                        field="id"
                        header="ID"
                        style={{ minWidth: "5rem" }}
                    />
                    <Column
                        field="name"
                        header="Product Name"
                        style={{ minWidth: "14rem" }}
                    />
                    <Column
                        field="category"
                        header="Category"
                        style={{ minWidth: "14rem" }}
                        body={categoryBodyTemplate}
                    />
                    <Column
                        field="quantity"
                        header="Quantity"
                        sortable
                        style={{ minWidth: "10rem" }}
                    />
                    <Column
                        field="status"
                        header="Status"
                        style={{ minWidth: "10rem" }}
                        body={statusBodyTemplate}
                    />
                    <Column
                        field="created_at"
                        header="Date"
                        //dataType="date"
                        style={{ minWidth: "10rem" }}
                        body={dateBodyTemplate}
                    />
                </DataTable>
            </div>
        </Authenticated>
    );
};

export default StockReport;

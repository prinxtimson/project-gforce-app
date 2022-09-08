import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import Authenticated from "../Layouts/Authenticated";
import {
    getDeliveries,
    clear,
    getDeliveriesByPage,
} from "../features/delivery/deliverySlice";
import ReportMenu from "../components/ReportMenu";
import DownloadButton from "../components/DownloadButton";

const DeliveryReport = () => {
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();

    const { deliveries, isLoading } = useSelector((state) => state.delivery);

    useEffect(() => {
        dispatch(getDeliveries());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (deliveries) {
            setFirst(deliveries.current_page - 1);
        }
    }, [deliveries]);

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
                        <DownloadButton path="delivery" />
                    </div>
                    <DataTable
                        value={deliveries?.data}
                        className="p-datatable-staffs"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        dataKey="id"
                        rowHover
                        emptyMessage="No Delivery report found."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        loading={isLoading}
                        responsiveLayout="scroll"
                        paginator
                        rows={20}
                        first={first}
                        onPage={(e) =>
                            dispatch(getDeliveriesByPage(e.first + 1))
                        }
                    >
                        <Column
                            field="name"
                            header="Customer"
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
                            field="rider"
                            header="Rider"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="status"
                            header="Status"
                            style={{ minWidth: "8rem" }}
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

export default DeliveryReport;

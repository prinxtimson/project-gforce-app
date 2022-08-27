import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import Authenticated from "../Layouts/Authenticated";
import {
    clear,
    getDiscountProducts,
    getProductsByPage,
} from "../features/product/productSlice";
import ReportMenu from "../components/ReportMenu";
import DownloadButton from "../components/DownloadButton";

const DiscountMenu = () => {
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();

    const { discountProducts, isLoading } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(getDiscountProducts());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (discountProducts) {
            setFirst(discountProducts.current_page - 1);
        }
    }, [discountProducts]);

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
            <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                <div className="tw-my-4">
                    <DownloadButton />
                </div>
                <DataTable
                    value={discountProducts?.data}
                    className="p-datatable-customers"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    dataKey="id"
                    rowHover
                    emptyMessage="No menu found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    loading={isLoading}
                    responsiveLayout="scroll"
                    paginator
                    rows={20}
                    first={first}
                    onPage={(e) => {
                        dispatch(getProductsByPage(e.first + 1));
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
                        field="quantity"
                        header="Quantity Sold"
                        style={{ minWidth: "10rem" }}
                    />
                    <Column
                        field="price"
                        header="Price"
                        style={{ minWidth: "10rem" }}
                    />
                    <Column
                        field="discount_price"
                        header="Discount Price"
                        style={{ minWidth: "10rem" }}
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

export default DiscountMenu;

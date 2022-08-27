import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";

import Authenticated from "../Layouts/Authenticated";
import {
    clear,
    getProducts,
    getProductsByPage,
} from "../features/product/productSlice";

const StockReport = () => {
    const menu = useRef(null);
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { products, isLoading } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProducts());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (products) {
            setFirst(products.current_page - 1);
        }
    }, [products]);

    let items = [
        { label: "Report", command: () => navigate("") },
        {
            label: "Monthly Birthday",
            command: () => navigate("/reports/monthly-birthday"),
        },
        {
            label: "Active customer",
            command: () => navigate("/reports/customers"),
        },
        { label: "Stock Report", command: () => navigate("/reports/stock") },
        {
            label: "Discount Sales",
            command: () => navigate("/reports/discount-sales"),
        },
        {
            label: "Payroll Report",
            command: () => navigate("/reports/payroll"),
        },
        {
            label: "Incident Report",
            command: () => navigate("/reports/incedent"),
        },
        {
            label: "Delivery Report",
            command: () => navigate("/reports/delivery"),
        },
        {
            label: "Complaint Report",
            command: () => navigate("/reports/complaint"),
        },
        {
            label: "Quality Check Report",
            command: () => navigate("/reports/quality-check"),
        },
        {
            label: "Feedback Report",
            command: () => navigate("/reports/feedback"),
        },
    ];

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
            <div className="tw-pb-4">
                <Menu model={items} popup ref={menu} id="popup_menu" />
                <Button
                    icon="pi pi-bars"
                    onClick={(e) => menu.current.toggle(e)}
                    aria-controls="popup_menu"
                    aria-haspopup
                />
            </div>
            <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                <DataTable
                    value={products?.data}
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

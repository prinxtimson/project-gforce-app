import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import { Link, useNavigate } from "react-router-dom";

import Authenticated from "../Layouts/Authenticated";
import {
    clear,
    getProducts,
    getProductsByPage,
    removeProduct,
    reset,
} from "../features/product/productSlice";
import { toast } from "react-toastify";

const ProductInventory = () => {
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { products, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(getProducts());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    useEffect(() => {
        if (products) {
            setFirst(products.current_page - 1);
        }
    }, [products]);

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
                <h5 className="tw-m-0">Products</h5>
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

    const actionBodyTemplate = (rowData) => {
        let menu = null;
        let items = [
            {
                label: "Edit",
                icon: "pi pi-fw pi-check",
                command: () => navigate(`/update-product/${rowData.id}`),
            },
            {
                label: "Delete",
                icon: "pi pi-fw pi-trash",
                command: () => dispatch(removeProduct(rowData.id)),
            },
        ];
        return (
            <span className="">
                <Menu model={items} popup ref={(ref) => (menu = ref)} />
                <button
                    className="tw-border-0"
                    onClick={(event) => menu.toggle(event)}
                >
                    <i className="pi pi-ellipsis-v"></i>
                </button>
            </span>
        );
    };

    const header = renderHeader();

    return (
        <Authenticated>
            <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                <div className="tw-my-4">
                    <Link
                        to="/add-product"
                        className="tw-text-sky-500 tw-underline"
                    >
                        Add Product
                    </Link>
                </div>
                <DataTable
                    value={products?.data}
                    className="p-datatable-customers"
                    header={header}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    dataKey="id"
                    rowHover
                    selection={selectedProducts}
                    emptyMessage="No product found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    filters={filters}
                    filterDisplay="menu"
                    loading={isLoading}
                    responsiveLayout="scroll"
                    onSelectionChange={(e) => setSelectedProducts(e.value)}
                    paginator
                    rows={20}
                    first={first}
                    onPage={(e) => {
                        dispatch(getProductsByPage(e.first + 1));
                    }}
                >
                    <Column
                        selectionMode="multiple"
                        headerStyle={{ width: "3em" }}
                    ></Column>
                    <Column
                        field="id"
                        header="ID"
                        sortable
                        style={{ minWidth: "5rem" }}
                    />
                    <Column
                        field="name"
                        header="Product Name"
                        sortable
                        style={{ minWidth: "14rem" }}
                    />
                    <Column
                        field="category"
                        header="Category"
                        sortable
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
                        field="price"
                        header="Price"
                        sortable
                        style={{ minWidth: "10rem" }}
                    />
                    <Column
                        field="created_at"
                        header="Date"
                        sortable
                        //dataType="date"
                        style={{ minWidth: "10rem" }}
                        body={dateBodyTemplate}
                    />
                    <Column
                        headerStyle={{ width: "3rem", textAlign: "center" }}
                        bodyStyle={{ textAlign: "center", overflow: "visible" }}
                        body={actionBodyTemplate}
                    />
                </DataTable>
            </div>
        </Authenticated>
    );
};

export default ProductInventory;

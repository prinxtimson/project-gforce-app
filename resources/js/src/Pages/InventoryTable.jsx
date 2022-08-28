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
    getInventories,
    getInventoriesByPage,
    removeInventory,
    reset,
} from "../features/inventory/inventorySlice";
import { toast } from "react-toastify";

const InventoryTable = () => {
    const [selectedInventories, setSelectedInventories] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { inventories, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.inventory
    );

    useEffect(() => {
        dispatch(getInventories());

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
        if (inventories) {
            setFirst(inventories.current_page - 1);
        }
    }, [inventories]);

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
                <h5 className="tw-m-0">Inventory</h5>
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
                command: () => navigate(`/update-inventory/${rowData.id}`),
            },
            {
                label: "Delete",
                icon: "pi pi-fw pi-trash",
                command: () => dispatch(removeInventory(rowData.id)),
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
                        to="/new-inventory"
                        className="tw-text-sky-500 tw-underline"
                    >
                        Add Items
                    </Link>
                </div>
                <DataTable
                    value={inventories?.data}
                    className="p-datatable-customers"
                    header={header}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    dataKey="id"
                    rowHover
                    selection={selectedInventories}
                    emptyMessage="No items found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    filters={filters}
                    filterDisplay="menu"
                    loading={isLoading}
                    responsiveLayout="scroll"
                    onSelectionChange={(e) => setSelectedInventories(e.value)}
                    paginator
                    rows={20}
                    first={first}
                    onPage={(e) => {
                        dispatch(getInventoriesByPage(e.first + 1));
                    }}
                >
                    <Column
                        selectionMode="multiple"
                        headerStyle={{ width: "3em" }}
                    ></Column>
                    <Column
                        field="id"
                        header="ID"
                        style={{ minWidth: "5rem" }}
                    />
                    <Column
                        field="name"
                        header="Name"
                        sortable
                        style={{ minWidth: "14rem" }}
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
                        sortable
                        dataType="date"
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

export default InventoryTable;

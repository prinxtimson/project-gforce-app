import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import { toast } from "react-toastify";

import Authenticated from "../Layouts/Authenticated";
import {
    getDispatchers,
    removeDispatcher,
    getDispatchersByPage,
    clear,
    reset,
} from "../features/dispatcher/dispatcherSlice";

const DispatcherTable = () => {
    const [selectedDispatchers, setSelectedDispatchers] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { dispatchers, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.dispatcher
    );

    useEffect(() => {
        dispatch(getDispatchers());

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
        if (dispatchers) {
            setFirst(dispatchers.current_page - 1);
        }
    }, [dispatchers]);

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
                <h5 className="tw-m-0">Dispatchers</h5>
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

    const actionBodyTemplate = (rowData) => {
        let menu = null;
        let items = [
            {
                label: "Edit",
                icon: "pi pi-fw pi-pencil",
                command: () => navigate(`/update-dispatcher/${rowData.id}`),
            },
            {
                label: "Delete",
                icon: "pi pi-fw pi-trash",
                command: () => dispatch(removeDispatcher(rowData.id)),
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
                        to="/new-dispatcher"
                        className="tw-text-sky-500 tw-underline"
                    >
                        Add Dispatcher
                    </Link>
                </div>
                <DataTable
                    value={dispatchers?.data}
                    className="p-datatable-customers"
                    header={header}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    dataKey="id"
                    rowHover
                    emptyMessage="No dispatcher found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    filters={filters}
                    filterDisplay="menu"
                    loading={isLoading}
                    responsiveLayout="scroll"
                    paginator
                    rows={20}
                    first={first}
                    onPage={(e) => {
                        dispatch(getDispatchersByPage(e.first + 1));
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
                        sortable
                        style={{ minWidth: "12rem" }}
                    />
                    <Column
                        field="phone"
                        header="Phone"
                        style={{ minWidth: "10rem" }}
                    />
                    <Column
                        field="description"
                        header="Description"
                        sortable
                        style={{ minWidth: "15rem" }}
                    />
                    <Column
                        field="availability"
                        header="Availability"
                        style={{ minWidth: "10rem" }}
                    />
                    <Column
                        field="status"
                        header="Status"
                        style={{ minWidth: "8rem" }}
                        //body={statusBodyTemplate}
                    />
                    <Column
                        field="rating"
                        header="Rating"
                        style={{ minWidth: "8rem" }}
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

export default DispatcherTable;

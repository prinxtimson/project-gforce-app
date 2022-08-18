import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import { Link } from "react-router-dom";

import Authenticated from "../Layouts/Authenticated";
import {
    getAllProfile,
    clear,
    getAllProfileByPage,
} from "../features/profile/profileSlice";

const UsersTable = () => {
    const [selectedStaffs, setSelectedStaffs] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
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
                <h5 className="tw-m-0">Black Restaurant Staffs</h5>
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

    const roleBodyTemplate = (rowData) => {
        return rowData.roles[0].name;
    };

    const actionBodyTemplate = () => {
        let menu = null;
        let items = [
            { label: "Edit", icon: "pi pi-fw pi-check" },
            { label: "Delete", icon: "pi pi-fw pi-trash" },
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
            <div className="tw-mb-10">
                <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                    <div className="tw-my-4">
                        <Link
                            to="/create-user"
                            className="tw-text-sky-500 tw-underline"
                        >
                            Create User
                        </Link>
                    </div>
                    <DataTable
                        value={profiles?.data}
                        className="p-datatable-staffs"
                        header={header}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        dataKey="id"
                        rowHover
                        selection={selectedStaffs}
                        emptyMessage="No staffs found."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        filters={filters}
                        filterDisplay="menu"
                        loading={isLoading}
                        responsiveLayout="scroll"
                        onSelectionChange={(e) => setSelectedStaffs(e.value)}
                        paginator
                        rows={20}
                        first={first}
                        onPage={(e) =>
                            dispatch(getAllProfileByPage(e.first + 1))
                        }
                    >
                        <Column
                            selectionMode="multiple"
                            headerStyle={{ width: "3em" }}
                        ></Column>
                        <Column
                            field="id"
                            header="ID"
                            sortable
                            style={{ minWidth: "4rem" }}
                        />
                        <Column
                            field="name"
                            header="Name"
                            sortable
                            style={{ minWidth: "14rem" }}
                        />
                        <Column
                            field="username"
                            header="Username"
                            sortable
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="email"
                            header="Email"
                            sortable
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
                            sortable
                            style={{ minWidth: "10rem" }}
                            body={dateBodyTemplate}
                        />
                        <Column
                            headerStyle={{ width: "3rem", textAlign: "center" }}
                            bodyStyle={{
                                textAlign: "center",
                                overflow: "visible",
                            }}
                            body={actionBodyTemplate}
                        />
                    </DataTable>
                </div>
            </div>
        </Authenticated>
    );
};

export default UsersTable;

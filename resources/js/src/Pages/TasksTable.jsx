import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";

import {
    getTasks,
    getTasksByPage,
    clear,
    markTask,
    removeTask,
} from "../features/task/taskSlice";
import Authenticated from "../Layouts/Authenticated";
import { Link, useNavigate } from "react-router-dom";

const TasksTable = () => {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { tasks, isLoading } = useSelector((state) => state.task);

    useEffect(() => {
        dispatch(getTasks());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (tasks) {
            setFirst(tasks.current_page - 1);
        }
    }, [tasks]);

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
                <h5 className="tw-m-0">Tasks</h5>
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

    const taskCompletedTemplate = (rowData) => {
        return <span>{rowData.is_completed ? "Yes" : "No"}</span>;
    };

    const nameBodyTemplate = (rowData) => {
        return rowData.user?.name;
    };

    const roleBodyTemplate = (rowData) => {
        return rowData.user?.roles[0].name;
    };

    const actionBodyTemplate = (rowData) => {
        let menu = null;
        let items = [
            {
                label: "Mark Complete",
                icon: "pi pi-fw pi-check",
                command: () => dispatch(markTask(rowData.id)),
            },
            {
                label: "Edit",
                icon: "pi pi-fw pi-pencil",
                command: () => navigate(`/update-task/${rowData.id}`),
            },
            {
                label: "Delete",
                icon: "pi pi-fw pi-trash",
                command: () => dispatch(removeTask(rowData.id)),
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
            <div className="tw-mb-10">
                <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                    <div className="tw-my-4">
                        <Link
                            to="/new-task"
                            className="tw-text-sky-500 tw-underline"
                        >
                            Create Task
                        </Link>
                    </div>
                    <DataTable
                        value={tasks?.data}
                        className="p-datatable-customers"
                        header={header}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        dataKey="id"
                        rowHover
                        emptyMessage="No Task found."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        filters={filters}
                        filterDisplay="menu"
                        loading={isLoading}
                        responsiveLayout="scroll"
                        paginator
                        rows={20}
                        first={first}
                        onPage={(e) => dispatch(getTasksByPage(e.first + 1))}
                    >
                        <Column
                            field="id"
                            header="ID"
                            sortable
                            style={{ minWidth: "3rem" }}
                        />
                        <Column
                            field="name"
                            header="Name"
                            sortable
                            style={{ minWidth: "12rem" }}
                            body={nameBodyTemplate}
                        />
                        <Column
                            field="user_id"
                            header="Employee ID"
                            sortable
                            //dataType="date"
                            style={{ minWidth: "8rem" }}
                        />
                        <Column
                            field="job_title"
                            header="Job Title"
                            style={{ minWidth: "8rem" }}
                            body={roleBodyTemplate}
                        />
                        <Column
                            field="created_at"
                            header="Date Assigned"
                            sortable
                            style={{ minWidth: "10rem" }}
                            body={dateBodyTemplate}
                        />
                        <Column
                            field="duration"
                            header="Duration"
                            style={{ minWidth: "7rem" }}
                        />
                        <Column
                            field="is_completed"
                            header="Task Completed"
                            style={{ minWidth: "10rem" }}
                            body={taskCompletedTemplate}
                        />
                        <Column
                            field="task"
                            header="Task Assigned"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="consistency"
                            header="Consistency"
                            style={{ minWidth: "7rem" }}
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

export default TasksTable;

const exmples = [
    {
        id: "57556",

        name: "Hunter Bidden",
        user_id: "24",
        job_title: "Cashier",
        created_at: "01/01/21 13PM",
        duration: "",
        is_completed: true,
        task_name: "Take Inventory",
        interval: "Bi Weekly",
    },
    {
        id: "57550",
        name: "Marco Botton",
        user_id: "2",
        job_title: "HR",
        created_at: "01/01/21 13PM",
        duration: "",
        is_completed: true,
        task_name: "Onboard New Staff",
        interval: "On Request",
    },
    {
        id: "57590",
        name: "Valerie Liberty",
        user_id: "10",
        job_title: "Kitchen Porter",
        created_at: "01/01/21 13PM",
        duration: "",
        is_completed: false,
        task_name: "Sanitize Kitchen",
        interval: "Tri-Weekly",
    },
];

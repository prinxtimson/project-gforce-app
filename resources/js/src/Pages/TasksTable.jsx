import { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";

import Authenticated from "../Layouts/Authenticated";
import { Link } from "react-router-dom";

const TasksTable = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [loading, setLoading] = useState(true);
    const [first, setFirst] = useState(0);

    useEffect(() => {
        setTasks(exmples);
        setLoading(false);
    }, []);

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
        // return value.toLocaleDateString("en-US", {
        //     day: "2-digit",
        //     month: "2-digit",
        //     year: "numeric",
        // });
        return value;
    };

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.created_at);
    };

    const taskCompletedTemplate = (rowData) => {
        return <span>{rowData.is_completed ? "Yes" : "No"}</span>;
    };

    const actionBodyTemplate = () => {
        let menu = null;
        let items = [
            { label: "Mark Complete", icon: "pi pi-fw pi-check" },
            { label: "Edit", icon: "pi pi-fw pi-pencil" },
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
                        <Link to="#" className="tw-text-sky-500 tw-underline">
                            Create Task
                        </Link>
                    </div>
                    <DataTable
                        value={tasks}
                        className="p-datatable-customers"
                        header={header}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]}
                        dataKey="id"
                        rowHover
                        selection={selectedTask}
                        emptyMessage="No Task found."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        filters={filters}
                        filterDisplay="menu"
                        loading={loading}
                        responsiveLayout="scroll"
                        onSelectionChange={(e) => setSelectedTask(e.value)}
                        paginator
                        rows={10}
                        first={first}
                        onPage={(e) => setFirst(e.first)}
                    >
                        <Column
                            selectionMode="multiple"
                            headerStyle={{ width: "3em" }}
                        ></Column>
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
                        />
                        <Column
                            field="user_id"
                            header="Employee ID"
                            sortable
                            //dataType="date"
                            style={{ minWidth: "6rem" }}
                        />
                        <Column
                            field="job_title"
                            header="Job Title"
                            style={{ minWidth: "8rem" }}
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
                            style={{ minWidth: "8rem" }}
                            body={taskCompletedTemplate}
                        />
                        <Column
                            field="task_name"
                            header="Task Assigned"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="interval"
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

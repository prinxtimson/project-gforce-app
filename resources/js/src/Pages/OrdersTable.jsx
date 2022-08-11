import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";

import Authenticated from "../Layouts/Authenticated";
import StatusColumn from "../components/StatusColumn";

const OrdersTable = () => {
    const [orders, setOrders] = useState([]);
    const [first, setFirst] = useState(0);

    useEffect(() => {
        setOrders(exmples);
    }, []);

    const columns = [
        { field: "id", header: "Order ID" },
        { field: "created_at", header: "Date" },
        { field: "customer_name", header: "Customer Name" },
        { field: "location", header: "Location" },
        { field: "amount", header: "Amount" },
        { field: "status", header: "Status" },
        { field: "menu", header: "" },
    ];

    const statusBodyTemplate = (rowData) => {
        return <StatusColumn data={rowData} />;
    };

    const dynamicColumns = columns.map((col, i) => {
        let menu = null;
        let items = [
            { label: "Accept order", icon: "pi pi-fw pi-check" },
            { label: "Reject order", icon: "pi pi-fw pi-times" },
        ];
        if (col.field === "status") {
            return (
                <Column
                    key={col.field}
                    //field={col.field}
                    header={col.header}
                    body={statusBodyTemplate}
                />
            );
        }

        if (col.field === "menu") {
            return (
                <Column
                    key={col.field}
                    //field={col.field}
                    body={() => (
                        <span className="">
                            <Menu
                                model={items}
                                popup
                                ref={(ref) => (menu = ref)}
                            />
                            <button
                                className="tw-border-0"
                                onClick={(event) => menu.toggle(event)}
                            >
                                <i className="pi pi-ellipsis-v"></i>
                            </button>
                        </span>
                    )}
                />
            );
        }
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    return (
        <Authenticated>
            <div className="">
                <DataTable
                    value={orders}
                    paginator
                    rows={10}
                    first={first}
                    onPage={(e) => setFirst(e.first)}
                >
                    {dynamicColumns}
                </DataTable>
            </div>
        </Authenticated>
    );
};

export default OrdersTable;

const exmples = [
    {
        id: "57556",
        created_at: "01/01/21 13PM",
        customer_name: "Hunter Bidden",
        location: "212 Lagos St",
        amount: "£13.99",
        status: "New Order",
    },
    {
        id: "57557",
        created_at: "01/01/21 13PM",
        customer_name: "Hunter Bidden",
        location: "212 Lagos St",
        amount: "£13.99",
        status: "Delivered",
    },
    {
        id: "57558",
        created_at: "01/01/21 13PM",
        customer_name: "Hunter Bidden",
        location: "212 Lagos St",
        amount: "£13.99",
        status: "On Delivery",
    },
];

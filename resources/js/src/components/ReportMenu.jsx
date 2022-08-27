import { useRef } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const ReportMenu = () => {
    const menu = useRef(null);
    const navigate = useNavigate();

    const items = [
        { label: "Report", command: () => navigate("../") },
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

    return (
        <div className="tw-pb-4">
            <Menu model={items} popup ref={menu} id="popup_menu" />
            <Button
                icon="pi pi-bars"
                onClick={(e) => menu.current.toggle(e)}
                aria-controls="popup_menu"
                aria-haspopup
            />
        </div>
    );
};

export default ReportMenu;

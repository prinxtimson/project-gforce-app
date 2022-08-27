import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Avatar } from "primereact/avatar";

import Authenticated from "../Layouts/Authenticated";
import {
    getReviews,
    getReviewsByPage,
    clear,
} from "../features/review/reviewSlice";
import ReportMenu from "../components/ReportMenu";
import DownloadButton from "../components/DownloadButton";

const FeedbacksTable = () => {
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();

    const { reviews, isLoading } = useSelector((state) => state.review);

    useEffect(() => {
        dispatch(getReviews());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (reviews) {
            setFirst(reviews.current_page - 1);
        }
    }, [reviews]);

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

    const customerBodyTemplate = (rowData) => {
        return (
            <div className="">
                <div className="tw-flex tw-items-center">
                    <div className="tw-mr-2">
                        <Avatar
                            image="/images/no_img.png"
                            size="xlarge"
                            shape="circle"
                        />
                    </div>
                    <div className="">
                        <p>{rowData.customer_name}</p>
                    </div>
                </div>
            </div>
        );
    };

    const ratingBodyTemplate = (rowData) => {
        return (
            <div className="tw-flex tw-flex-col tw-justify-center">
                <p className="tw-text-center">{rowData.rating.toFixed(1)}</p>

                <Rating
                    value={rowData.rating}
                    readOnly
                    cancel={false}
                    className="tw-mx-auto"
                    style={{ margin: "auto" }}
                />
            </div>
        );
    };

    return (
        <Authenticated>
            <ReportMenu />
            <div className="tw-mb-10">
                <div className="tw-shadow-lg tw-rounded-md tw-p-4 tw-bg-white">
                    <div className="tw-my-4">
                        <DownloadButton path="feedback" />
                    </div>
                    <DataTable
                        value={reviews?.data}
                        className="p-datatable-customers"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        dataKey="id"
                        rowHover
                        emptyMessage="No feedback found."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        loading={isLoading}
                        responsiveLayout="scroll"
                        paginator
                        rows={20}
                        first={first}
                        onPage={(e) => dispatch(getReviewsByPage(e.first + 1))}
                    >
                        <Column
                            field="id"
                            header="ID"
                            style={{ minWidth: "5rem" }}
                        />
                        <Column
                            field="customer"
                            header="Customer"
                            body={customerBodyTemplate}
                            style={{ minWidth: "14rem" }}
                        />
                        <Column
                            field="comment"
                            header="Comment"
                            style={{ minWidth: "22rem" }}
                        />
                        <Column
                            field="rating"
                            header="Rating"
                            body={ratingBodyTemplate}
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="created_at"
                            header="Created At"
                            dataType="date"
                            style={{ minWidth: "10rem" }}
                            body={dateBodyTemplate}
                        />
                    </DataTable>
                </div>
            </div>
        </Authenticated>
    );
};

export default FeedbacksTable;

const exmples = [
    {
        id: "5",
        created_at: "01/01/21 13PM",
        customer_name: "Hunter Bidden",
        comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl turpis, luctus quis convallis at, interdum vitae dui. Donec mattis nulla massa, in vehicula ante maximus a. Quisque sit amet quam lacus. Morbi ullamcorper diam nec tortor interdum sodales eu sit amet lacus.",
        rating: 3.4,
        menu_name: "Salted Beef",
    },
    {
        id: "6",
        created_at: "01/01/21 13PM",
        customer_name: "Hunter Bidden",
        comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl turpis, luctus quis convallis at, interdum vitae dui. Donec mattis nulla massa, in vehicula ante maximus a. Quisque sit amet quam lacus. Morbi ullamcorper diam nec tortor interdum sodales eu sit amet lacus.",
        rating: 4.5,
        menu_name: "Salted Beef",
    },
    {
        id: "1",
        created_at: "01/01/21 13PM",
        customer_name: "Hunter Bidden",
        comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl turpis, luctus quis convallis at, interdum vitae dui. Donec mattis nulla massa, in vehicula ante maximus a. Quisque sit amet quam lacus. Morbi ullamcorper diam nec tortor interdum sodales eu sit amet lacus.",
        rating: 4.0,
        menu_name: "Salted Beef",
    },
];

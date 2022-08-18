import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Avatar } from "primereact/avatar";

import Authenticated from "../Layouts/Authenticated";
import {
    getReviews,
    getReviewsByPage,
    clear,
} from "../features/review/reviewSlice";

const ReviewsTable = () => {
    const navigate = useNavigate();
    const [selectedReviews, setSelectedReviews] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
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
                <h5 className="tw-m-0">Reviews</h5>
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

    const actionBodyTemplate = () => {
        return (
            <div className="">
                <button className="tw-border-0 tw-mx-4">
                    <i className="pi pi-check"></i>
                </button>
                <button className="tw-border-0">
                    <i className="pi pi-trash"></i>
                </button>
            </div>
        );
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

    const header = renderHeader();

    return (
        <Authenticated>
            <div className="tw-mb-10">
                <div className="tw-shadow-lg tw-rounded-md tw-p-4 tw-bg-white">
                    <DataTable
                        value={reviews?.data}
                        className="p-datatable-customers"
                        header={header}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        dataKey="id"
                        rowHover
                        selection={selectedReviews}
                        emptyMessage="No review found."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        filters={filters}
                        filterDisplay="menu"
                        loading={isLoading}
                        responsiveLayout="scroll"
                        onSelectionChange={(e) => setSelectedReviews(e.value)}
                        paginator
                        rows={20}
                        first={first}
                        onPage={(e) => dispatch(getReviewsByPage(e.first + 1))}
                    >
                        <Column
                            selectionMode="multiple"
                            headerStyle={{ width: "3em" }}
                        ></Column>
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
                            headerStyle={{
                                width: "10rem",
                                textAlign: "center",
                            }}
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

export default ReviewsTable;

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

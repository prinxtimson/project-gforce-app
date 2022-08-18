import { useState, useEffect } from "react";
import Authenticated from "../Layouts/Authenticated";

const InvoiceDetails = () => {
    return (
        <Authenticated>
            <div className="">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-4">
                    <div className="tw-col-span-3 tw-p-3 tw-shadow-lg tw-rounded-md tw-bg-white">
                        <div className="tw-shadow-lg tw-rounded-md tw-bg-white tw-p4">
                            <div className="tw-flex tw-justify-between">
                                <div className="">
                                    <div className="">
                                        <h3>Invoice Number</h3>
                                        INV-20202
                                    </div>
                                    <div className="tw-mb-2">
                                        Issue Date:
                                        <span className="tw-mx-3">
                                            23/05/2020
                                        </span>
                                    </div>
                                    <div className="">
                                        Due Date:
                                        <span className="tw-mx-3">
                                            23/05/2020
                                        </span>
                                    </div>
                                </div>

                                <div className="tw-mb-2">
                                    <h4>Items Details</h4>
                                    <div className="tw-grid tw-grid-cols-6">
                                        <div className="tw-col-span-3">
                                            Item Name
                                        </div>
                                        <div className="">Quantity</div>
                                        <div className="">Price</div>
                                        <div className="">Total</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tw-shadow-lg tw-rounded-md tw-bg-white tw-p4"></div>
                </div>
            </div>
        </Authenticated>
    );
};

export default InvoiceDetails;

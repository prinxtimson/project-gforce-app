//import React from "react";
import { Avatar } from "primereact/avatar";

const Header = () => {
    return (
        <div className="">
            <div className="tw-max-w-8xl tw-mx-auto">
                <div className="tw-py-4 tw-border-b tw-border-slate-900/10 lg:tw-px-8 dark:tw-border-slate-300/10 tw-mx-4 lg:tw-mx-0">
                    <div className="tw-relative tw-flex tw-items-center">
                        <div className="tw-mr-3 tw-flex-none tw-w-[2.0625rem] tw-overflow-hidden md:tw-w-auto">
                            <h3>Blacky Restaurant</h3>
                        </div>
                        <div className="tw-relative tw-hidden lg:tw-flex tw-items-center tw-ml-auto">
                            <div className="tw-flex tw-justify-between">
                                <div className=""></div>
                                <div className="tw-flex tw-items-center tw-ml-6 tw-pl-6">
                                    <div className="tw-mr-4">
                                        <i className="pi pi-bell" />
                                    </div>
                                    <div className="tw-mx-2">
                                        <Avatar image="user.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

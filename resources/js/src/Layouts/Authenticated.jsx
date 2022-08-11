// import { useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Authenticated({ children }) {
    return (
        <div className="tw-grow">
            <Header />
            <div className="tw-max-w-8xl tw-mx-auto tw-px-4 sm:tw-px-6 md:tw-px-8">
                <section
                    className="tw-hidden lg:tw-block tw-fixed tw-z-20 tw-inset-0 tw-left-[max(0px,calc(50%-45rem))] tw-right-auto tw-w-[19.5rem] tw-p-10 tw-overflow-y-auto tw-bg-gray-900"
                    style={{ top: "4.5rem" }}
                >
                    <Sidebar />
                </section>
                <section className="lg:tw-pl-[19.5rem]">
                    <div className="tw-max-w-3xl tw-mx-auto tw-pt-10 xl:tw-max-w-none xl:tw-ml-0 xl:tw-pr-16">
                        <main>{children}</main>
                    </div>
                </section>
            </div>
        </div>
    );
}

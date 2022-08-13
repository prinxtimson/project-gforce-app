import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Sidebar as PrimeSidebar } from "primereact/sidebar";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Authenticated({ children }) {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const onOpenSidebar = () => setVisible(true);
    return (
        <div className="tw-grow tw-bg-orange-200">
            <Header onOpenSidebar={onOpenSidebar} />
            <PrimeSidebar
                visible={visible}
                //style={{ padding: 20 }}
                onHide={() => setVisible(false)}
                className="tw-bg-amber-700"
            >
                <Sidebar />
            </PrimeSidebar>
            <div className="tw-max-w-8xl tw-mx-auto tw-px-4 sm:tw-px-6 md:tw-px-8">
                <section
                    className="tw-hidden lg:tw-block tw-fixed tw-z-20 tw-inset-0  tw-right-auto tw-w-[19.5rem] tw-p-10 tw-overflow-y-auto tw-bg-amber-700"
                    style={{ top: "4.4rem" }}
                >
                    <Sidebar />
                </section>
                <section className="lg:tw-pl-[19.5rem]">
                    <div className="tw-max-w-3xl tw-mx-auto tw-pt-10 xl:tw-max-w-none xl:tw-ml-0 ">
                        <main>{children}</main>
                    </div>
                </section>
            </div>
        </div>
    );
}

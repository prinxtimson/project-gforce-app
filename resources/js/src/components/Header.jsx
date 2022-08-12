import { useRef } from "react";
import { Menu } from "primereact/menu";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { Avatar } from "primereact/avatar";

const Header = ({ onOpenSidebar }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    };
    const menu = useRef(null);
    let items = [
        {
            label: "My Account",
            icon: "pi pi-fw pi-user",
        },
        {
            label: "Change Password",
            icon: "pi pi-fw pi-lock",
        },
        {
            label: "Logout",
            icon: "pi pi-fw pi-sign-out",
            command: () => onLogout(),
        },
    ];
    return (
        <div className="tw-z-50 tw-sticky tw-top-0 tw-w-full tw-bg-amber-700">
            <div className="tw-max-w-8xl tw-mx-auto">
                <div className="tw-py-3  tw-border-slate-900/10 lg:tw-px-8 dark:tw-border-slate-300/10 tw-mx-4 lg:tw-mx-0">
                    <div className="tw-relative tw-flex tw-items-center">
                        <button
                            type="button"
                            className="lg:tw-hidden tw-text-white hover:tw-text-slate-200 dark:tw-text-white dark:hover:tw-text-slate-200 tw-mx-4"
                            onClick={onOpenSidebar}
                        >
                            <span className="tw-sr-only">Navigation</span>
                            <svg width="24" height="24">
                                <path
                                    d="M5 6h14M5 12h14M5 18h14"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                ></path>
                            </svg>
                        </button>

                        <div className="tw-mr-3 tw-flex-none tw-w-[2.0625rem] tw-overflow-hidden md:tw-w-auto tw-relative">
                            <Link to="/">
                                <img
                                    src="/blacky_logo.jpg"
                                    style={{ height: 55 }}
                                    alt="Blacky Restaurant"
                                />
                            </Link>
                        </div>
                        <div className="tw-relative tw-flex tw-items-center tw-ml-auto">
                            <div className="tw-flex tw-justify-between">
                                <div className=""></div>
                                <div className="tw-flex tw-items-center tw-ml-6 tw-pl-6">
                                    <div className="tw-mr-4">
                                        <i className="pi pi-bell tw-text-white" />
                                    </div>
                                    <div className="tw-mx-2">
                                        <Avatar
                                            image="/images/no_img.png"
                                            shape="circle"
                                            size="large"
                                            onClick={(event) =>
                                                menu.current.toggle(event)
                                            }
                                        />
                                        <Menu model={items} popup ref={menu} />
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

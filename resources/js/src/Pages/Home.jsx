import { Link } from "react-router-dom";
import Guest from "../Layouts/Guest";

const Home = () => {
    return (
        <Guest>
            <div className="tw-max-w-screen-lg">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-0">
                    <div className="tw-relative">
                        <img
                            src="/blacky_restaurant.jpg"
                            alt=""
                            style={{ width: "100%", minHeight: "100%" }}
                        />
                        <Link
                            to="/login"
                            className="tw-absolute tw-top-3/4 tw-bg-slate-400 tw-px-5 tw-py-2 tw-inset-x-1/4 tw-text-lg tw-rounded tw-w-64 tw-text-center"
                        >
                            Login
                        </Link>
                    </div>
                    <div className="tw-grid tw-grid-cols-2 tw-gap-0">
                        <div className="">
                            <img
                                src="/images/veg_img_2.jpg"
                                alt=""
                                style={{ width: "100%", minHeight: "100%" }}
                            />
                        </div>
                        <div className="">
                            <img
                                src="/images/veg_img.jpg"
                                alt=""
                                style={{ width: "100%", minHeight: "100%" }}
                            />
                        </div>
                        <div className="">
                            <img
                                src="/images/veg_img_6.jpg"
                                alt=""
                                style={{ width: "100%", minHeight: "100%" }}
                            />
                        </div>
                        <div className="">
                            <img
                                src="/images/veg_img_5.jpg"
                                alt=""
                                style={{ width: "100%", minHeight: "100%" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    );
};

export default Home;

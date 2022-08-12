import { useState, useRef, useEffect } from "react";
import { Timeline } from "primereact/timeline";
import { GMap } from "primereact/gmap";

import { loadGoogleMaps, removeGoogleMaps } from "../../GoogleMaps";
import Authenticated from "../Layouts/Authenticated";

const SingleOrder = () => {
    const [googleMapsReady, setGoogleMapsReady] = useState(false);
    const gmap = useRef(null);

    const events = [
        {
            status: "Ordered",
            date: "15/10/2020 10:30",
            icon: "pi pi-shopping-cart",
            color: "#9C27B0",
            image: "game-controller.jpg",
        },
        {
            status: "Processing",
            date: "15/10/2020 14:00",
            icon: "pi pi-cog",
            color: "#673AB7",
        },
        {
            status: "Shipped",
            date: "15/10/2020 16:15",
            icon: "pi pi-shopping-cart",
            color: "#FF9800",
        },
        {
            status: "Delivered",
            date: "16/10/2020 10:00",
            icon: "pi pi-check",
            color: "#607D8B",
        },
    ];

    const options = {
        center: { lat: 36.890257, lng: 30.707417 },
        zoom: 12,
    };

    const onChangeText = (e) => {
        // const newProducts = products.filter((prod) => {
        //   const { name, description } = prod;
        //   const prodData = `${name.toUpperCase()} ${description.toUpperCase()}`;
        //   const searchQuery = e.target.value.toUpperCase();
        //   return prodData.indexOf(searchQuery) > -1;
        // });
        // setResult(newProducts);
    };

    useEffect(() => {
        loadGoogleMaps(() => {
            setGoogleMapsReady(true);
        });

        return () => {
            removeGoogleMaps();
        };
    }, []);

    const customizedMarker = (item) => {
        return (
            <span
                className="tw-border-2 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shrink-0"
                style={{ width: 60, height: 60 }}
            >
                <i className={item.icon} style={{ fontSize: 30 }}></i>
            </span>
        );
    };

    return (
        <Authenticated>
            <div className="">
                <div className="tw-my-5 tw-shadow-lg tw-rounded-md tw-py-3 tw-bg-white">
                    <div className="tw-p-5">
                        <Timeline
                            value={events}
                            layout="horizontal"
                            align="center"
                            marker={customizedMarker}
                            content={(item) => item.status}
                        />
                    </div>
                </div>

                <div className="tw-grid tw-grid-cols-3 tw-gap-4">
                    <div className="tw-col-span-2 ">
                        {googleMapsReady && (
                            <div className="">
                                <GMap
                                    ref={gmap}
                                    options={options}
                                    style={{
                                        width: "100%",
                                        minHeight: "320px",
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="tw-shadow-lg tw-rounded-md tw-py-4 tw-bg-white">
                        <div className="tw-flex tw-gap-3 tw-flex-col tw-items-center tw-p-2">
                            <div className="">
                                <img
                                    src="/images/no_img.png"
                                    alt=""
                                    className="tw-rounded-full"
                                    height={100}
                                    width={100}
                                />
                            </div>
                            <div className="">
                                <ul>
                                    <li className="tw-p-4 tw-flex">
                                        <span className="tw-mr-2">
                                            <i className="pi pi-phone"></i>
                                        </span>
                                        <span className="tw-grow">
                                            004442394859
                                        </span>
                                    </li>
                                    <li className="tw-p-4 tw-flex">
                                        <span className="tw-mr-2">
                                            <i className="pi pi-map-marker"></i>
                                        </span>
                                        <span className="tw-grow">
                                            72 Petty Coat Avenue King Jaffet
                                            BLv, Oklahoma, US.
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="tw-p-4">
                                <h4>Note:</h4>
                                <h5>
                                    I will not be in but please kindly leave
                                    delivery with neighbor.
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tw-shadow-lg tw-rounded-md tw-p-6 tw-my-8 tw-bg-white">
                    <div className="tw-grid tw-grid-cols-8 tw-mb-6">
                        <div className="tw-col-span-4">Item</div>
                        <div className="">Qty</div>
                        <div className="">Price</div>
                        <div className="">Total</div>
                        <div className=""></div>
                    </div>
                    {orders.map((item) => (
                        <div
                            className="tw-grid tw-grid-cols-8 tw-mb-4"
                            key={item.id}
                        >
                            <div className="tw-col-span-4 tw-flex">
                                <div className="tw-mr-2 tw-rounded-md">
                                    <img
                                        src={item.img}
                                        alt=""
                                        style={{ width: 75, height: 75 }}
                                    />
                                </div>
                                <div className="tw-grow">
                                    <h4>{item.name}</h4>
                                </div>
                            </div>
                            <div className="">
                                <p>{item.qty}</p>
                            </div>
                            <div className="">
                                <p>{item.price}</p>
                            </div>
                            <div className="">
                                <p>{item.total}</p>
                            </div>
                            <div className=""></div>
                        </div>
                    ))}
                </div>
            </div>
        </Authenticated>
    );
};

export default SingleOrder;

const orders = [
    {
        id: 1,
        name: "Salad served with baked potato",
        img: "/images/veg_img_2.jpg",
        qty: 1,
        price: "£7",
        total: "£7",
    },
    {
        id: 1,
        name: "Jollof served with Chicken",
        img: "/images/veg_img_4.jpg",
        qty: 3,
        price: "£10",
        total: "£30",
    },
];

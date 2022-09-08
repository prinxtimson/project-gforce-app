import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Timeline } from "primereact/timeline";
import { GMap } from "primereact/gmap";
import { useParams } from "react-router-dom";

import { loadGoogleMaps, removeGoogleMaps } from "../../GoogleMaps";
import Authenticated from "../Layouts/Authenticated";
import { getOrderById, clear } from "../features/order/orderSlice";

const SingleOrder = () => {
    const { id } = useParams();
    const [googleMapsReady, setGoogleMapsReady] = useState(false);
    const gmap = useRef(null);

    const dispatch = useDispatch();

    const { order, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.order
    );

    useEffect(() => {
        if (id) {
            dispatch(getOrderById(id));
        }

        return () => dispatch(clear());
    }, [id]);

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
            {isLoading
                ? null
                : order && (
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
                                              src={order.user.avatar}
                                              alt={order.user.name}
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
                                                      {order.phone}
                                                  </span>
                                              </li>
                                              <li className="tw-p-4 tw-flex">
                                                  <span className="tw-mr-2">
                                                      <i className="pi pi-map-marker"></i>
                                                  </span>
                                                  <span className="tw-grow">
                                                      {
                                                          JSON.parse(
                                                              order.billing_address
                                                          ).address1
                                                      }
                                                  </span>
                                              </li>
                                          </ul>
                                      </div>
                                      <div className="tw-p-4">
                                          <h4>Note:</h4>
                                          <h5></h5>
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
                              {order.items.map((item) => (
                                  <div
                                      className="tw-grid tw-grid-cols-8 tw-mb-4 tw-border-b tw-pb-3"
                                      key={item.id}
                                  >
                                      <div className="tw-col-span-4 tw-flex">
                                          <div className="tw-mr-2 tw-rounded-md">
                                              <img
                                                  src={
                                                      item.product
                                                          .featured_image
                                                  }
                                                  alt={item.product.name}
                                                  style={{
                                                      width: 75,
                                                      height: 75,
                                                  }}
                                              />
                                          </div>
                                          <div className="tw-grow">
                                              <h4>{item.product.name}</h4>
                                          </div>
                                      </div>
                                      <div className="">
                                          <p>{item.quantity}</p>
                                      </div>
                                      <div className="">
                                          <p>{item.price}.00</p>
                                      </div>
                                      <div className="">
                                          <p>{item.quantity * item.price}.00</p>
                                      </div>
                                      <div className=""></div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
        </Authenticated>
    );
};

export default SingleOrder;

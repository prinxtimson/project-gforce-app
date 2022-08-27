import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Image } from "primereact/image";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";

import Authenticated from "../Layouts/Authenticated";

const NewReservation = () => {
    const [data, setData] = useState({});
    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Authenticated>
            <div className="tw-shadow-lg tw-rounded-md tw-p-4  tw-bg-white">
                <div className="tw-py-10 tw-grid tw-grid-cols-1 xl:tw-grid-cols-3 tw-gap-4">
                    <div className="tw-col-span-2 tw-bg-white tw-shadow-md tw-p-4">
                        <div className="tw-text-center tw-mb-5">
                            <div className="tw-text-900 tw-text-xl tw-font-medium tw-mb-12">
                                Book Reservation
                            </div>
                        </div>

                        <div className="">
                            <form onSubmit={onSubmit}>
                                <div className="field tw-mb-6">
                                    <span className="p-float-label ">
                                        <InputText
                                            name="name"
                                            type="text"
                                            className="tw-w-full "
                                            value={data.name}
                                            onChange={handleOnChange}
                                            autoComplete="off"
                                        />
                                        <label htmlFor="name" className="">
                                            Name *
                                        </label>
                                    </span>
                                </div>
                                <div className="field tw-mb-6">
                                    <span className="p-float-label ">
                                        <InputText
                                            name="sku"
                                            type="text"
                                            className="tw-w-full "
                                            value={data.sku}
                                            onChange={handleOnChange}
                                            autoComplete="off"
                                        />
                                        <label htmlFor="sku" className="">
                                            SKU *
                                        </label>
                                    </span>
                                </div>
                                <div className="field tw-mb-6">
                                    <span className="p-float-label">
                                        <InputTextarea
                                            name="description"
                                            type="text"
                                            className="tw-w-full "
                                            value={data.description}
                                            onChange={handleOnChange}
                                            autoComplete="off"
                                            rows={5}
                                            cols={30}
                                        />
                                        <label
                                            htmlFor="description"
                                            className=""
                                        >
                                            Description
                                        </label>
                                    </span>
                                </div>
                                <div className="field tw-mb-6">
                                    <span className="p-float-label">
                                        <InputTextarea
                                            name="ingredents"
                                            type="text"
                                            className="tw-w-full "
                                            value={data.ingredents}
                                            onChange={handleOnChange}
                                            autoComplete="off"
                                            rows={2}
                                            cols={30}
                                        />
                                        <label
                                            htmlFor="ingredents"
                                            className=""
                                        >
                                            Ingredents
                                        </label>
                                    </span>
                                </div>
                                <div className="field tw-mb-6">
                                    <span className="p-float-label ">
                                        <InputNumber
                                            name="price"
                                            inputId="integeronly"
                                            prefix="£"
                                            className="tw-w-full"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    price: e.value,
                                                })
                                            }
                                            autoComplete="off"
                                        />
                                        <label htmlFor="price" className="">
                                            Price *
                                        </label>
                                    </span>
                                </div>
                                <div className="field tw-mb-6">
                                    <span className="p-float-label ">
                                        <InputNumber
                                            name="discount"
                                            prefix="£"
                                            inputId="integeronly"
                                            className="tw-w-full "
                                            value={data.discount}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    discount: e.value,
                                                })
                                            }
                                            autoComplete="off"
                                        />
                                        <label htmlFor="discount" className="">
                                            Discount
                                        </label>
                                    </span>
                                </div>
                                <div className="field tw-mb-6">
                                    <span className="p-float-label ">
                                        <InputNumber
                                            name="quantity"
                                            inputId="integeronly"
                                            className="tw-w-full "
                                            value={data.quantity}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    quantity: e.value,
                                                })
                                            }
                                            autoComplete="off"
                                        />
                                        <label htmlFor="quantity" className="">
                                            Quantity *
                                        </label>
                                    </span>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={pLoading}
                                    label="Submit"
                                    className="tw-w-full"
                                />
                            </form>
                        </div>
                    </div>
                    <div className="">
                        <div className="tw-bg-white tw-shadow-md tw-p-4 tw-my-4">
                            <div className="tw-text-center tw-mb-5">
                                <div className="tw-text-900 tw-text-xl tw-font-medium tw-mb-12">
                                    Feature Image
                                </div>
                            </div>

                            <div className="">
                                <div className="tw-mb-4">
                                    <Image
                                        src={
                                            file
                                                ? URL.createObjectURL(file)
                                                : product
                                                ? product.media[0]?.original_url
                                                : ""
                                        }
                                        alt="Featured Image"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="tw-w-full tw-rounded-lg tw-p-2 tw-bg-neutral-900 hover:tw-bg-neutral-800 tw-text-white lg:tw-px-6"
                                    onClick={() => inputRef.current.click()}
                                >
                                    Select Image
                                </button>
                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    hidden
                                    accept="image/*"
                                    ref={inputRef}
                                />
                            </div>
                        </div>

                        <div className="tw-bg-white tw-shadow-md tw-p-4">
                            <div className="tw-text-center tw-mb-5">
                                <div className="tw-text-900 tw-text-xl tw-font-medium tw-mb-12">
                                    Category
                                </div>
                            </div>

                            <div className="">
                                <MultiSelect
                                    value={data.categories}
                                    options={categories}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            categories: e.value,
                                        })
                                    }
                                    optionLabel="name"
                                    placeholder="Select Category"
                                    maxSelectedLabels={3}
                                    optionValue="id"
                                    className="tw-w-full"
                                />
                                <div className="tw-my-2">
                                    <button
                                        onClick={() => setShow(!show)}
                                        className="tw-text-sky-500 tw-underline"
                                    >
                                        Add New Category
                                    </button>
                                </div>
                                {show && (
                                    <div className="tw-mt-10">
                                        <form onSubmit={onSaveCategory}>
                                            <div className="field tw-mb-6">
                                                <span className="p-float-label ">
                                                    <InputText
                                                        name="name"
                                                        type="text"
                                                        className="tw-w-full "
                                                        value={catData.name}
                                                        onChange={(e) =>
                                                            setCatData({
                                                                ...catData,
                                                                name: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        autoComplete="off"
                                                    />
                                                    <label
                                                        htmlFor="name"
                                                        className=""
                                                    >
                                                        Name *
                                                    </label>
                                                </span>
                                            </div>
                                            <div className="field tw-mb-3">
                                                <span className="p-float-label">
                                                    <InputTextarea
                                                        name="description"
                                                        type="text"
                                                        className="tw-w-full "
                                                        value={
                                                            catData.description
                                                        }
                                                        onChange={(e) =>
                                                            setCatData({
                                                                ...catData,
                                                                description:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        autoComplete="off"
                                                        rows={3}
                                                        cols={30}
                                                    />
                                                    <label
                                                        htmlFor="description"
                                                        className=""
                                                    >
                                                        Description
                                                    </label>
                                                </span>
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                                label="Add Category"
                                                className="tw-w-full"
                                            />
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default NewReservation;

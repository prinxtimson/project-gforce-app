import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Image } from "primereact/image";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";

import Authenticated from "../Layouts/Authenticated";
import {
    getCategories,
    saveCategory,
    clear,
    reset,
} from "../features/category/categorySlice";
import {
    saveProduct,
    getProductById,
    reset as pReset,
    clear as pClear,
    updateProduct,
} from "../features/product/productSlice";

const AddProduct = () => {
    const { id } = useParams();
    const inputRef = useRef(null);
    const [file, setFile] = useState("");
    const [show, setShow] = useState(false);
    const [data, setData] = useState({
        name: "",
        sku: "",
        description: "",
        ingredents: "",
        price: 0,
        discount: 0,
        quantity: 0,
        categories: [],
    });

    const [catData, setCatData] = useState({
        name: "",
        description: "",
    });

    const dispatch = useDispatch();

    const { categories, category, isLoading, isSuccess, isError, message } =
        useSelector((state) => state.category);

    const {
        product,
        isLoading: pLoading,
        isSuccess: pSuccess,
        isError: pError,
        message: pMessage,
    } = useSelector((state) => state.product);

    useEffect(() => {
        if (id) {
            dispatch(getProductById(id));
        }

        return () => dispatch(pClear());
    }, [id]);

    useEffect(() => {
        if (product) {
            setData({
                name: product.name || "",
                sku: product.sku || "",
                description: product.description || "",
                ingredents: product.ingredents || "",
                price: product.price || 0,
                discount: product.discount || 0,
                quantity: product.quantity || 0,
                categories: [...product.categories.map((val) => val.id)],
            });
        }
    }, [product]);

    useEffect(() => {
        dispatch(getCategories());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess && category) {
            setData({ ...data, categories: [...data.categories, category.id] });
            setCatData({
                name: "",
                description: "",
            });
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    useEffect(() => {
        if (pError) {
            toast.error(pMessage);
        }

        if (pSuccess) {
            toast.success(pMessage);
            if (!id) {
                setData({
                    name: "",
                    sku: "",
                    description: "",
                    ingredents: "",
                    price: 0,
                    discount: 0,
                    quantity: 0,
                    categories: [],
                });
                setFile(null);
            }
        }

        dispatch(pReset());
    }, [pError, pSuccess, pMessage, dispatch]);

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        if (file) {
            formData.append("featured_img", file);
        }
        formData.append("_method", "put");

        for (let [key, value] of Object.entries(data)) {
            if (key === "categories") {
                for (let i = 0; i < value.length; i++) {
                    formData.append("categories[]", value[i]);
                }
            } else {
                formData.append(key, value);
            }
        }
        if (id) {
            dispatch(updateProduct({ id, data: formData }));
        } else {
            dispatch(saveProduct(formData));
        }
    };

    const onSaveCategory = (e) => {
        e.preventDefault();

        dispatch(saveCategory(catData));
    };

    return (
        <Authenticated>
            <div className="tw-bg-white tw-shadow-md tw-p-4">
                <div className="tw-py-10 tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-4">
                    <div className="tw-col-span-2 tw-bg-white tw-shadow-md tw-p-4">
                        <div className="tw-text-center tw-mb-5">
                            <div className="tw-text-900 tw-text-xl tw-font-medium tw-mb-12">
                                Add/Update Product
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
                                            Ingredients
                                        </label>
                                    </span>
                                </div>
                                <div className="field tw-mb-6">
                                    <span className="p-float-label ">
                                        <InputNumber
                                            name="price"
                                            mode="decimal"
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
                                            mode="decimal"
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

export default AddProduct;

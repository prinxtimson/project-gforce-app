import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import axios from "axios";

import Authenticated from "../Layouts/Authenticated";
import {
    getTaskById,
    saveTask,
    updateTask,
    clear,
    reset,
} from "../features/task/taskSlice";

const NewTask = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState([]);
    const [data, setData] = useState({
        task: "",
        user_id: "",
        duration: 0,
        consistency: "",
    });

    const dispatch = useDispatch();

    const { task, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.task
    );

    const selectItems = ["Bi weekly", "On request", "Tri-Weekly", "Daily"];

    useEffect(() => {
        if (id) {
            dispatch(getTaskById(id));
        }

        return () => dispatch(clear());
    }, [id]);

    useEffect(() => {
        axios.get("/api/employees").then((res) => {
            setEmployee(res.data);
        });
    }, []);

    useEffect(() => {
        if (task) {
            setData({
                id: task.id,
                task: task.task || "",
                user_id: task.user_id || "",
                duration: task.duration || 0,
                consistency: task.consistency || "",
            });
        }
    }, [task]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success("Task added/updated successfuly.");
            setData({
                id: task?.id,
                task: task?.task || "",
                user_id: task?.user_id || "",
                duration: task?.duration || 0,
                consistency: task?.consistency || "",
            });
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (id) {
            dispatch(updateTask(data));
        } else {
            dispatch(saveTask(data));
        }
    };

    return (
        <Authenticated>
            <div className="tw-flex tw-items-center tw-justify-center tw-mb-10">
                <div className="tw-card tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md tw-w-full md:tw-w-[36.5rem]">
                    <div className="tw-text-center tw-mb-5">
                        <div className="tw-text-900 tw-text-xl tw-font-medium tw-mb-12">
                            New Task
                        </div>
                    </div>

                    <div className="">
                        <form onSubmit={onSubmit}>
                            <div className="field tw-mb-6">
                                <span className="p-float-label ">
                                    <InputText
                                        name="task"
                                        className="tw-w-full "
                                        value={data.task}
                                        onChange={handleOnChange}
                                        autoComplete="off"
                                        autoFocus
                                    />
                                    <label htmlFor="task" className="">
                                        Task
                                    </label>
                                </span>
                            </div>

                            <div className="field tw-mb-6">
                                <span className="p-float-label">
                                    <Dropdown
                                        name="user_id"
                                        value={data.user_id}
                                        options={employee}
                                        onChange={handleOnChange}
                                        placeholder="Select user_id"
                                        className="tw-w-full"
                                        optionLabel="name"
                                        filter
                                        showClear
                                        filterBy="name"
                                        optionValue="id"
                                    />
                                    <label htmlFor="user_id" className="">
                                        Select Employee
                                    </label>
                                </span>
                            </div>
                            <div className="field tw-mb-6">
                                <span className="p-float-label ">
                                    <InputNumber
                                        id="duration"
                                        name="duration"
                                        inputId="integeronly"
                                        className="tw-w-full"
                                        value={data.duration}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                duration: e.value,
                                            })
                                        }
                                        useGrouping={false}
                                    />
                                    <label htmlFor="duration" className="">
                                        Duration
                                    </label>
                                </span>
                                <small id="duration-help" className="block">
                                    Enter duration in week.
                                </small>
                            </div>
                            <div className="field tw-mb-6">
                                <span className="p-float-label">
                                    <Dropdown
                                        name="consistency"
                                        value={data.consistency}
                                        options={selectItems}
                                        onChange={handleOnChange}
                                        placeholder="Consistency"
                                        className="tw-w-full"
                                    />
                                    <label htmlFor="consistency">
                                        Select Consistency
                                    </label>
                                </span>
                            </div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                label="Submit"
                                className="tw-w-full"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default NewTask;

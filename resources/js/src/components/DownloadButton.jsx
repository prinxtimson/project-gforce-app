import { useState } from "react";
import { Dropdown } from "primereact/dropdown";

const TYPES = [
    { name: "Excel", value: "xlsx" },
    { name: "CSV", value: "csv" },
    { name: "PDF", value: "pdf" },
];

const DownloadButton = ({ path }) => {
    const [type, setType] = useState("xlsx");

    return (
        <div className="tw-mx-3 tw-flex tw-items-center">
            <Dropdown
                value={type}
                options={TYPES}
                onChange={(e) => setType(e.value)}
                placeholder="Select Ext"
                optionLabel="name"
            />
            <span>
                <a
                    href={`/download/${path}?type=${type}`}
                    className="tw-mx-3 tw-border tw-rounded-md tw-text-dark hover:tw-bg-slate-600 hover:tw-text-white tw-p-4"
                    download
                >
                    <span className="tw-mx-2">Download</span>
                    <i
                        className="pi pi-download tw-text-3xl"
                        data-pr-tooltip="Download"
                    ></i>
                </a>
            </span>
        </div>
    );
};

export default DownloadButton;

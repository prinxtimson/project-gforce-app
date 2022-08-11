export default function Guest({ children }) {
    return (
        <div className="tw-grow tw-flex tw-flex-col sm:tw-justify-center tw-items-center tw-pt-6 sm:tw-pt-0 tw-bg-gray-100">
            <div className="tw-mt-6 tw-px-6 tw-py-4 tw-bg-white tw-shadow-md tw-overflow-hidden sm:tw-rounded-lg">
                {children}
            </div>
        </div>
    );
}

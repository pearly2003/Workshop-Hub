import { ArrowLeft, Save } from "lucide-react";

const FormHeader = ({ title, onBack, isUpdateMode }) => {

    return (
        <>
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h3 className="text-lg font-medium text-gray-800 border-l-4 border-[var(--color-primary)] pl-2 tracking-tight">
                    {title}
                </h3>
                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl shadow-sm transition-all whitespace-nowrap bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                >
                    <ArrowLeft size={15} />
                    Back
                </button>
            </div>
        </>
    )
}

export default FormHeader
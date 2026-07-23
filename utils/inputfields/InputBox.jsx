import React, { useState, useEffect } from "react";
import { UploadCloud, X, Image as ImageIcon, Trash2 } from "lucide-react";

export const InputGroup = ({
    label,
    value,
    setter,
    type = "text",
    error,
    maxLength,
    required = false,
    disabled = false,
    rightElement,
    ...props
}) => (
    <div className="flex flex-col group w-full">
        <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-[var(--color-primary)] transition-colors">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative w-full">
            <input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                disabled={disabled}
                maxLength={maxLength}
                className={`w-full floating-input rounded-lg border border-gray-300 bg-white px-2 py-2 text-[13px]
                ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"}
                ${error
                        ? "border-red-400 focus:ring-red-500/20"
                        : "border-gray-200 focus:ring-[var(--color-primary)]/20"
                    } ${rightElement ? 'pr-10' : ''}`}
                {...props}
            />
            {rightElement && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-gray-500">
                    {rightElement}
                </div>
            )}
        </div>
        {error && (
            <p className="text-red-500 text-[10px] mt-1 font-medium">{error}</p>
        )}
    </div>
);

export const TextAreaGroup = ({
    label,
    value,
    setter,
    error,
    maxLength,
    disabled = false,
    rows = 3,
    ...props
}) => (
    <div className="flex flex-col group">
        <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-[var(--color-primary)] transition-colors">
            {label}
        </label>
        <textarea
            value={value}
            onChange={(e) => setter(e.target.value)}
            disabled={disabled}
            maxLength={maxLength}
            rows={rows}
            className={`px-2 py-2 border rounded-md text-xs focus:bg-white focus:outline-none focus:ring-2 focus:border-[var(--color-primary)] transition-all resize-y
        ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"}
        ${error
                    ? "border-red-400 focus:ring-red-500/20"
                    : "border-gray-200 focus:ring-[var(--color-primary)]/20"
                }`}
            {...props}
        />
        {error && (
            <p className="text-red-500 text-[10px] mt-1 font-medium">{error}</p>
        )}
    </div>
);

export const ReadOnlyGroup = ({ label, value }) => (
    <div className="flex flex-col">
        <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">
            {label}
        </label>
        <div className="px-2 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-500">
            {value || "—"}
        </div>
    </div>
);

export const ImageUploadGroup = ({
    label,
    value,
    setter,
    error,
    disabled = false,
    className = "",
}) => {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [tempPreview, setTempPreview] = useState(null);

    // Sync tempPreview when modal opens
    useEffect(() => {
        if (isImageModalOpen) {
            setTempPreview(value || null);
        }
    }, [isImageModalOpen, value]);

    const handleModalFileChange = (e) => {

        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleApplyImage = () => {
        setter(tempPreview || "");
        setIsImageModalOpen(false);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        setter("");
    };

    return (
        <div className={`flex flex-col group ${className}`}>
            <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                {label}
            </label>

            {value ? (
                <div className="relative border border-slate-200 rounded-md bg-white px-2 py-1 flex items-center justify-between gap-3 h-[38px] overflow-hidden hover:border-blue-400 transition-all duration-200">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-6 h-6 rounded border border-gray-100 flex-shrink-0 bg-slate-50 flex items-center justify-center overflow-hidden">
                            <img src={value} alt="Preview" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[11px] text-gray-500 truncate max-w-[120px]">
                            Image selected
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        {!disabled && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsImageModalOpen(true)}
                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    title="Edit Image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleRemove}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                    title="Remove Image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => {
                        if (!disabled) {
                            setTempPreview(null);
                            setIsImageModalOpen(true);
                        }
                    }}
                    disabled={disabled}
                    className={`flex items-center justify-center gap-2 border border-dashed rounded-md h-[38px] transition-all duration-200 px-3 text-xs
                        ${disabled
                            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-slate-50/50 border-gray-300 hover:bg-slate-50 hover:border-blue-300 text-gray-500 hover:text-blue-600 cursor-pointer"
                        }`}
                >
                    <UploadCloud size={14} />
                    <span>Upload {label}</span>
                </button>
            )}

            {error && (
                <p className="text-red-500 text-[10px] mt-1 font-medium">{error}</p>
            )}

            {/* Modern custom image upload popup modal */}
            {isImageModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 transition-all duration-200">
                    <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 w-full max-w-sm overflow-hidden transform scale-100 transition-all duration-200 flex flex-col">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                                <ImageIcon size={16} className="text-[var(--color-primary)]" />
                                Upload {label}
                            </h4>
                            <button
                                type="button"
                                onClick={() => setIsImageModalOpen(false)}
                                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-5 flex flex-col items-center justify-center">
                            <div
                                onClick={() => document.getElementById(`modal-file-upload-${label}`).click()}
                                className={`w-full h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-3 cursor-pointer transition-all duration-200
                                    ${tempPreview ? "border-solid border-slate-200 bg-slate-50/30" : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400"}`}
                            >
                                <input
                                    id={`modal-file-upload-${label}`}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleModalFileChange}
                                    className="hidden"
                                />
                                {tempPreview ? (
                                    <div className="w-full h-full flex flex-col items-center justify-center">
                                        <div className="w-full h-28 rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm flex items-center justify-center p-1.5 relative">
                                            <img
                                                src={tempPreview}
                                                alt="Preview"
                                                className="w-full h-full object-contain"
                                            />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setTempPreview(null);
                                                }}
                                                className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded hover:bg-red-600 shadow-md transition-colors"
                                                title="Remove Image"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                        <span className="text-[9px] text-gray-400 font-semibold mt-1">
                                            Click inside to change image
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-gray-400 space-y-2 pointer-events-none text-center">
                                        <div className="p-2 bg-blue-50/50 text-[var(--color-primary)] rounded-full">
                                            <UploadCloud size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-700">Click to select image</p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">SVG, PNG, JPG, or GIF</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-slate-100 bg-slate-50/50">
                            <button
                                type="button"
                                onClick={() => setIsImageModalOpen(false)}
                                className="px-3.5 py-1.5 bg-white text-gray-600 font-medium rounded-lg hover:bg-gray-50 border border-gray-200 transition-all active:scale-95 text-xs"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleApplyImage}
                                className="px-3.5 py-1.5 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:brightness-110 shadow-sm transition-all active:scale-95 text-xs flex items-center gap-1"
                            >
                                Apply {label}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
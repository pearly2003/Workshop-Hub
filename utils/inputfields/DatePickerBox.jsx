import React from "react";
import { DatePicker, ConfigProvider } from "antd";
import dayjs from "dayjs";
import { formatDate } from "../DateFormate";

const parseDateToDayjs = (val) => {
    if (!val) return null;
    if (typeof val === "string" && val.includes("-")) {
        const parts = val.split("-");
        // Check if format is DD-MM-YYYY (first part length is 2, third part is 4)
        if (parts[0].length === 2 && parts[2] && parts[2].length === 4) {
            return dayjs(`${parts[2]}-${parts[1]}-${parts[0]}`);
        }
    }
    const parsed = dayjs(val);
    return parsed.isValid() ? parsed : null;
};

export const DatePickerGroup = ({
    label,
    value,
    onChange,
    error,
    disabled = false,
    format = "DD-MM-YYYY",
    placeholder = "Select date",
    required = false,
    className = "",
    minDate,
    maxDate,
    ...props
}) => {
    // antd DatePicker expects a dayjs object
    const dateValue = parseDateToDayjs(value);

    const disabledDate = (current) => {
        if (!current) return false;

        const parsedMin = parseDateToDayjs(minDate);
        const parsedMax = parseDateToDayjs(maxDate);

        const minCheck =
            parsedMin && current.isBefore(parsedMin, "day");

        const maxCheck =
            parsedMax && current.isAfter(parsedMax, "day");

        return minCheck || maxCheck;
    };

    const handleChange = (date, dateString) => {
        if (onChange) {
            onChange(date ? formatDate(date.toDate()) : "");
        }
    };

    return (
        <div className={`flex flex-col group ${className}`}>
            {label && (
                <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-[var(--color-primary)] transition-colors">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "var(--color-primary)",
                        colorBorder: error ? "#f87171" : "#d1d5db",
                        borderRadius: 8,
                        controlHeight: 32,
                        fontSize: 13,
                    },
                }}
            >
                <DatePicker
                    value={dateValue}
                    onChange={handleChange}
                    format={format}
                    disabled={disabled}
                    placeholder={placeholder}
                    disabledDate={disabledDate}
                    className={`w-full hover:border-[var(--color-primary)] ${error ? "border-red-400" : ""}`}
                    {...props}
                />
            </ConfigProvider>
            {error && (
                <p className="text-red-500 text-[10px] mt-1 font-medium">{error}</p>
            )}
        </div>
    );
};

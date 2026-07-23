import React from "react";
import Select from "react-select";

export const commonSelectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "34px",
    borderRadius: "0.75rem",
    padding: "0px",
    // backgroundColor: "#F9FAFB",
    backgroundColor: "#FFF",
    borderColor: state.selectProps.hasError ? "#ef4444" : "#E5E7EB",
    boxShadow: "none",
    "&:hover": { borderColor: "#3b82f6" },
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  valueContainer: (base) => ({
    ...base,
    minHeight: "34px",
    padding: "0 0.75rem",
  }),
  indicatorsContainer: (base) => ({
    ...base,
    minHeight: "34px",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9CA3AF",
    fontSize: "13px",
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: "13px",
  }),
};

export const SelectGroup = ({
  label,
  value,
  onChange,
  options,
  error,
  disabled = false,
  required = false,
  placeholder = "",
  ...props
}) => {
  const selectedOption = options?.find((opt) => opt.value == value) || null;

  const handleChange = (selected) => {
    if (onChange) {
      onChange(selected ? selected.value : "");
    }
  };

  return (
    <div className="flex flex-col group">
      <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-[var(--color-primary)] transition-colors">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isDisabled={disabled}
        placeholder={placeholder}
        hasError={!!error}
        styles={commonSelectStyles}
        menuPortalTarget={document.body}
        {...props}
      />
      {error && <p className="text-xs text-red-500 px-1">{error}</p>}
    </div>
  );
};

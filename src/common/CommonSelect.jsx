import React from "react";
import Select from "react-select";

// ─── Shared style factory ─────────────────────────────────────────────────────
const buildStyles = (hasError) => ({
  control: (base, state) => ({
    ...base,
    minHeight: "30px",
    height: "30px",
    fontSize: "0.75rem",
    borderRadius: "0.5rem",
    borderColor: hasError
      ? "#f87171"
      : state.isFocused
        ? "var(--color-primary)"
        : "#e5e7eb",
    boxShadow: state.isFocused
      ? hasError
        ? "0 0 0 2px rgba(239,68,68,0.2)"
        : "0 0 0 2px color-mix(in srgb, var(--color-primary) 20%, transparent)"
      : "none",
    backgroundColor: state.isDisabled ? "#f3f4f6" : "#fff",
    transition: "all 0.15s",
    cursor: state.isDisabled ? "not-allowed" : "default",
    "&:hover": { borderColor: "var(--color-primary)" },
  }),
  valueContainer: (base) => ({ ...base, padding: "0 10px", height: "30px" }),
  indicatorsContainer: (base) => ({ ...base, height: "30px" }),
  dropdownIndicator: (base) => ({ ...base, padding: "4px" }),
  clearIndicator: (base) => ({ ...base, padding: "4px" }),
  menu: (base) => ({ ...base, fontSize: "0.75rem", zIndex: 9999 }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "var(--color-primary)"
      : state.isFocused
        ? "color-mix(in srgb, var(--color-primary) 10%, transparent)"
        : "#fff",
    color: state.isSelected ? "#fff" : "#374151",
    padding: "2px 8px",
  }),
  placeholder: (base) => ({ ...base, color: "#9ca3af" }),
  singleValue: (base) => ({ ...base, color: "#111827" }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "color-mix(in srgb, var(--color-primary) 15%, transparent)",
    borderRadius: "4px",
  }),
  multiValueLabel: (base) => ({ ...base, color: "var(--color-primary)", fontSize: "0.7rem" }),
  multiValueRemove: (base) => ({
    ...base,
    color: "var(--color-primary)",
    "&:hover": { backgroundColor: "var(--color-primary)", color: "#fff" },
  }),
  input: (base) => ({ ...base, margin: 0, padding: 0 }),
});

/**
 * CommonSelect
 *
 * Reusable React Select wrapper styled to match the ERP design system.
 *
 * Props:
 *  - label        {string}   Field label (shown above)
 *  - value        {object|object[]|null}  Selected option(s) — { value, label }
 *  - onChange     {function} Called with the selected option object (or null)
 *  - options      {Array}    Array of { value, label } objects
 *  - placeholder  {string}   Placeholder text
 *  - error        {string}   Validation error message
 *  - isClearable  {boolean}  Show clear (×) button (default: true)
 *  - isDisabled   {boolean}  Disable the select
 *  - isLoading    {boolean}  Show loading spinner while fetching options
 *  - isMulti      {boolean}  Allow multiple selections
 *  - noOptionsText {string}  Custom "no options" message
 */
const CommonSelect = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  error,
  isClearable = true,
  isDisabled = false,
  isLoading = false,
  isMulti = false,
  noOptionsText = "No options available",
}) => (
  <div className="flex flex-col group">
    {label && (
      <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-[var(--color-primary)] transition-colors">
        {label}
      </label>
    )}
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      isClearable={isClearable}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isMulti={isMulti}
      styles={buildStyles(!!error)}
      noOptionsMessage={() => noOptionsText}
      loadingMessage={() => "Loading..."}
    />
    {error && (
      <p className="text-red-500 text-[10px] mt-1 font-medium">{error}</p>
    )}
  </div>
);

export default CommonSelect;

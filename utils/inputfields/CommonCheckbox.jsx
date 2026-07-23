// import React from "react";

// const CommonCheckbox = ({
//   id,
//   checked = false,
//   onChange,
//   label = "Status",
//   disabled = false,
//   className = "",
// }) => {
//   return (
//     <label
//       htmlFor={id}
//       className={`cursor-pointer gap-3 inline-flex items-center px-4 rounded-2xl ${
//         disabled ? "opacity-50 cursor-not-allowed" : ""
//       } ${className}`}
//     >
//       <input
//         id={id}
//         type="checkbox"
//         checked={checked}
//         onChange={(e) => onChange && onChange(e.target.checked)}
//         disabled={disabled}
//         className="peer hidden"
//       />

//       <div className="flex h-5 w-5 items-center justify-center rounded-lg border-2 border-slate-200 transition-all peer-checked:border-[var(--color-primary)] peer-checked:bg-[var(--color-primary)]">
//         <svg
//           className="h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth="4"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M5 13l4 4L19 7"
//           />
//         </svg>
//       </div>

//       <span className="text-[13px] font-medium text-slate-700">{label}</span>
//     </label>
//   );
// };

// export default CommonCheckbox;
import React from "react";

const CommonCheckbox = ({
  id,
  checked = false,
  onChange,
  label = "Status",
  disabled = false,
  className = "",
}) => {
  return (
    <label
      htmlFor={id}
      className={`cursor-pointer gap-3 inline-flex items-center px-4 rounded-2xl ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
        disabled={disabled}
        className="peer hidden"
      />

      <div
        className={`flex h-5 w-5 items-center justify-center rounded-lg border-2 transition-all ${
          checked
            ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
            : "border-slate-200"
        }`}
      >
        <svg
          className={`h-3 w-3 text-white transition-opacity ${
            checked ? "opacity-100" : "opacity-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <span className="text-[13px] font-medium text-slate-700">{label}</span>
    </label>
  );
};

export default CommonCheckbox;

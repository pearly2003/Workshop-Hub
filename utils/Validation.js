// Author : Ajmalsha (Any query contact me, Not allowed Others to change)

// Utility function to check if a value is numeric
export const isNumeric = (value) => {
  return /^\d*$/.test(value);
};

// Utility function to check if a value contains only letters and spaces
export const isString = (value) => {
  return /^[A-Za-z\s]*$/.test(value);
};

// Utility function to check if a value contains only letters and Numbers don't Accept special Characters
export const isValidString = (value) => {
  return /^[A-Za-z0-9\s]*$/.test(value);
};
//your isString function to allow &, _, and - in addition to letters and spaces
export const isValidName = (value) => {
  return /^[A-Za-z\s&().,_-]*$/.test(value);
};

// Utility function to check if a value contains only uppercase letters
export const isUpperCase = (value) => {
  return /^[A-Z]*$/.test(value);
};

// Utility function to check if a value contains only lowercase letters
export const isLowerCase = (value) => {
  return /^[a-z]*$/.test(value);
};
// Utility function to check if a value is numeric and decimal values
export const isDecimal = (value) => {
  //return /^[0-9]+(\.[0-9]{2})?$/.test(value);
  return /^[0-9.]*$/.test(value);
};

export const isValiddecimal = (value) => {
  // Check if the value is a valid number with exactly two decimal places
  return /^[0-9]+(\.[0-9]{2})?$/.test(value);
};
// Utility function to check if a value contains only three  letters and nummbers
export const isValidInput = (value) => {
  return /^[A-Za-z]{3}\d+$/.test(value);
};
// Utility function to check if a value contains Regular expression to validate email format
export const isValidEmail = (value) => {
  return /^[a-zA-Z0-9.@]*$/.test(value);
};

// export const isValidEmail = (value) => {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
// };

// Utility function to check if a value contains Allow only digits (0-9) and ensure it doesn't start with "0"
export const isValidMobileNumber = (value) => {
  return value === "" || /^[6-9][0-9]*$/.test(value);
};

export const isSearchInput = (value) => {
  return /^[A-Za-z0-9\s-]*$/.test(value);
};
// Utility function scroll top of page
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Utitlity for Table Next and Prev

export const statusclass = {
  0: "badge-outline-info",
  1: "badge-outline-success",
  2: "badge-outline-orange",
  3: "badge-outline-danger",
};

export const statusLabels = {
  0: "Waiting for Confirmation",
  1: "Confirmed",
  2: "Waiting For Cancel",
  3: "Cancelled",
};

// Utitlity for Datepicer Next date Disabled
export const disabledAfterDate = (current) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  // Disable if the date is after today
  return current && current.valueOf() > tomorrow.valueOf();
};

// Utitlity for Datepicer Previes date Disabled
export const today = new Date().toISOString().split("T")[0];
export const disabledDate = (current) => {
  return current && current < new Date(today).setHours(0, 0, 0, 0);
};

// Utitlity for Email Validation
export const emailRegex =
  /^[A-Za-z0-9][A-Za-z0-9._-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// React Select Style
export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "10px",
    padding: "0px",
    fontSize: "14px",
    width: "100%", // Set the width to 100% to make it responsive
    borderColor: state.isFocused ? "#80bdff" : "#ced4da", // Adjust border color as needed
    boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(0, 123, 255, 0.25)" : null,
  }),
  option: (provided) => ({
    ...provided,
    fontSize: "14px",
  }),
};

export function formatRegisterNoStrict(input, state_SK) {
  if (!input) return "";

  const stateCode = stateCodeMap[state_SK];
  if (!stateCode) return input.toUpperCase(); // fallback

  // Remove all non-alphanumeric chars and force uppercase
  let raw = input.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

  // Remove prefix if user manually typed state code
  if (raw.startsWith(stateCode)) {
    raw = raw.slice(stateCode.length);
  }

  let formatted = stateCode;

  // Step-by-step parsing: DD, LL, NNNN
  const part1 = raw.slice(0, 2).replace(/\D/g, ""); // only digits
  const part2 = raw.slice(2, 4).replace(/[^A-Z]/g, ""); // only letters
  const part3 = raw.slice(4, 8).replace(/\D/g, ""); // only digits

  if (part1.length > 0) formatted += " " + part1;
  if (part2.length > 0) formatted += " " + part2;
  if (part3.length > 0) formatted += " " + part3;

  return formatted;
}

// scrollSuggestion List Common Code
import { useEffect, useRef } from "react";
export const useScrollToIndex = (selectedIndex, ref) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current && selectedIndex !== -1) {
      const selectedElement = scrollRef.current.children[selectedIndex];
      if (selectedElement) {
        // Calculate the height of each list item
        const itemHeight = selectedElement.clientHeight;
        // Calculate the scroll position to center the selected item
        const scrollTop =
          selectedElement.offsetTop -
          (scrollRef.current.clientHeight - itemHeight) / 1.5;
        scrollRef.current.scrollTop = scrollTop;
      }
    }
  }, [selectedIndex]);

  // Expose the ref to the parent component
  if (ref) {
    ref.current = scrollRef.current;
  }

  return scrollRef;
};

export const handleKeyPress = (e, tabIndex) => {
  if (e.key === "Enter") {
    e.preventDefault();

    // Find the next input field with the next tabIndex
    const nextInput = document.querySelector(`[tabIndex="${tabIndex + 1}"]`);

    // Move focus to the next input field
    if (nextInput) {
      nextInput.focus();
    } else {
      document.getElementById("saveButton").focus();
    }
  }
};

export const removeLeadingSpace = (value = "") => {
  return value.replace(/^\s+/, "");
};

export const trimSpaces = (value = "") => {
  return value.trim();
};

//  onChange={(e) =>
//                   setWorkshopNameEN(removeLeadingSpace(e.target.value))
//                 }
//                 onBlur={() => setWorkshopNameEN(trimSpaces(workshopNameAR))}

export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d)) return "";

  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();

  return `${dd}-${mm}-${yyyy}`;
};

export const isSentEmailFormate = (value) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?!com$)(net|org|co|edu|gov|info|io|me|sa|in|ae)$/i.test(
    value,
  );
};

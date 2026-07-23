// Safely parse date string, handling DD-MM-YYYY, YYYY-MM-DD, and ISO string formats
export const parseDate = (dateString) => {
  if (!dateString) return null;
  if (dateString instanceof Date) return dateString;

  if (typeof dateString === "string") {
    const trimmed = dateString.trim();
    // Check if it matches DD-MM-YYYY (with or without time part)
    const parts = trimmed.split(" ")[0].split("-");
    if (parts.length === 3) {
      if (parts[0].length === 2 && parts[2].length === 4) {
        // DD-MM-YYYY -> YYYY-MM-DD
        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      }
      if (parts[0].length === 4 && parts[2].length === 2) {
        // YYYY-MM-DD
        return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
      }
    }
  }

  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

// Return standard ISO string format safely
export const parseDateToISO = (dateString) => {
  const date = parseDate(dateString);
  return date ? date.toISOString() : null;
};

export const formatDate1 = (dateString) => {
  if (!dateString) return "-";
  const date = parseDate(dateString);
  if (!date) return "-";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const formatparseDate = (dateString) => {
  if (!dateString) return null;

  // Handle DD/MM/YYYY
  if (dateString.includes("/")) {
    const [day, month, year] = dateString.split("/");
    return new Date(year, month - 1, day);
  }

  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};


export const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = parseDate(dateString);
  if (!date) return "-";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

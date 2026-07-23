import { useState } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

/**
 * useTableSort — reusable sort hook
 * Returns: { sortConfig, handleSort, applySorting }
 *
 * Usage:
 *   const { sortConfig, handleSort, applySorting } = useTableSort();
 *   const sorted = applySorting(filteredData);
 */
export const useTableSort = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  /**
   * applySorting — sorts an array by the current sortConfig
   * @param {Array} data - array to sort
   * @returns {Array} sorted copy of data
   */
  const applySorting = (data) => {
    if (!sortConfig.key || !Array.isArray(data)) return data;

    return [...data].sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];

      // Normalise: booleans → string, nulls → ""
      valA = valA !== null && valA !== undefined ? valA.toString().toLowerCase() : "";
      valB = valB !== null && valB !== undefined ? valB.toString().toLowerCase() : "";

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  return { sortConfig, handleSort, applySorting };
};

/**
 * SortIcon — shows asc/desc/neutral arrow for a column header
 *
 * Usage:
 *   <SortIcon columnKey="userName" sortConfig={sortConfig} />
 *
 * Props:
 *   columnKey  {string}  — the field name this column sorts by
 *   sortConfig {object}  — current { key, direction } from useTableSort
 *   activeColor {string} — optional Tailwind text class for active state (default: primary var)
 */
export const SortIcon = ({ columnKey, sortConfig, activeColor = "text-[var(--color-primary)]" }) => {
  if (sortConfig.key !== columnKey)
    return <ArrowUpDown size={12} className="text-gray-300 shrink-0" />;

  return sortConfig.direction === "asc"
    ? <ArrowUp size={12} className={`${activeColor} shrink-0`} />
    : <ArrowDown size={12} className={`${activeColor} shrink-0`} />;
};

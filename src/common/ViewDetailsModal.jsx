import React from "react";
import { X } from "lucide-react";

/**
 * Reusable View Details Modal Component
 * 
 * @param {boolean} isOpen - Controls visibility of the modal
 * @param {function} onClose - Function to close the modal
 * @param {string} title - Main title of the modal
 * @param {string} subtitle - Subtitle (e.g., ID or No.) to show next to the title
 * @param {Array} sections - Array of objects for key-value pair sections.
 *                           Format: { title: "Section Title", data: [{ label: "Label", value: "Value", className: "optional-class" }] }
 * @param {Object} table - Object containing table configuration (optional)
 *                         Format: { title: "Table Title", columns: [{ header: "Header", key: "key", render: (row, i) => <jsx>, className: "class" }], data: [rowObjects] }
 * @param {string} maxWidth - Tailwind max-width class (default: "max-w-3xl")
 */
const ViewDetailsModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  sections = [],
  table = null,
  maxWidth = "max-w-3xl",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className={`bg-white rounded-xl shadow-xl w-full ${maxWidth} max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200`}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-800">
            {title} {subtitle && <span className="text-gray-500 font-medium">- {subtitle}</span>}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Key-Value Sections */}
          {sections && sections.length > 0 && (
            <div className={`grid grid-cols-1 md:grid-cols-${Math.min(sections.length, 2)} gap-6 mb-6`}>
              {sections.map((section, sIndex) => (
                <div key={sIndex}>
                  {section.title && (
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                      {section.title}
                    </h3>
                  )}
                  <div className="space-y-2 text-sm">
                    {section.data.map((item, iIndex) => {
                      if (!item || item.hidden) return null;
                      return (
                        <div key={iIndex} className="flex justify-between border-b border-gray-50 pb-2">
                          <span className="text-gray-500">{item.label}:</span>
                          <span className={`font-medium ${item.className || "text-gray-800"}`}>
                            {item.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Table Section */}
          {table && (
            <div>
              {table.title && (
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  {table.title}
                </h3>
              )}
              {table.data && table.data.length > 0 ? (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left min-w-max">
                      <thead className="bg-gray-50 text-gray-600">
                        <tr>
                          {table.columns.map((col, cIndex) => (
                            <th key={cIndex} className={`px-4 py-2 font-semibold ${col.headerClassName || ""}`}>
                              {col.header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white">
                        {table.data.map((row, rIndex) => (
                          <tr key={rIndex} className="hover:bg-gray-50 transition-colors">
                            {table.columns.map((col, cIndex) => (
                              <td key={cIndex} className={`px-4 py-2 ${col.className || ""}`}>
                                {col.render 
                                  ? col.render(row, rIndex) 
                                  : (col.key ? (row[col.key] || col.fallback || "-") : "-")}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-500 border border-gray-100">
                  {table.emptyMessage || "No details available."}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;

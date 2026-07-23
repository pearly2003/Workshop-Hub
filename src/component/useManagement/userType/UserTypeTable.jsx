import React, { useState, useEffect } from "react";
import {
  CustomPagination,
  getData,
  PaginationChange,
} from "../../../../utils/PaginationUtils";
import { Edit2, Eye, SquarePen, Trash2 } from "lucide-react";
import { useTableSort, SortIcon } from "../../../../utils/TableSortUtils";
import {
  showConfirm,
  showSuccess,
  showError,
} from "../../../../utils/SwalUtils";
import { DeleteUserTypesAPI } from "../../../service/Api";
import ViewDetailsModal from "../../../common/ViewDetailsModal";

const UserTypeTable = ({
  setIsFormVisible,
  setIsUpdateMode,
  current,
  setCurrent,
  perPage,
  selectedUser,
  setSelectedUser,
  searchTerm,
  setSearchTerm,
  user,
  fetchData,
  rights,
}) => {
  const [filteredBus, setFilteredBus] = useState([]);
  const [viewRow, setViewRow] = useState(null);
  const { sortConfig, handleSort, applySorting } = useTableSort();

  // 🔍 Search + Sort filter
  useEffect(() => {
    const searchFields = ["userTypeDesc", "active"];
    const lowerTerm = searchTerm.toLowerCase();

    const filtered = Array.isArray(user)
      ? user.filter((item) =>
        searchFields.some(
          (field) =>
            typeof item[field] === "string" &&
            item[field].toLowerCase().includes(lowerTerm),
        ),
      )
      : [];

    setFilteredBus(applySorting(filtered));
  }, [user, searchTerm, sortConfig]);

  const handleEdit = (row) => {
    setSelectedUser(row);
    setIsFormVisible(false);
    setIsUpdateMode(true);
  };

  const viewRowSections = viewRow
    ? [
      {
        title: "User Type Details",
        data: [
          { label: "User Type Name", value: viewRow.userTypeDesc || "—" },
          {
            label: "Status",
            value: viewRow.active ? "Active" : "Inactive",
            className: viewRow.active ? "text-green-600 font-medium" : "text-red-600 font-medium"
          },
        ]
      },
      {
        title: "Audit Logs",
        data: [
          { label: "Created By", value: viewRow.createdBy || "—" },
          { label: "Created On", value: viewRow.createdOn || "—" },
          { label: "Modified By", value: viewRow.modifiedBy || "—" },
          { label: "Modified On", value: viewRow.modifiedOn || "—" },
        ]
      }
    ]
    : [];

  const dataToRender = getData(current, perPage, filteredBus);

  return (
    <>
      <div className="p-1 w-full flex flex-col gap-4">
        <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F8FAFC] text-gray-500 uppercase font-black tracking-widest text-[10px]">
                <tr>
                  <th className="px-6 py-3 w-12 text-center">#</th>
                  <th
                    className="px-6 py-3 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort("userTypeDesc")}
                  >
                    <div className="flex items-center gap-1">
                      User Type Name
                      <SortIcon
                        columnKey="userTypeDesc"
                        sortConfig={sortConfig}
                      />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-center cursor-pointer select-none hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort("active")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Status
                      <SortIcon columnKey="active" sortConfig={sortConfig} />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {dataToRender.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-10 text-gray-400 font-medium"
                    >
                      No user types found matching your search.
                    </td>
                  </tr>
                ) : (
                  dataToRender.map((row, index) => (
                    <tr
                      key={row.userType_SK || index}
                      className="hover:bg-[#F8FAFC]/50 transition-colors"
                    >
                      <td className="px-6 py-3 text-center text-gray-400 font-medium">
                        {index + 1 + (current - 1) * perPage}
                      </td>

                      <td className="px-6 py-3 font-medium text-gray-900">
                        {row.userTypeDesc}
                      </td>

                      <td className="px-6 py-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium
                          ${row.active
                              ? "bg-green-50 text-green-600"
                              : "bg-red-50 text-red-600"
                            }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${row.active ? "bg-green-500" : "bg-red-500"}`}
                          />
                          {row.active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-3">
                        <div className="flex items-center justify-center gap-2">
                          {(!rights || rights?.rights_View) && (
                            <button
                              onClick={() => setViewRow(row)}
                              className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 rounded-xl transition-all"
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>
                          )}
                          {rights.rights_Update && (
                            <button
                              onClick={() => handleEdit(row)}
                              className="p-1.5 flex gap-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                              title="Edit User Type"
                            >
                              <SquarePen size={14} />
                              <span>Edit</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Section */}
        <div className="flex items-center justify-between px-2">
          <div className="text-[11px] text-gray-400 font-medium">
            Showing {dataToRender.length} of {filteredBus.length} entries
          </div>
          <CustomPagination
            total={(filteredBus || []).length}
            current={current}
            pageSize={perPage}
            onChange={(page) => PaginationChange(page, setCurrent)}
          />
        </div>
      </div>

      <ViewDetailsModal
        isOpen={!!viewRow}
        onClose={() => setViewRow(null)}
        title="User Type Details"
        subtitle={viewRow?.userTypeDesc}
        sections={viewRowSections}
      />
    </>
  );
};

export default UserTypeTable;

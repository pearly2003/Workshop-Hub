import React, { useState, useEffect } from "react";
import { Edit2, Eye, SquarePen, Trash2 } from "lucide-react";
import { CustomPagination, getData } from "../../../../utils/PaginationUtils";
import { useTableSort, SortIcon } from "../../../../utils/TableSortUtils";
import {
  showConfirm,
  showSuccess,
  showError,
} from "../../../../utils/SwalUtils";
import { DeleteRoleMasterAPI } from "../../../service/Api";
import ViewDetailsModal from "../../../common/ViewDetailsModal";

const RoleMasterTable = ({
  setIsFormVisible,
  setIsUpdateMode,
  current,
  setCurrent,
  perPage,
  selectedUser,
  setSelectedUser,
  searchTerm,
  user, // actual user data array
  rights,
  fetchData,
}) => {
  const [filteredBus, setFilteredBus] = useState([]);
  const [viewRow, setViewRow] = useState(null);
  const { sortConfig, handleSort, applySorting } = useTableSort();

  const handleDelete = (row) => {
    showConfirm({
      title: "Delete Role",
      text: `Are you sure you want to delete role "${row.roleName}"?`,
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await DeleteRoleMasterAPI(row.role_SK);
          if (response.status === 200) {
            showSuccess("Deleted!", "Role has been deleted successfully.");
            if (fetchData) fetchData();
          }
        } catch (error) {
          showError(
            "Error",
            error.response?.data?.data?.error[0]?.errorMessage ||
            error.response?.data?.message ||
            "Failed to delete role.",
          );
        }
      }
    });
  };

  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = Array.isArray(user)
      ? user.filter(
        (item) =>
          item.roleName?.toLowerCase().includes(lowerTerm) ||
          item.userTypeDesc?.toLowerCase().includes(lowerTerm),
      )
      : [];
    setFilteredBus(applySorting(filtered));
  }, [user, searchTerm, sortConfig]);

  const dataToRender = getData(current, perPage, filteredBus);

  const handleEdit = (row) => {
    setSelectedUser(row);
    setIsFormVisible(false);
    setIsUpdateMode(true);
  };

  const viewRowSections = viewRow
    ? [
      {
        title: "Role Details",
        data: [
          { label: "Role Name", value: viewRow.roleName || "—" },
          { label: "User Type", value: viewRow.userTypeDesc || "—" },
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
                    onClick={() => handleSort("roleName")}
                  >
                    <div className="flex items-center gap-1">
                      Role Name{" "}
                      <SortIcon columnKey="roleName" sortConfig={sortConfig} />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort("userTypeDesc")}
                  >
                    <div className="flex items-center gap-1">
                      User Type{" "}
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
                      Status{" "}
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
                      colSpan="5"
                      className="text-center py-10 text-gray-400 font-medium"
                    >
                      No roles found matching your search.
                    </td>
                  </tr>
                ) : (
                  dataToRender.map((role, index) => (
                    <tr
                      key={role.role_SK || index}
                      className="hover:bg-[#F8FAFC]/50 transition-colors"
                    >
                      <td className="px-6 py-3 text-center text-gray-400 font-medium">
                        {index + 1 + (current - 1) * perPage}
                      </td>

                      <td className="px-6 py-3 font-medium text-gray-900">
                        {role.roleName}
                      </td>

                      <td className="px-6 py-3">
                        <span className="bg-blue-50 text-black px-2 py-1 rounded-lg font-medium text-[10px]">
                          {role.userTypeDesc}
                        </span>
                      </td>

                      <td className="px-6 py-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium
                          ${role.active
                              ? "bg-green-50 text-green-600"
                              : "bg-red-50 text-red-600"
                            }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${role.active ? "bg-green-500" : "bg-red-500"}`}
                          />
                          {role.active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {(!rights || rights?.rights_View) && (
                            <button
                              onClick={() => setViewRow(role)}
                              className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 rounded-xl transition-all"
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>
                          )}
                          {rights?.rights_Update && (
                            <button
                              onClick={() => handleEdit(role)}
                              className="p-1.5 flex gap-2 items-center text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                              title="Edit Role"
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
            total={filteredBus.length}
            current={current}
            pageSize={perPage}
            onChange={(page) => setCurrent(page)}
          />
        </div>
      </div>

      <ViewDetailsModal
        isOpen={!!viewRow}
        onClose={() => setViewRow(null)}
        title="Role Master Details"
        subtitle={viewRow?.roleName}
        sections={viewRowSections}
      />
    </>
  );
};

export default RoleMasterTable;

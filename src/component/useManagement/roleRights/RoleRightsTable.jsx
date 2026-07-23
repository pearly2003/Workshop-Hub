import React, { useState, useEffect } from "react";
import { Edit2, Eye, SquarePen, Trash2 } from "lucide-react";
import { CustomPagination, getData } from "../../../../utils/PaginationUtils";
import { useTableSort, SortIcon } from "../../../../utils/TableSortUtils";
import {
  showConfirm,
  showSuccess,
  showError,
} from "../../../../utils/SwalUtils";
import { DeleteRoleRightsAPI } from "../../../service/Api";
import ViewDetailsModal from "../../../common/ViewDetailsModal";

const RoleRightsTable = ({
  setIsFormVisible,
  setIsUpdateMode,
  current,
  setCurrent,
  perPage,
  selectedUser,
  setSelectedUser,
  searchTerm,
  user,
  seteditedroledata, // added prop
  setRoleSk, // added prop
  rights,
  fetchData,
}) => {
  const [filteredList, setFilteredList] = useState([]);
  const [viewRow, setViewRow] = useState(null);
  const { sortConfig, handleSort, applySorting } = useTableSort();

  const handleDelete = (row) => {
    showConfirm({
      title: "Delete Role Rights",
      text: `Are you sure you want to delete role rights for "${row.roleName}"?`,
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await DeleteRoleRightsAPI(row.role_SK);
          if (response.status === 200) {
            showSuccess("Deleted!", "Role rights have been deleted successfully.");
            if (fetchData) fetchData();
          }
        } catch (error) {
          showError(
            "Error",
            error.response?.data?.data?.error[0]?.errorMessage ||
            error.response?.data?.message ||
            "Failed to delete role rights.",
          );
        }
      }
    });
  };

  useEffect(() => {
    const term = (searchTerm || "").toLowerCase().trim();
    const searchFields = ["userName", "roleName", "activeDesc"];
    const filtered = Array.isArray(user)
      ? user.filter((item) =>
        searchFields.some(
          (field) =>
            item[field] &&
            item[field].toString().toLowerCase().includes(term),
        ),
      )
      : [];
    setFilteredList(applySorting(filtered));
  }, [user, searchTerm, sortConfig]);

  const dataToRender = getData(current, perPage, filteredList);

  const handleEdit = (row) => {
    setSelectedUser(row);
    if (typeof seteditedroledata === "function") seteditedroledata(row);
    if (typeof setRoleSk === "function") setRoleSk(row.role_SK ?? null);
    setIsUpdateMode(true);
    setIsFormVisible(false); // open form
  };

  const viewRowSections = viewRow
    ? [
      {
        title: "Role Rights Details",
        data: [
          { label: "Role Name", value: viewRow.roleName || "—" },
        ]
      },
      {
        title: "Audit Logs",
        data: [
          { label: "Created By", value: viewRow.createdBy || "—" },
          { label: "Created On", value: viewRow.createdDate || "—" },
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
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {dataToRender.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center py-10 text-gray-400 font-medium"
                    >
                      No roles found matching your search.
                    </td>
                  </tr>
                ) : (
                  dataToRender.map((row, index) => (
                    <tr
                      key={index}
                      className="hover:bg-[#F8FAFC]/50 transition-colors"
                    >
                      <td className="px-6 py-3 text-center text-gray-400 font-medium">
                        {index + 1 + (current - 1) * perPage}
                      </td>

                      <td className="px-6 py-3 font-medium text-gray-900">
                        {row.roleName}
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
                          {rights?.rights_Update && (
                            <button
                              onClick={() => handleEdit(row)}
                              className="p-1.5 flex gap-2 items-center text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                              title="Configure Rights"
                            >
                              <SquarePen size={14} />
                              <span>Configure Rights</span>
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
            Showing {dataToRender.length} of {filteredList.length} entries
          </div>
          <CustomPagination
            total={filteredList.length}
            current={current}
            pageSize={perPage}
            onChange={(page) => setCurrent(page)}
          />
        </div>
      </div>

      <ViewDetailsModal
        isOpen={!!viewRow}
        onClose={() => setViewRow(null)}
        title="Role Rights Details"
        subtitle={viewRow?.roleName}
        sections={viewRowSections}
      />
    </>
  );
};

export default RoleRightsTable;

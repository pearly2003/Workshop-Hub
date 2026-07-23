import React, { useEffect, useState } from "react";
import { Edit2, Info, ChevronDown, ChevronRight, SquarePen, Eye } from "lucide-react";
import ViewDetailsModal from "../../../common/ViewDetailsModal";
import {
  CustomPagination,
  PaginationChange,
  getData,
} from "../../../../utils/PaginationUtils";
import { useTableSort, SortIcon } from "../../../../utils/TableSortUtils";

const MenuCreationTable = ({
  menus,
  current,
  setCurrent,
  perPage,
  searchTerm,
  setIsFormVisible,
  setIsUpdateMode,
  setSelectedMenu,
  rights,
}) => {
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [viewRow, setViewRow] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const { sortConfig, handleSort, applySorting } = useTableSort();

  useEffect(() => {

    const lowerSearch = searchTerm.trim().toLowerCase();
    const filtered = Array.isArray(menus)
      ? menus.filter((menu) => {
        if (!lowerSearch) return true;
        return [
          menu.menuName,
          menu.to,
          // menu.iconStyle,
          // menu.parent_SK ? "submenu" : "parent",
          // menu.active ? "active" : "inactive",
        ].some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(lowerSearch),
        );
      })
      : [];
    setFilteredMenus(applySorting(filtered));
    setCurrent(1);
  }, [menus, searchTerm, setCurrent, sortConfig]);

  // }, [menus, searchTerm, setCurrent, sortConfig]);

  const parentMenus = filteredMenus.filter((m) => m.menuLevel === 0 || !m.parent_SK);
  const dataToRender = getData(current, perPage, parentMenus);

  const toggleRow = (menuSK) => {
    setExpandedRows((prev) => ({
      ...prev,
      [menuSK]: !prev[menuSK],
    }));
  };

  const handleEdit = (menu) => {

    setSelectedMenu(menu);
    setIsUpdateMode(true);
    setIsFormVisible(false);
  };

  const handleDetailsClick = (menu) => {
    setViewRow(menu);
  };

  const viewRowSections = viewRow
    ? [
      {
        title: "Menu Details",
        data: [
          { label: "Menu Name", value: viewRow.menuName || "—" },
          { label: "Menu URL", value: viewRow.menuURL || "—" },
          { label: "Menu Level", value: viewRow.parent_SK ? "Sub Menu" : "Parent Menu" },
          { label: "Parent Menu ID", value: viewRow.parent_SK || "—" },
          { label: "Menu Order", value: viewRow.menuOrder || "—" },
          { label: "CSS Class", value: viewRow.iconStyle || "—" },
          { label: "Menu ID", value: viewRow.menu_SK || "—" },
          {
            label: "Status",
            value: viewRow.active ? "Active" : "Inactive",
            className: viewRow.active ? "text-green-600 font-medium" : "text-red-600 font-medium"
          },
        ]
      }
    ]
    : [];

  return (
    <>
      <ViewDetailsModal
        isOpen={!!viewRow}
        onClose={() => setViewRow(null)}
        title="Menu Details"
        subtitle={viewRow?.menuName}
        sections={viewRowSections}
      />
      <div className="p-4">
        <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F8FAFC] text-gray-500 uppercase font-black tracking-widest text-[10px]">
                <tr>
                  <th className="px-6 py-3 w-12 text-center">#</th>
                  <th
                    className="px-6 py-3 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort("menuName")}
                  >
                    <div className="flex items-center gap-1">
                      Menu Name{" "}
                      <SortIcon columnKey="menuName" sortConfig={sortConfig} />
                    </div>
                  </th>
                  <th className="px-6 py-3">Route</th>
                  <th className="px-6 py-3">Level</th>
                  <th className="px-6 py-3">Count</th>
                  {/* <th className="px-6 py-3">Icon Class</th> */}
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
                      colSpan="7"
                      className="text-center py-10 text-gray-400 font-medium"
                    >
                      No menus found matching your filters.
                    </td>
                  </tr>
                ) : (
                  dataToRender.map((menu, index) => {
                    const children = menus.filter((m) => m.parent_SK === menu.menu_SK);
                    const isExpanded = expandedRows[menu.menu_SK];

                    return (
                      <React.Fragment key={menu.menu_SK || index}>
                        <tr className="hover:bg-[#F8FAFC]/60 transition-colors">
                          <td className="px-6 py-4 text-center text-gray-400 font-medium">
                            {index + 1 + (current - 1) * perPage}
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {children.length > 0 ? (
                                <button
                                  onClick={() => toggleRow(menu.menu_SK)}
                                  className="p-1 rounded hover:bg-gray-200 transition-colors"
                                >
                                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </button>
                              ) : (
                                <span className="w-6 inline-block" />
                              )}
                              <div className="flex flex-col gap-1">
                                <span className="font-medium text-gray-900">
                                  {menu.menuName}
                                </span>
                                <span className="text-[10px] text-gray-400">
                                  ID: {menu.menu_SK}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <span className="text-gray-700 font-medium">
                              {menu.menuURL || "-"}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className="inline-flex items-center rounded-lg bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-600">
                              Parent Menu
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center rounded-lg bg-[var(--color-primary)]/30 px-2.5 py-1 text-[10px] font-medium text-gray-600">
                              Sub Menu Count : {children.length}
                            </span>
                          </td>

                          {/* <td className="px-6 py-4">
                            <span className="text-gray-600 font-medium">
                              {menu.iconStyle || "-"}
                            </span>
                          </td> */}

                          <td className="px-6 py-4 text-center">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium ${menu?.active
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-600"
                                }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${menu.active ? "bg-green-500" : "bg-red-500"
                                  }`}
                              />
                              {menu.active ? "Active" : "Inactive"}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              {rights?.rights_View && (
                                <button
                                  onClick={() => handleDetailsClick(menu)}
                                  className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 rounded-xl transition-all"
                                  title="View Details"
                                >
                                  <Eye size={14} />
                                </button>)}
                              {rights?.rights_Update && (
                                <button
                                  onClick={() => handleEdit(menu)}
                                  className="p-1.5 flex gap-2 items-center text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                                >
                                  <SquarePen size={14} />
                                  <span>Edit</span>
                                </button>
                              )}

                            </div>
                          </td>
                        </tr>

                        {isExpanded && children.length > 0 && children.map((child, childIndex) => (
                          <tr
                            key={child.menu_SK || `child-${childIndex}`}
                            className="bg-gray-50/50 hover:bg-gray-100/60 transition-colors border-l-2 border-l-blue-400"
                          >
                            <td className="px-6 py-3 text-center text-gray-400 font-medium text-[10px]">
                              {index + 1 + (current - 1) * perPage}.{childIndex + 1}
                            </td>

                            <td className="px-6 py-3 pl-12">
                              <div className="flex flex-col gap-1">
                                <span className="font-medium text-gray-800">
                                  {child.menuName}
                                </span>
                                <span className="text-[10px] text-gray-400">
                                  ID: {child.menu_SK}
                                </span>
                              </div>
                            </td>

                            <td className="px-6 py-3">
                              <span className="text-gray-700 font-medium text-[11px]">
                                {child.menuURL || "-"}
                              </span>
                            </td>

                            <td className="px-6 py-3">
                              <span className="inline-flex items-center rounded-lg bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                                Sub Menu
                              </span>
                            </td>

                            <td className="px-6 py-3">
                              <span className="text-gray-600 font-medium text-[11px]">
                                {child.iconStyle || "-"}
                              </span>
                            </td>

                            <td className="px-6 py-3 text-center">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${child?.active
                                  ? "bg-green-50 text-green-600"
                                  : "bg-red-50 text-red-600"
                                  }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${child.active ? "bg-green-500" : "bg-red-500"
                                    }`}
                                />
                                {child.active ? "Active" : "Inactive"}
                              </span>
                            </td>

                            <td className="px-6 py-3">
                              <div className="flex items-center justify-center gap-2">
                                {rights?.rights_View && (
                                  <button
                                    onClick={() => handleDetailsClick(child)}
                                    className="rounded-lg bg-gray-50 p-1.5 text-gray-500 transition-all hover:bg-gray-100"
                                    title="Details"
                                  >
                                    <Eye size={12} />
                                  </button>
                                )}
                                {rights?.rights_Update && (
                                  <button
                                    onClick={() => handleEdit(child)}
                                    className="flex items-center gap-1 rounded-lg bg-blue-50 p-1.5 text-[10px] font-medium text-black transition-all hover:bg-blue-100"
                                  >
                                    <SquarePen size={12} />
                                    <span>Edit</span>
                                  </button>
                                )}

                              </div>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between px-2">
          <div className="text-[11px] font-medium text-gray-400">
            Showing {parentMenus.length} top-level entries
          </div>
          <CustomPagination
            total={parentMenus.length}
            current={current}
            pageSize={perPage}
            onChange={(page) => PaginationChange(page, setCurrent)}
          />
        </div>
      </div>
    </>
  );
};

export default MenuCreationTable;

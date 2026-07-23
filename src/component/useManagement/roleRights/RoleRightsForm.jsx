import React, { useEffect, useState, useRef, useMemo } from "react";
import { Save, X, ChevronDown, ChevronRight, Download } from "lucide-react";
import {
  showConfirm,
  showSuccess,
  showError,
} from "../../../../utils/SwalUtils";
import Select from "react-select";
import {
  GetAllMenuRightsAPI,
  getMenuRightsAPI,
  getPendingRoleRightsAPI,
  RoleDrpAPI,
  saveRoleRightsAPI,
} from "../../../service/Api";
import { SelectGroup } from "../../../../utils/inputfields/SelectBox";
import CommonCheckbox from "../../../../utils/inputfields/CommonCheckbox";
import { useData } from "../../../context/DataProvider";
import { exportToExcel } from "../../../../utils/ExportUtils";
import FormHeader from "../../../../utils/formpageutils/FormHeader";

export default function RoleRightsForm({
  role_SK,
  setIsFormVisible,
  fetchData,
  editedroledata,
  onClose,
  isUpdateMode,
  user,
  BackClick
}) {
  const { loginInfo } = useData();
  const [roles, setRoles] = useState([]);
  const [selectedRoleSK, setSelectedRoleSK] = useState(role_SK ?? 0);
  const [allMenus, setAllMenus] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(true);

  const [collapsedMenus, setCollapsedMenus] = useState({});

  const toggleMenu = (menuSK) => {
    setCollapsedMenus((prev) => ({
      ...prev,
      [menuSK]: !prev[menuSK],
    }));
  };

  // helpers
  const toArray = (v) => (Array.isArray(v) ? v : []);
  const safeNumber = (v) => (v === null || v === undefined ? 0 : Number(v));

  const normalizeMenus = (menus = []) =>
    toArray(menus).map((m) => ({
      ...m,
      isInsert: !!m.isInsert,
      isUpdate: !!m.isUpdate,
      isView: !!m.isView,
      isDelete: !!m.isDelete,
      isPrint: !!m.isPrint,
      isReportExport: !!m.isReportExport,
      isApproval: !!m.isApproval,
      menu_SK: safeNumber(m.menu_SK),
      parent_SK: safeNumber(m.parent_SK),
      menuLevel: safeNumber(m.menuLevel),
      screenId: m.screenId ?? safeNumber(m.menu_SK),
      role_SK: m.role_SK ?? 0,
      roleRights_SK: m.roleRights_SK ?? 0,
      rights_All: m.rights_All ?? 0,
    }));

  const handleCancel = () => {
    setSelectedRoleSK(0);
    setIsFormVisible(true);
  };

  // Fetch roles dropdown
  const fetchRoles = async () => {
    setLoadingRoles(true);
    try {
      const res = isUpdateMode
        ? await RoleDrpAPI()
        : await getPendingRoleRightsAPI();
      const data = res?.data;
      const list =
        data?.code === 1 ? toArray(data.data) : toArray(data?.data ?? data);
      setRoles(list);
    } catch (err) {
      console.error("Fetch roles error:", err);
      setRoles([]);
      // Swal.fire("Error", "Failed to load roles", "error");
    } finally {
      setLoadingRoles(false);
    }
  };

  // Fetch full menus (once)
  const fetchAllMenus = async () => {
    setLoading(true);
    try {
      // This endpoint in your code is: /UserManagement/RoleRights/GetAllMenuRights
      // It returns a `data.roleWiseMenus` (based on your sample JSON)
      const res = await GetAllMenuRightsAPI();
      const payload = res?.data ?? {};
      const menus =
        payload?.data?.roleWiseMenus ??
        payload?.data?.roleWiseMenus ??
        payload?.data ??
        [];
      const normalized = normalizeMenus(toArray(menus));
      setAllMenus(normalized);
      // Initialize menuData same as allMenus (no rights) until a role is selected
      setMenuData(normalized.map((m) => ({ ...m })));
    } catch (err) {
      console.error("Error fetching all menus:", err);
      setAllMenus([]);
      setMenuData([]);
      Swal.fire("Error", "Failed to load menus", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchMenusByRole = async (roleSK) => {
    // If no role selected, reset to default permissions
    if (!roleSK) {
      setMenuData(
        allMenus.map((m) => ({
          ...m,
          isInsert: false,
          isUpdate: false,
          isView: false,
          isDelete: false,
          isPrint: false,
          isReportExport: false,
          isApproval: false,
        })),
      );
      return;
    }
    setLoading(true);
    try {
      const res = await getMenuRightsAPI(roleSK);
      const payload = res?.data ?? {};
      // Try multiple possible keys returned by backend
      const rightsList =
        payload?.data?.getRoleWiseMenuSK ??
        payload?.getRoleWiseMenuSK ??
        payload?.data?.roleWiseMenus ??
        payload?.roleWiseMenus ??
        payload?.data ??
        [];
      const normalizedRights = normalizeMenus(toArray(rightsList));
      // Merge rights into allMenus
      const merged = allMenus.map((menu) => {
        const match = normalizedRights.find(
          (r) => Number(r.screenId) === Number(menu.menu_SK),
        );
        if (match) {
          return {
            ...menu,
            isInsert: !!match.isInsert,
            isUpdate: !!match.isUpdate,
            isView: !!match.isView,
            isDelete: !!match.isDelete,
            isPrint: !!match.isPrint,
            isReportExport: !!match.isReportExport,
            isApproval: !!match.isApproval,
            role_SK: match.role_SK ?? menu.role_SK,
            roleRights_SK: match.roleRights_SK ?? menu.roleRights_SK,
            rights_All: match.rights_All ?? menu.rights_All,
            screenId: match.screenId ?? menu.screenId,
          };
        }
        // No saved rights — default to unchecked
        return {
          ...menu,
          isInsert: false,
          isUpdate: false,
          isView: false,
          isDelete: false,
          isPrint: false,
          isReportExport: false,
          isApproval: false,
        };
      });

      setMenuData(merged);
    } catch (err) {
      console.error("Error fetching menus for role:", err);

      // Fallback to default permissions
      setMenuData(
        allMenus.map((m) => ({
          ...m,
          isInsert: false,
          isUpdate: false,
          isView: false,
          isDelete: false,
          isPrint: false,
          isReportExport: false,
          isApproval: false,
        })),
      );
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    fetchRoles();
    fetchAllMenus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // respond to editedroledata from parent
  useEffect(() => {

    if (isUpdateMode && editedroledata) {
      setSelectedRoleSK(editedroledata.role_SK);
      fetchMenusByRole(editedroledata.role_SK);
    }
  }, [isUpdateMode, editedroledata, allMenus]);

  // when user selects role
  useEffect(() => {
    // only fetch rights after allMenus is loaded (so merge works)
    if (allMenus.length === 0) return;
    if (selectedRoleSK) fetchMenusByRole(selectedRoleSK);
    else {
      // reset to defaults (no role)
      setMenuData(
        allMenus.map((m) => ({
          ...m,
          isInsert: false,
          isUpdate: false,
          isView: false,
          isDelete: false,
          isPrint: false,
          isReportExport: false,
          isApproval: false,
        })),
      );
    }
  }, [selectedRoleSK, allMenus]);

  const handleCheckboxChange = (submenu, action, checked) => {
    setMenuData((prev) =>
      prev.map((m) => {
        if (Number(m.menu_SK) !== Number(submenu.menu_SK)) return m;
        const updated = { ...m, [action]: !!checked };
        if (action === "isInsert" && checked) updated.isView = true;
        if (action === "isView" && !checked && m.isInsert) return m;

        return updated;
      }),
    );
  };

  const handleSelectAll = (submenu, checked) => {
    setMenuData((prev) =>
      prev.map((m) =>
        Number(m.menu_SK) === Number(submenu.menu_SK)
          ? {
            ...m,
            isInsert: !!checked,
            isUpdate: !!checked,
            isView: !!checked,
            isDelete: !!checked,
            isPrint: !!checked,
            isReportExport: !!checked,
            isApproval: !!checked,
          }
          : m,
      ),
    );
  };

  const handleClear = async () => {
    const result = await showConfirm({
      title: "Clear all?",
      text: "This will reset all rights to unchecked.",
      icon: "warning",
    });
    if (!result.isConfirmed) return;

    setMenuData((prev) =>
      prev.map((m) => ({
        ...m,
        isInsert: false,
        isUpdate: false,
        isView: false,
        isDelete: false,
        isPrint: false,
        isReportExport: false,
        isApproval: false,
      })),
    );
    setSelectedRoleSK(0);
  };

  // construct payload used for Save API
  const constructPayload = () => {
    const roleSKToUse = Number(selectedRoleSK || role_SK || 0);
    // send only menuLevel === 1 (submenus)
    const roleRight = menuData
      .filter((m) => Number(m.menuLevel) === 1)
      .map((m) => ({
        role_SK: roleSKToUse,
        screenId: m.screenId ?? m.menu_SK,
        isInsert: !!m.isInsert,
        isUpdate: !!m.isUpdate,
        isView: !!m.isView,
        isDelete: !!m.isDelete,
        isApproval: !!m.isApproval,
        isPrint: !!m.isPrint,
        isReportExport: !!m.isReportExport,
        userBy: loginInfo?.user_Sk || 0,
      }));
    return { roleRight };
  };

  const handleSave = async () => {
    if (!selectedRoleSK) {
      showError("Select Role", "Please select a role before saving.");
      return;
    }
    const hasValid = menuData
      .filter((m) => Number(m.menuLevel) === 1)
      .some((m) => m.isView);

    if (!hasValid) {
      showError(
        "Select at least one permission",
        "At least one submenu must have View permission.",
      );
      return;
    }
    const actionText = isUpdateMode ? "update" : "save";
    const confirm = await showConfirm({
      title: "Are You Sure?",
      text: `Do you want to ${actionText} this Role Rights?`,
    });
    if (!confirm.isConfirmed) return;
    const payload = constructPayload();
    try {
      setLoading(true);
      const res = await saveRoleRightsAPI(payload);
      const responseData = res?.data ?? {};
      if (responseData?.code === 0) {
        const backendErr =
          responseData?.data?.error?.[0]?.errorMessage ||
          responseData?.message ||
          `${actionText} failed`;

        showError("Error", backendErr);
        return;
      }
      // 🔹 Success Message based on mode
      showSuccess(
        "Success",
        isUpdateMode
          ? "Role rights updated successfully"
          : "Role rights saved successfully",
      );
      fetchData();
      fetchRoles();
      setIsFormVisible(true);
      fetchMenusByRole(selectedRoleSK);

      if (typeof onClose === "function") onClose();
    } catch (err) {
      showError(
        "Error",
        err.response?.data?.data?.error[0]?.errorMessage ||
        err.response?.data?.message ||
        "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  // derived lists
  const mainMenus = menuData.filter((m) => Number(m.menuLevel) === 0);

  const handleExportRights = () => {
    if (!selectedRoleSK) {
      showError("Select Role", "Please select a role to export its rights.");
      return;
    }

    const selectedRoleName = roles.find(r => r.role_SK === selectedRoleSK)?.roleName || "Role";

    const exportData = menuData
      .filter((m) => Number(m.menuLevel) === 1)
      .map((submenu, index) => {
        const parentMenu = mainMenus.find(p => p.menu_SK === submenu.parent_SK);
        return {
          "S.No": index + 1,
          "Role Name": selectedRoleName,
          "Module": parentMenu ? parentMenu.menuName : "-",
          "Screen Name": submenu.menuName,
          "View": submenu.isView ? "Yes" : "No",
          "Insert": submenu.isInsert ? "Yes" : "No",
          "Update": submenu.isUpdate ? "Yes" : "No",
          "Delete": submenu.isDelete ? "Yes" : "No",
          "Print": submenu.isPrint ? "Yes" : "No",
          "Export": submenu.isReportExport ? "Yes" : "No",
          "Approval": submenu.isApproval ? "Yes" : "No",
        };
      });

    exportToExcel(exportData, `${selectedRoleName}_RightsData`, `${selectedRoleName} Rights`);
  };

  return (
    <div className="">
      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
        <FormHeader
          onBack={BackClick}
          title={isUpdateMode ? "Edit Role Rights" : "Add Role Rights"}
          isUpdateMode={isUpdateMode}
        />
        <div className="my-6 flex items-end justify-between flex-wrap gap-4">
          <div className="w-70">
            <SelectGroup
              label="Role Name"
              placeholder="Select Role"
              // required={true}
              value={selectedRoleSK}
              onChange={(val) => setSelectedRoleSK(val)}
              options={roles.map((r) => ({
                value: r.role_SK,
                label: r.roleName,
              }))}
              disabled={isUpdateMode}
            />
          </div>

          {selectedRoleSK ? (
            <button
              onClick={handleExportRights}
              className="flex items-center gap-2 text-xs font-medium bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-sm transition-all whitespace-nowrap h-[42px]"
              title="Export Role Rights to Excel"
            >
              <Download size={16} />
              Export Rights
            </button>
          ) : null}
        </div>

        {/* Menus */}
        <div className="space-y-10">
          {mainMenus.map((mainMenu) => (
            <div key={mainMenu.menu_SK} className="group">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="flex items-center gap-3 cursor-pointer select-none"
                  onClick={() => toggleMenu(mainMenu.menu_SK)}
                >
                  {collapsedMenus[mainMenu.menu_SK] ? (
                    <ChevronRight size={18} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-500" />
                  )}
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                  <h4 className="text-sm font-black text-gray-800 uppercase tracking-widest hover:text-blue-600 transition-colors">
                    {mainMenu.menuName}
                  </h4>
                </div>
              </div>

              <div className={`overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm transition-all group-hover:shadow-md ${collapsedMenus[mainMenu.menu_SK] ? 'hidden' : 'block'}`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-[#F8FAFC] text-gray-500 uppercase font-black tracking-widest text-[10px]">
                      <tr>
                        <th className="px-6 py-4">Submenu Name</th>
                        <th className="px-4 py-4 text-center">View</th>
                        <th className="px-4 py-4 text-center">Insert</th>
                        <th className="px-4 py-4 text-center">Update</th>
                        <th className="px-4 py-4 text-center">Delete</th>
                        <th className="px-4 py-4 text-center">Print</th>
                        <th className="px-4 py-4 text-center">Export</th>
                        <th className="px-4 py-4 text-center">Approval</th>
                        <th className="px-6 py-4 text-center">Full Access</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {menuData
                        .filter(
                          (submenu) => submenu.parent_SK === mainMenu.menu_SK,
                        )
                        .map((submenu) => (
                          <tr
                            key={submenu.menu_SK}
                            className="hover:bg-[#F8FAFC]/50 transition-colors"
                          >
                            <td className="px-6 py-4 text-xs font-medium text-gray-900">
                              {submenu.menuName}
                            </td>
                            {[
                              "isView",
                              "isInsert",
                              "isUpdate",
                              "isDelete",
                              "isPrint",
                              "isReportExport",
                              "isApproval",
                            ].map((action) => (
                              <td key={action} className="px-4 py-4 text-center">
                                <CommonCheckbox
                                  id={`cb-${submenu.menu_SK}-${action}`}
                                  checked={submenu[action]}
                                  onChange={(checked) =>
                                    handleCheckboxChange(submenu, action, checked)
                                  }
                                  label=""
                                  className="!px-0 !gap-0 justify-center w-full"
                                />
                              </td>
                            ))}
                            <td className="px-6 py-4 text-center bg-gray-50/30">
                              <CommonCheckbox
                                id={`cb-${submenu.menu_SK}-all`}
                                checked={
                                  submenu.isInsert &&
                                  submenu.isUpdate &&
                                  submenu.isView &&
                                  submenu.isDelete &&
                                  submenu.isPrint &&
                                  submenu.isReportExport &&
                                  submenu.isApproval
                                }
                                onChange={(checked) =>
                                  handleSelectAll(submenu, checked)
                                }
                                label=""
                                className="!px-0 !gap-0 justify-center w-full"
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}

          {/* ACTION FOOTER */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={isUpdateMode ? handleCancel : handleClear}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <X size={16} /> {isUpdateMode ? "Cancel" : "Clear"}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-lg hover:brightness-110 transition-colors shadow-sm"
            >
              <Save size={16} /> {isUpdateMode ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

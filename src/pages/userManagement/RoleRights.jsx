import React, { useState, useEffect } from "react";

import { GetAllMenuRightsAPI } from "../../service/Api";
import {
  Plus,
  ArrowLeft,
  Search,
  ArrowDown,
  CirclePlusIcon,
  Download
} from "lucide-react";
import RoleRightsTable from "../../component/useManagement/roleRights/RoleRightsTable";
import RoleRightsForm from "../../component/useManagement/roleRights/RoleRightsForm";
import { useData } from "../../context/DataProvider";
import { useAuth } from "../../context/AuthProvider";
import { exportToExcel } from "../../../utils/ExportUtils";

const RoleRights = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const { isLoading, setIsLoading } = useData();
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [current, setCurrent] = useState(1);
  const [role_SK, setRoleSk] = useState(null);
  const [editedroledata, seteditedroledata] = useState(null);
  const { rights } = useAuth();


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await GetAllMenuRightsAPI();
      setUser(data.data.data.roleRightsDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClick = () => {
    setIsFormVisible(false);
    setRoleSk(null);
    seteditedroledata(null);
    setIsUpdateMode(false);
  };

  const handleBackClick = () => {
    setIsFormVisible(true);
  };

  const handleExport = () => {
    const dataToExport = user.map((item, index) => ({
      "S.No": index + 1,
      "Role Name": item.roleName || "-",
      "Created By": item.createdBy || "-",
      "Created On": item.createdDate || "-",
      "Modified By": item.modifiedBy || "-",
      "Modified On": item.modifiedOn || "-",
    }));
    exportToExcel(dataToExport, "RoleRightsData", "Role Rights");
  };

  return (
    <>
      {/* Filter & Search Section – FULLY RESPONSIVE */}
      {isFormVisible && (
        <div className="px-2 pt-4 pb-2">
          <div className="flex items-center justify-between gap-4 w-full flex-wrap">
            {/* LEFT SIDE – SEARCH */}
            <div className="relative w-full max-w-xs">
              <span className="absolute left-3 top-2.5 text-(--color-primary-500)">
                <Search size="18" />
              </span>
              <input
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm
              bg-white text-gray-900 focus:ring-3 focus:ring-purple-200 focus:border-purple-500
              focus:outline-none transition-all duration-150"
              />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-6 w-full md:w-auto sm:justify-start">
              {isFormVisible && (
                <>
                  {/* PER PAGE */}
                  <div className="relative w-24">
                    <select
                      value={perPage}
                      onChange={(e) => setPerPage(Number(e.target.value))}
                      className="
                        appearance-none w-full border bg-white border-gray-100 rounded-xl
                        px-4 pr-10 py-2 text-xs font-medium text-gray-600 cursor-pointer
                        hover:bg-gray-50 transition-colors focus:outline-none
                      "
                    >
                      {[5, 10, 15, 20].map((n) => (
                        <option key={n} value={n}>
                          {n.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>

                    {/* Custom Dropdown Arrow */}
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <ArrowDown size={14} />
                    </span>
                  </div>
                </>
              )}

              {/* ACTION BUTTON (ADD/BACK) */}
              {isFormVisible && (
                <button
                  onClick={handleExport}
                  className="hidden md:flex items-center gap-2 text-xs font-medium bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-sm transition-all whitespace-nowrap"
                  title="Export to Excel"
                >
                  <Download size={16} />
                  Export
                </button>
              )}
              {rights?.rights_Insert && (
                <button
                  onClick={isFormVisible ? handleAddClick : handleBackClick}
                  className={`hidden md:flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl shadow-sm transition-all whitespace-nowrap ${isFormVisible
                    ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                >
                  {isFormVisible && (
                    <>
                      <CirclePlusIcon size={16} />
                      Add Role Rights
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Mobile Floating Action Button */}
      {isFormVisible && (
        <button
          onClick={handleAddClick}
          className="md:hidden fixed bottom-28 right-6 w-14 h-14 bg-[#c8a96e] rounded-full flex items-center justify-center text-white shadow-[0_8px_16px_rgba(200,169,110,0.4)] active:scale-95 transition-all z-40"
        >
          <Plus size={28} />
        </button>
      )}
      {/* Content Section */}
      <div>
        {/* <div className="w-full overflow-hidden rounded-[28px] border border-slate-200  from-slate-50 via-white to-emerald-50/60 p-1 shadow-[0_18px_55px_rgba(15,23,42,0.08)]"> */}
        {!isFormVisible ? (
          <RoleRightsForm
            user={user}
            fetchData={fetchData}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setIsFormVisible={setIsFormVisible}
            setIsUpdateMode={setIsUpdateMode}
            isUpdateMode={isUpdateMode}
            role_SK={role_SK}
            editedroledata={editedroledata}
            BackClick={handleBackClick}
          />
        ) : (
          <RoleRightsTable
            fetchData={fetchData}
            perPage={perPage}
            setPerPage={setPerPage}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            user={user}
            setIsUpdateMode={setIsUpdateMode}
            setIsFormVisible={setIsFormVisible}
            role_SK={role_SK}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            seteditedroledata={seteditedroledata}
            setRoleSk={setRoleSk} // <<< ADDED: allow table to set role_SK
            isLoading={isLoading}
            setCurrent={setCurrent}
            current={current}
            rights={rights}
          />
        )}
      </div>
    </>
  );
};

export default RoleRights;

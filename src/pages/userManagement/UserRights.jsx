import React, { useState, useEffect } from "react";
import { GetAllUserRightsAPI } from "../../service/Api";
import {
  ArrowDown,
  ArrowLeft,
  CirclePlusIcon,
  Plus,
  Search,
  Settings,
  Download
} from "lucide-react";
import UserRightsForm from "../../component/useManagement/userRights/UserRightsForm";
import UserRightsTable from "../../component/useManagement/userRights/UserRightsTable";
import { useData } from "../../context/DataProvider";
import { useAuth } from "../../context/AuthProvider";
import { exportToExcel } from "../../../utils/ExportUtils";

const UserRights = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const { isLoading, setIsLoading } = useData();
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [current, setCurrent] = useState(1);
  const [toggle, setToggle] = useState("all");
  const [Type, setType] = useState(1);
  const [raw, setRaw] = useState([]);
  const { rights } = useAuth();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await GetAllUserRightsAPI();
      setRaw(data.data.data || []);
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
    setSelectedUser(null);
    setIsUpdateMode(false);
  };

  const handleBackClick = () => {
    setIsFormVisible(true);
  };

  const handleExport = () => {
    const dataToExport = user.map((item, index) => ({
      "S.No": index + 1,
      "User Name": item.userName || "-",
      "Role Name": item.roleName || "-",
      "Created By": item.createdBy || "-",
      "Created On": item.createdDate || item.createdOn || "-",
      "Modified By": item.modifiedBy || "-",
      "Modified On": item.modifiedOn || "-",
    }));
    exportToExcel(dataToExport, "UserRightsData", "User Rights");
  };

  const handleToggleChange = (status) => {
    setToggle(status);
    setCurrent(1); // Reset to first page when filter changes
  };

  useEffect(() => {
    const filtered = raw.filter((item) => {
      if (toggle === "all") return true;
      if (toggle === "waiting")
        return (
          item.active === true ||
          item.active === 1 ||
          String(item.active).toLowerCase() === "true"
        );
      if (toggle === "approved")
        return (
          item.active === false ||
          item.active === 0 ||
          String(item.active).toLowerCase() === "false"
        );
      return true;
    });
    setUser(filtered);
  }, [toggle, raw]);

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
      bg-white text-gray-900 
      focus:ring-3 focus:ring-purple-200 focus:border-purple-500 focus:outline-none
      transition-all duration-150"
              />
            </div>
            {/* RIGHT SIDE */}
            <div className="flex items-center gap-6 w-full md:w-auto sm:justify-start">
              {/* TABS FILTER */}
              <div className="flex items-center bg-white p-1 rounded-2xl shadow-sm ring-1 ring-gray-100">
                {[
                  { id: "all", label: "All" },
                  { id: "waiting", label: "Active" },
                  { id: "approved", label: "Inactive" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleToggleChange(tab.id)}
                    className={`px-4 py-2 text-xs font-medium rounded-xl transition-all
                        ${toggle === tab.id
                        ? "bg-[var(--color-primary)] text-white shadow-md shadow-blue-100"
                        : "text-gray-400 hover:text-gray-600"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

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
              <button
                onClick={handleExport}
                className="hidden md:flex items-center gap-2 text-xs font-medium bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-sm transition-all whitespace-nowrap"
                title="Export to Excel"
              >
                <Download size={16} />
                Export
              </button>
              {rights?.rights_Insert && (
                <button
                  onClick={handleAddClick}
                  className="hidden md:flex items-center gap-2 text-xs font-medium bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-4 py-2 rounded-xl shadow-sm transition-all whitespace-nowrap"
                >
                  <CirclePlusIcon size={16} />
                  Add User Rights
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
        {!isFormVisible ? (
          <UserRightsForm
            fetchData={fetchData}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setIsFormVisible={setIsFormVisible}
            setIsUpdateMode={setIsUpdateMode}
            isUpdateMode={isUpdateMode}
            BackClick={handleBackClick}
          />
        ) : (
          <UserRightsTable
            fetchData={fetchData}
            perPage={perPage}
            setPerPage={setPerPage}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            user={user}
            setIsUpdateMode={setIsUpdateMode}
            setIsFormVisible={setIsFormVisible}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
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

export default UserRights;

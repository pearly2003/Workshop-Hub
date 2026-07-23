import React, { useState, useEffect } from "react";

import UserTypeForm from "../../component/useManagement/userType/UserTypeForm";
import UserTypeTable from "../../component/useManagement/userType/UserTypeTable";
import {
  ArrowDown,
  ArrowLeft,
  CirclePlus,
  CirclePlusIcon,
  Search,
  Settings,
  Plus,
  Download
} from "lucide-react";
import { getUserTypeAPI } from "../../service/Api";
import { useData } from "../../context/DataProvider";
import { useAuth } from "../../context/AuthProvider";
import { exportToExcel } from "../../../utils/ExportUtils";

const UserType = () => {
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

  console.log(rights, "rights")
  const fetchData = async () => {
    try {
      const response = await getUserTypeAPI();
      setRaw(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      "User Type Name": item.userTypeDesc || "-",
      "Status": item.active ? "Active" : "Inactive",
      "Created By": item.createdBy || "-",
      "Created On": item.createdOn || "-",
      "Modified By": item.modifiedBy || "-",
      "Modified On": item.modifiedOn || "-",
    }));
    exportToExcel(dataToExport, "UserTypeData", "User Types");
  };

  const handleToggleChange = (status) => {
    setToggle(status);
    switch (status) {
      case "all":
        setType(1);
        break;
      case "waiting":
        setType(2);
        break;
      case "approved":
        setType(3);
        break;
      default:
        setType(1);
    }
  };

  const filterData = (raw) => {
    if (raw.length === 0) return [];
    if (Type === 1) return raw;
    if (Type === 2) return raw.filter((item) => item.active);
    if (Type === 3) return raw.filter((item) => !item.active);
    return [];
  };

  useEffect(() => {
    const filtered = filterData(raw);
    setUser(filtered);
  }, [Type, toggle, raw]);

  return (
    <>

      {/* Filter & Search Section – FULLY RESPONSIVE */}
      {isFormVisible && (
        <div className="px-2 pt-4 pb-2">
          <div className="flex items-center justify-between gap-4 w-full flex-wrap">

            <div className="relative w-full max-w-xs">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center">
                <Search size={16} />
              </span>
              <input
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm
                  bg-white text-gray-900 focus:ring-3 focus:ring-purple-200 focus:border-purple-500 
                  focus:outline-none transition-all duration-150"
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

              {/* ADD BUTTON */}
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
                  Add User Type
                </button>)}
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
      <div className="">
        {!isFormVisible ? (
          <UserTypeForm
            fetchData={fetchData}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setIsFormVisible={setIsFormVisible}
            setIsUpdateMode={setIsUpdateMode}
            isUpdateMode={isUpdateMode}
          />
        ) : (
          <UserTypeTable
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

export default UserType;

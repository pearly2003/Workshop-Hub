import React, { useState, useEffect } from "react";
import MenuCreationForm from "../../component/useManagement/menuCreation/MenuCreationForm";
import MenuCreationTable from "../../component/useManagement/menuCreation/MenuCreationTable";
import {
  ArrowDown,
  ArrowLeft,
  CirclePlusIcon,
  Search,
  Plus,
  Download
} from "lucide-react";
import { GETMenuAPI } from "../../service/Api";
import { useData } from "../../context/DataProvider";
import { useAuth } from "../../context/AuthProvider";
import { exportToExcel } from "../../../utils/ExportUtils";

const ComMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menus, setMenus] = useState([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [current, setCurrent] = useState(1);
  const [toggle, setToggle] = useState("all");
  const [Type, setType] = useState(1);
  const [raw, setRaw] = useState([]);
  const { isLoading, setIsLoading } = useData();
  const { rights } = useAuth();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await GETMenuAPI();
      setRaw(response.data.data);
      setMenus(response.data.data);
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
    setSelectedMenu(null);
    setIsUpdateMode(false);
  };

  const handleBackClick = () => {
    setIsFormVisible(true);
  };

  const handleExport = () => {
    const dataToExport = menus.map((item, index) => ({
      "S.No": index + 1,
      "Menu Name": item.menuName || "-",
      "Menu URL": item.menuURL || "-",
      "Menu Level": item.parent_SK ? "Sub Menu" : "Parent Menu",
      "Parent Menu ID": item.parent_SK || "-",
      "Menu Order": item.menuOrder || "-",
      "Status": item.active ? "Active" : "Inactive",
    }));
    exportToExcel(dataToExport, "MenuData", "Menus");
  };

  const handleToggleChange = (status) => {
    setToggle(status);
    switch (status) {
      case "all":
        setType(1);
        break;
      case "active":
        setType(2);
        break;
      case "inactive":
        setType(3);
        break;
      default:
        setType(1);
    }
  };

  const filterData = (data) => {
    if (data.length === 0) return [];
    if (Type === 1) return data;
    if (Type === 2) return data.filter((item) => item.active);
    if (Type === 3) return data.filter((item) => !item.active);
    return [];
  };

  useEffect(() => {
    const filtered = filterData(raw);
    setMenus(filtered);
    setCurrent(1);
  }, [Type, toggle, raw]);

  useEffect(() => {
    setCurrent(1);
  }, [perPage]);

  const filterMasterMenus = (menus) => {
    return menus.filter((menu) => menu.menuLevel === 0 && menu.active === true);
  };

  const filteredMenus = filterMasterMenus(menus);

  return (
    <div className="min-h-screen">
      {/* Filter & Search Section */}
      {isFormVisible && (
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between gap-4 w-full flex-wrap">
            <div className="relative w-full max-w-xs">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Search size={16} />
              </span>
              <input
                type="search"
                placeholder="Search menus..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-none bg-white rounded-2xl pl-12 pr-4 py-3 text-sm
                  shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
              />
            </div>

            <div className="flex items-center justify-end gap-6 flex-wrap">
              {/* TABS */}
              <div className="flex items-center bg-white p-1 rounded-2xl shadow-sm ring-1 ring-gray-100">
                {[
                  { id: "all", label: "All" },
                  { id: "active", label: "Active" },
                  { id: "inactive", label: "Inactive" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleToggleChange(tab.id)}
                    className={`px-4 py-2 text-xs font-medium rounded-xl transition-all
                        ${toggle === tab.id ? "bg-[var(--color-primary)] text-white shadow-md shadow-blue-100" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* PER PAGE */}
              <div className="relative">
                <select
                  value={perPage}
                  onChange={(e) => setPerPage(Number(e.target.value))}
                  className="appearance-none border-none bg-white ring-1 ring-gray-100 rounded-xl px-5 pr-10 py-2.5 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  {[5, 10, 20, 50].map((n) => (
                    <option key={n} value={n}>
                      {n} Per Page
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <ArrowDown size={14} />
                </span>
              </div>

              {/* ADD BUTTON */}
              <button
                onClick={handleExport}
                className="hidden md:flex items-center gap-2 text-xs font-medium bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl shadow-lg shadow-blue-100 hover:opacity-90 active:scale-95 transition-all"
                title="Export to Excel"
              >
                <Download size={16} />
                Export
              </button>
              {rights?.rights_Insert && (
                <button
                  onClick={handleAddClick}
                  className="hidden md:flex items-center gap-2 text-xs font-medium bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-xl shadow-lg shadow-blue-100 hover:opacity-90 active:scale-95 transition-all"
                >
                  <CirclePlusIcon size={16} />
                  New Menu
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
          <MenuCreationForm
            fetchData={fetchData}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            setIsFormVisible={setIsFormVisible}
            setIsUpdateMode={setIsUpdateMode}
            isUpdateMode={isUpdateMode}
            filteredMenus={filteredMenus}
            BackClick={handleBackClick}
          />
        ) : (
          <MenuCreationTable
            menus={menus}
            current={current}
            setCurrent={setCurrent}
            perPage={perPage}
            searchTerm={searchTerm}
            setIsFormVisible={setIsFormVisible}
            setIsUpdateMode={setIsUpdateMode}
            setSelectedMenu={setSelectedMenu}
            rights={rights}
          />
        )}
      </div>
    </div>
  );
};

export default ComMenu;

import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  TrendingUp,
  Grid,
  PlayCircle,
  Clock,
  Users,
  Settings,
  ChevronRight,
  ChevronLeft,
  Scissors,
  Menu,
  LayoutGrid,
  Pickaxe,
  ClipboardList,
  Power
} from "lucide-react";
import { MenuGetByRoleSKAPI } from "../service/Api";
import { useAuth } from "../context/AuthProvider";
import { useData } from "../context/DataProvider";

const SideBar = ({ sidebarOpen, onToggleSidebar }) => {
  const [menuData, setMenuData] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogout, setRights } = useAuth();
  const { setLanguage } = useData();
  const loginData = JSON.parse(sessionStorage.getItem("LoginData"));
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  const fetchMenu = async () => {
    if (loginData?.role_SK) {
      try {
        const response = await MenuGetByRoleSKAPI(loginData.role_SK);
        if (response.status === 200) {
          sessionStorage.removeItem("MenusList");
          setMenuData(response.data.data);
          sessionStorage.setItem("MenusList", JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const getIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes("home") || t.includes("dashboard"))
      return <Home size={20} />;
    if (t.includes("production")) return <Pickaxe size={20} />;
    if (t.includes("trending")) return <TrendingUp size={20} />;
    if (t.includes("categories") || t.includes("master"))
      return <Grid size={20} />;
    if (t.includes("live") || t.includes("bill"))
      return <PlayCircle size={20} />;
    if (t.includes("recent") || t.includes("quotation"))
      return <Clock size={20} />;
    if (t.includes("following") || t.includes("user"))
      return <Users size={20} />;
    if (t.includes("settings") || t.includes("rights"))
      return <Settings size={20} />;
    return <Grid size={20} />;
  };

  const handleMenuClick = (menu) => {
    if (menu.content && menu.content.length > 0) {
      const matchingSubMenu = menu.content.find(
        (sub) => sub.title === menu.title,
      );
      if (matchingSubMenu && menu.content.length === 1) {
        navigate(matchingSubMenu.to);
        setRights({
          rights_Insert: matchingSubMenu.rights_Insert,
          rights_Update: matchingSubMenu.rights_Update,
          rights_View: matchingSubMenu.rights_View,
          rights_Approval: matchingSubMenu.rights_Approval,
          rights_Delete: matchingSubMenu.rights_Delete,
        });
      } else {
        setActiveMenu(activeMenu === menu.menu_Sk ? null : menu.menu_Sk);
      }
    }
  };

  const handleSubMenuClick = (subMenu) => {
    navigate(subMenu.to);
    setRights({
      rights_Insert: subMenu.rights_Insert,
      rights_Update: subMenu.rights_Update,
      rights_View: subMenu.rights_View,
      rights_Approval: subMenu.rights_Approval,
      rights_Delete: subMenu.rights_Delete,
    });
  };

  const isPathActive = (path) => location.pathname === path;
  return (
    <aside
      ref={sidebarRef}
      className={`h-full bg-white border-r border-gray-100 transition-all duration-200 flex flex-col ${sidebarOpen ? "overflow-hidden w-64" : "overflow-visible w-20"}`}
    >
      {/* Sidebar Header */}
      <div className="px-4 py-6 flex items-center justify-between">
        {sidebarOpen ? (
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/DashBoard")}
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-white font-bold text-[14px]">W</span>
            </div>
            <span className="text-[17px] font-bold text-gray-900 tracking-tight">
              Workshop Hub
            </span>
          </div>
        ) : (
          <div
            className="w-10 h-10 mx-auto rounded-full bg-blue-500 flex items-center justify-center cursor-pointer shadow-sm hover:opacity-90 hover:scale-105 transition-all active:scale-95"
            onClick={() => navigate("/DashBoard")}
          >
            <span className="text-white font-bold text-[16px]">W</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className={`flex-1 px-3 mt-2 ${sidebarOpen ? "overflow-y-auto custom-scrollbar" : "overflow-visible"}`}>
        <nav className="space-y-1.5">
          {/* Static Dashboard */}
          <div className="relative">
            <button
              onClick={() => navigate("/DashBoard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${isPathActive("/DashBoard")
                ? "bg-blue-50 text-blue-500 font-semibold"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } ${!sidebarOpen ? "justify-center px-0" : ""}`}
            >
              <div className="flex-shrink-0">
                <LayoutGrid size={20} className={isPathActive("/DashBoard") ? "text-blue-500" : "text-gray-500"} strokeWidth={2} />
              </div>
              {sidebarOpen && (
                <span className="text-[14px] flex-1 text-left truncate">
                  Dashboard
                </span>
              )}
            </button>
          </div>

          {/* Static Job Requests */}
          <div className="relative">
            <button
              onClick={() => navigate("/JobRequests")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${isPathActive("/JobRequests")
                ? "bg-blue-50 text-blue-500 font-semibold"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } ${!sidebarOpen ? "justify-center px-0" : ""}`}
            >
              <div className="flex-shrink-0">
                <ClipboardList size={20} className={isPathActive("/JobRequests") ? "text-blue-500" : "text-gray-500"} strokeWidth={2} />
              </div>
              {sidebarOpen && (
                <span className="text-[14px] flex-1 text-left truncate">
                  Job Requests
                </span>
              )}
            </button>
          </div>

          {/* Dynamic Menus */}
          {menuData.map((menu) => {
            const hasSubmenu = menu.content && menu.content.length > 0;
            const isActive =
              activeMenu === menu.menu_Sk ||
              menu.content?.some((sub) => isPathActive(sub.to));

            return (
              <div key={menu.menu_Sk} className="relative">
                <button
                  onClick={() => handleMenuClick(menu)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group
                    ${isActive
                      ? "bg-blue-50 text-blue-500 font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                    ${!sidebarOpen ? "justify-center px-0" : ""}`}
                >
                  <div
                    className={`flex-shrink-0 transition-colors ${isActive ? "text-blue-500" : "text-gray-500 group-hover:text-gray-700"}`}
                  >
                    {getIcon(menu.title)}
                  </div>

                  {sidebarOpen && (
                    <span className="text-[14px] flex-1 text-left truncate">
                      {menu.title}
                    </span>
                  )}

                  {sidebarOpen &&
                    hasSubmenu &&
                    !(
                      menu.content.length === 1 &&
                      menu.content[0].title === menu.title
                    ) && (
                      <ChevronRight
                        size={16}
                        className={`flex-shrink-0 transition-transform duration-200 ${isActive ? "text-blue-500" : "text-gray-400"} ${activeMenu === menu.menu_Sk ? "rotate-90" : ""}`}
                      />
                    )}
                </button>

                {/* Submenu */}
                {hasSubmenu &&
                  activeMenu === menu.menu_Sk &&
                  (sidebarOpen ? (
                    <div className="mt-1 ml-6 space-y-1 border-l border-gray-200 pl-4 py-1">
                      {menu.content.map((sub) => (
                        <button
                          key={sub.menu_SK}
                          onClick={() => handleSubMenuClick(sub)}
                          className={`w-full text-left px-3 py-2.5 text-[13.5px] rounded-xl transition-all duration-150
                            ${isPathActive(sub.to)
                              ? "text-blue-500 font-semibold bg-blue-50/50"
                              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                        >
                          {sub.title}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="absolute left-full top-0 ml-3 w-52 bg-white rounded-2xl p-2 shadow-lg border border-gray-100 z-[9999]">
                      <div className="mb-2 px-3 py-2 bg-gray-50 rounded-xl">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                          {menu.title}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {menu.content.map((sub) => (
                          <button
                            key={sub.menu_SK}
                            onClick={() => handleSubMenuClick(sub)}
                            className={`w-full text-left px-3 py-2.5 text-[13.5px] rounded-xl transition-all duration-150
                              ${isPathActive(sub.to)
                                ? "bg-blue-50 text-blue-500 font-semibold"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              }`}
                          >
                            {sub.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto px-4 pb-6 pt-4 bg-white">
        <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${!sidebarOpen ? "justify-center px-0" : ""}`}>
          <Settings size={20} className="text-gray-500" strokeWidth={2} />
          {sidebarOpen && <span className="text-[14px] font-medium">Settings</span>}
        </button>

        {sidebarOpen && <div className="h-px bg-gray-100 my-4 w-full"></div>}

        <div className={`flex items-center justify-between ${!sidebarOpen ? "mt-4 flex-col gap-4" : ""}`}>
          <div className="flex items-center gap-3">
            <img
              src={`https://ui-avatars.com/api/?name=${loginData?.userName || 'Mathew'}&background=random`}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
            />
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-gray-900 leading-tight">
                  {loginData?.userName || "Ali"}
                </span>
                <span className="text-[12px] text-gray-500 mt-0.5">
                  {loginData?.roleName || "Receptionist"}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              handleLogout();
            }}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors focus:outline-none"
          >
            <Power size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;

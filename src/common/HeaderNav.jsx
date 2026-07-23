import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, TrendingUp, Grid, PlayCircle, Clock,
  Users, Settings, ChevronDown, Scissors, Pickaxe,
} from "lucide-react";
import { MenuGetByRoleSKAPI } from "../service/Api";
import { useAuth } from "../context/AuthProvider";

const HeaderNav = () => {
  const [menuData, setMenuData] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { setRights } = useAuth();
  const loginData = JSON.parse(sessionStorage.getItem("LoginData"));
  const containerRef = useRef(null);

  /* ── Close flyout on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Fetch menu ── */
  useEffect(() => {
    const fetchMenu = async () => {
      if (loginData?.role_SK) {
        try {
          const res = await MenuGetByRoleSKAPI(loginData.role_SK);
          if (res.status === 200) {
            setMenuData(res.data.data);
            sessionStorage.setItem("MenusList", JSON.stringify(res.data));
          }
        } catch (err) {
          console.error("Error fetching menu:", err);
        }
      }
    };
    fetchMenu();
  }, []);

  const getIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes("home") || t.includes("dashboard")) return <Home size={15} />;
    if (t.includes("production")) return <Pickaxe size={15} />;
    if (t.includes("trending")) return <TrendingUp size={15} />;
    if (t.includes("master") || t.includes("categor")) return <Grid size={15} />;
    if (t.includes("live") || t.includes("bill")) return <PlayCircle size={15} />;
    if (t.includes("recent") || t.includes("quotat")) return <Clock size={15} />;
    if (t.includes("user")) return <Users size={15} />;
    if (t.includes("setting") || t.includes("rights")) return <Settings size={15} />;
    return <Grid size={15} />;
  };

  const isPathActive = (path) => location.pathname === path;
  const isMenuActive = (menu) =>
    menu.content?.some((sub) => isPathActive(sub.to));

  const handleMenuClick = (menu) => {
    debugger

    if (menu.content?.length === 1 && menu.content[0].title === menu.title) {
      navigate(menu.content[0].to);
      setRights({
        rights_Insert: menu.content[0].rights_Insert,
        rights_Update: menu.content[0].rights_Update,
        rights_View: menu.content[0].rights_View,
        rights_Approval: menu.content[0].rights_Approval,
        rights_Delete: menu.content[0].rights_Delete,
      });
      setOpenMenu(null);
    } else {
      setOpenMenu(openMenu === menu.menu_Sk ? null : menu.menu_Sk);
    }
  };

  const handleSubMenuClick = (sub) => {
    navigate(sub.to);
    setRights({
      rights_Insert: sub.rights_Insert,
      rights_Update: sub.rights_Update,
      rights_View: sub.rights_View,
      rights_Approval: sub.rights_Approval,
      rights_Delete: sub.rights_Delete,
    });
    setOpenMenu(null);
  };

  return (
    <nav
      ref={containerRef}
      className="hidden md:flex items-center gap-1 flex-1 overflow-x-auto px-2"
    >
      {menuData.map((menu) => {
        const hasSubmenu = menu.content?.length > 1 ||
          (menu.content?.length === 1 && menu.content[0].title !== menu.title);
        const active = isMenuActive(menu);
        const isOpen = openMenu === menu.menu_Sk;

        return (
          <div key={menu.menu_Sk} className="relative flex-shrink-0">
            <button
              onClick={() => handleMenuClick(menu)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-150
                ${active
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-gray-500 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"
                }`}
            >
              {getIcon(menu.title)}
              <span>{menu.title}</span>
              {hasSubmenu && (
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              )}
            </button>

            {/* Dropdown submenu */}
            {hasSubmenu && isOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.10)] border border-[var(--color-primary)]/15 py-2 z-[9999]">
                <div className="px-3 pb-1.5 mb-1 border-b border-gray-50">
                  <span className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-widest">
                    {menu.title}
                  </span>
                </div>
                <div className="space-y-0.5 px-1.5">
                  {menu.content.map((sub) => (
                    <button
                      key={sub.menu_SK}
                      onClick={() => handleSubMenuClick(sub)}
                      className={`w-full text-left px-3 py-2 text-[13px] font-medium rounded-xl transition-all duration-150
                        ${isPathActive(sub.to)
                          ? "bg-[var(--color-primary)] text-white shadow-sm"
                          : "text-gray-600 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"
                        }`}
                    >
                      {sub.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default HeaderNav;

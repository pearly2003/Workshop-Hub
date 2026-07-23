import {
  LogOut,
  KeyRound,
  ChevronLeft,
  Bell,
  Eye,
  EyeOff,
  X,
  Scissors,
  ChevronRight,
  BellDot,
  Search,
  Settings,
  User,
  Edit2,
  Globe,
  Menu
} from "lucide-react";
// import AlertMsg, { useAlertMsg } from "./AlertMsg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { updatePSWAPI } from "../service/Api";
import { useData } from "../context/DataProvider";
import { MdEncryptPassword } from "../../utils/EncryptDecrypt";
import { toast } from "react-toastify";

const Header = ({
  onToggleSidebar,
  isProfileOpen,
  setIsProfileOpen,
  sidebarOpen,
}) => {

  // Change Password Modal State
  const [isChangePswOpen, setIsChangePswOpen] = useState(false);
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);
  const [pswForm, setPswForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [pswShow, setPswShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [pswError, setPswError] = useState("");
  const [pswLoading, setPswLoading] = useState(false);

  // Toast state – powered by reusable AlertMsg
  const { loginInfo, language, setLanguage, t } = useData();

  const openChangePsw = () => {
    setPswForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setPswError("");
    setIsProfileOpen(false);
    setIsChangePswOpen(true);
  };

  const handlePswSubmit = async (e) => {
    e.preventDefault();
    setPswError("");
    if (
      // !pswForm.oldPassword ||
      !pswForm.newPassword ||
      !pswForm.confirmPassword
    ) {
      setPswError("All fields are required.");
      return;
    }
    if (pswForm.newPassword !== pswForm.confirmPassword) {
      setPswError("New password and confirm password do not match.");
      return;
    }
    // if (pswForm.newPassword.length < 6) {
    //   setPswError("New password must be at least 6 characters.");
    //   return;
    // }
    // const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
    try {
      setPswLoading(true);
      const encryptedNewPassword = MdEncryptPassword(pswForm.newPassword);
      await updatePSWAPI({
        user_SK: loginInfo?.user_Sk,
        oldPassword: pswForm.oldPassword,
        password: encryptedNewPassword,
      });
      toast.success("Password changed successfully!");
      setTimeout(() => setIsChangePswOpen(false), 1500);
    } catch (err) {
      setPswError(
        err?.response?.data?.message ||
        "Failed to change password. Please try again.",
      );
    } finally {
      setPswLoading(false);
    }
  };
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const AdminisAuthenticated = useSelector(
    (state) => state.auth.adminIsAuthenticated,
  );

  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [pageDescription, setPageDescription] = useState(
    "Get summary of your weekly online transactions here.",
  );

  useEffect(() => {
    const menusListData = JSON.parse(sessionStorage.getItem("MenusList"));
    const menus = menusListData?.data || [];

    if (menus.length > 0) {
      let foundTitle = "Dashboard";
      for (const menu of menus) {
        // Check if current path matches any sub-menu
        if (menu.content && menu.content.length > 0) {
          const activeSub = menu.content.find(
            (sub) => sub.to === location.pathname,
          );
          if (activeSub) {
            foundTitle = activeSub.title;
            break;
          }
        }
        // Also check if the menu itself matches
        if (menu.to === location.pathname) {
          foundTitle = menu.title;
          break;
        }
      }
      setPageTitle(foundTitle);

      // Update description based on title for a more dynamic feel
      // if (foundTitle === "Dashboard") {
      //   setPageDescription(
      //     "Get summary of your weekly online transactions here.",
      //   );
      // } else {
      //   setPageDescription(
      //     `Manage your ${foundTitle.toLowerCase()} data efficiently and effectively.`,
      //   );
      // }
    }
  }, [location.pathname]);

  return (
    <div className="z-50 w-full print:hidden">
      {/* Minimal White Header */}
      <header className="mx-auto px-6 h-16 flex items-center justify-between bg-white border-b border-gray-200 w-full transition-all duration-300">
        {/* Left: Navigation Section */}
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="md:hidden mr-3 p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
          >
            <Menu size={24} />
          </button>
          {/* <h2 className="text-[17px] font-bold text-gray-800 tracking-wide">
            {pageTitle}
          </h2> */}
        </div>

        {/* Right: Actions Section */}
        <div className="flex items-center gap-5">
          {/* Search Bar */}
          <div className="relative hidden md:block w-64 lg:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={t('header.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 bg-gray-100/80 border-none rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-gray-200 mx-1"></div>

          {/* Action Icons */}
          <div className="hidden md:flex items-center gap-4 mr-2">
            <button
              onClick={() => setLanguage((prev) => (prev === "en" ? "ar" : "en"))}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors mr-2 focus:outline-none active:scale-95"
            >
              <Globe size={18} strokeWidth={2} />
              <span className="text-sm font-medium text-gray-700">{language === "en" ? "English" : "Arabic"}</span>
            </button>
            <button className="text-gray-500 hover:text-gray-800 transition-colors">
              <Bell size={20} strokeWidth={2} />
            </button>
          </div>

          {/* User Profile Section */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="block focus:outline-none active:scale-95 transition-transform"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${AdminisAuthenticated?.userName || ""}&background=3b82f6&color=fff&bold=true`}
                alt="User"
                className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
              />
            </button>

            {/* Profile Dropdown */}
            <>
              {isProfileOpen && (
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsProfileOpen(false)}
                ></div>
              )}
              <div
                className={`absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20 
                  transition-all duration-200 ease-out origin-top-right
                  ${isProfileOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
              >
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${AdminisAuthenticated?.userName || ""}&background=3b82f6&color=fff&bold=true`}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-gray-800 leading-tight">
                      {AdminisAuthenticated?.userName || ""}
                    </span>
                    <span className="text-[12px] text-gray-500 mt-0.5">
                      {AdminisAuthenticated?.roleName || ""}
                    </span>
                  </div>
                </div>

                <div className="py-2 flex flex-col">
                  <button
                    onClick={openChangePsw}
                    className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <Edit2 size={15} className="text-gray-400" strokeWidth={2.5} />
                    <span>{t('header.changePassword')}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      setIsViewProfileOpen(true);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 mt-1 text-[13px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <User size={15} className="text-gray-400" strokeWidth={2.5} />
                    <span>{t('header.viewProfile')}</span>
                  </button>

                  <div className="h-px bg-gray-100 my-2 mx-4"></div>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      dispatch(logout());
                      navigate("/");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <LogOut size={15} className="text-gray-400" strokeWidth={2.5} />
                    <span>{t('header.logout')}</span>
                  </button>
                </div>
              </div>
            </>
          </div>
        </div>
      </header>

      {/* ── Change Password Modal ── */}
      {isChangePswOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsChangePswOpen(false);
          }}
        >
          <div className="relative bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-gray-100 w-full max-w-sm mx-4 overflow-hidden animate-[fadeInScale_0.2s_ease]">
            {/* Modal Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-50 bg-gradient-to-r from-[var(--color-primary)]/8 via-white to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <KeyRound
                      size={17}
                      className="text-[var(--color-primary)]"
                    />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-800 leading-tight">
                      {t('header.changePassword')}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-medium">
                      Update your account password
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChangePswOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-all active:scale-95"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handlePswSubmit} className="px-6 py-5 space-y-4">
              {/* New Password */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={pswShow.new ? "text" : "password"}
                    value={pswForm.newPassword}
                    onChange={(e) =>
                      setPswForm({ ...pswForm, newPassword: e.target.value })
                    }
                    tabIndex={1}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2.5 pr-10 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setPswShow((s) => ({ ...s, new: !s.new }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {pswShow.new ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={pswShow.confirm ? "text" : "password"}
                    value={pswForm.confirmPassword}
                    tabIndex={2}
                    onChange={(e) =>
                      setPswForm({
                        ...pswForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Re-enter new password"
                    className="w-full px-4 py-2.5 pr-10 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setPswShow((s) => ({ ...s, confirm: !s.confirm }))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {pswShow.confirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Error / Success */}
              {pswError && (
                <p className="text-xs text-red-500 font-medium bg-red-50 px-3 py-2 rounded-xl">
                  {pswError}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-1 flex-col sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIsChangePswOpen(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all active:scale-95"
                  tabIndex={4}

                >
                  {t('header.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={pswLoading}
                  tabIndex={3}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[var(--color-primary)] hover:opacity-90 rounded-xl shadow-sm transition-all active:scale-95 disabled:opacity-60"
                >
                  {pswLoading ? t('header.updating') : t('header.updatePassword')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── View Profile Modal ── */}
      {isViewProfileOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsViewProfileOpen(false);
          }}
        >
          <div className="relative bg-white rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-gray-100 w-full max-w-sm mx-4 overflow-hidden animate-[fadeInScale_0.2s_ease] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800 tracking-tight">{t('header.viewProfile')}</h2>
              <button
                onClick={() => setIsViewProfileOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-3xl font-bold">
                {loginInfo?.userName ? loginInfo.userName.charAt(0).toUpperCase() : "U"}
              </div>
            </div>

            <div className="border-t border-gray-100 mb-6"></div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1.5">User Name</label>
                <div className="px-3 py-2.5 bg-[#F9FAFB] border border-gray-200/80 rounded-lg text-[13px] text-gray-700 font-medium">
                  {loginInfo?.userName || "—"}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1.5">User Type</label>
                <div className="px-3 py-2.5 bg-[#F9FAFB] border border-gray-200/80 rounded-lg text-[13px] text-gray-700 font-medium">
                  {loginInfo?.userTypeDesc || loginInfo?.roleName || "—"}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1.5">Mobile No</label>
                <div className="px-3 py-2.5 bg-[#F9FAFB] border border-gray-200/80 rounded-lg text-[13px] text-gray-700 font-medium">
                  {loginInfo?.mobileno || "—"}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1.5">Email ID</label>
                <div className="px-3 py-2.5 bg-[#F9FAFB] border border-gray-200/80 rounded-lg text-[13px] text-gray-700 font-medium">
                  {loginInfo?.emailId || "—"}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => setIsViewProfileOpen(false)}
                className="w-full py-2.5 bg-white border border-gray-300 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                {t('header.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

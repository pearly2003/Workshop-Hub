import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../common/Header";
import SideBar from "../common/SideBar";
import { ChevronLeft, Scissors, Users, Menu } from "lucide-react";
import Loader from "../common/Loader";
import { useData } from "../context/DataProvider";

const HomeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoading } = useData();

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex h-screen overflow-hidden bg-[var(--bg-off-white)] max-w-[146rem] mx-auto ">
        {/* Sidebar - Hidden on mobile, full height on desktop */}
        <aside
          className={`hidden md:block transition-all duration-300 ease-in-out shrink-0 h-full  rounded-tr-2xl rounded-br-2xl shadow-lg bg-white
         ${sidebarOpen ? "w-64" : "w-20"}
        `}
        >
          {/* <aside
        className={`hidden md:block transition-all p-3 py-4 duration-300 ease-in-out shrink-0 h-full 
          ${sidebarOpen ? "w-64" : "w-20"}
        `}
      > */}
          <SideBar
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Header - Top Section */}
          <div className="z-30 md:pt-0">
            <Header
              onToggleSidebar={() => {
                if (window.innerWidth < 768) {
                  setMobileMenuOpen(true);
                } else {
                  setSidebarOpen((prev) => !prev);
                }
              }}
              isProfileOpen={isProfileOpen}
              setIsProfileOpen={setIsProfileOpen}
              sidebarOpen={sidebarOpen}
            />
          </div>
          {isProfileOpen && (
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsProfileOpen(false)}
            ></div>
          )}

          {/* Scrollable Body Section */}
          <main className="flex-1 flex flex-col justify-between overflow-y-auto overflow-x-hidden p-2 md:p-3 pb-28 md:pb-2 bg-[var(--bg-off-white)]">
            <div className="max-w-[104rem] mx-auto w-full">
              <Outlet />
            </div>

            <div className="text-center py-3 mt-4">
              <p className="text-[12px] font-medium text-gray-400 tracking-wide">
                © 2026 Workshop Management System. All rights reserved.
              </p>
            </div>
          </main>

          {/* Removed Old Mobile Bottom Navigation */}

          {/* Mobile Sidebar Overlay */}
          {mobileMenuOpen && (
            <div
              className="md:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-64 shadow-2xl transition-transform transform translate-x-0"
                onClick={(e) => e.stopPropagation()}
              >
                <SideBar
                  sidebarOpen={true}
                  onToggleSidebar={() => setMobileMenuOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeLayout;

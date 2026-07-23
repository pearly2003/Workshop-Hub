import React from "react";

export const MobileMenuSideBar = ({
  setmblMenuOpen,
  mblMenuOpen,
  menuData,
  AdminisAuthenticated,
  isMenuActive,
  isSubMenuActive,
  MenuOnClick,
  setRights,
}) => {

  return (
    <div>
      <div className="hidden sm:block p-2 py-0">
        <div className="flex gap-5 relative w-96 overflow-x-auto md:overflow-x-visible justify-center">
          {menuData.map((mainMenu) => {
            const isActive = isMenuActive(mainMenu);

            // Check if any submenu title matches the main menu title
            const matchingSubMenu =
              mainMenu.content &&
              mainMenu.content.find(
                (subMenu) => subMenu.title === mainMenu.title,
              );

            // If matching submenu found and content length > 0 → direct navigation
            const isDirectNav = matchingSubMenu && mainMenu.content.length > 0;

            return (
              <>
                {mainMenu.content.length > 0 ? (
                  <div key={mainMenu.menu_Sk} className="relative group">
                    {isDirectNav ? (
                      // ✅ Direct clickable navigation (no hover dropdown)
                      <div
                        className={`cursor-pointer px-4 py-2 rounded-full transition-all duration-200 ${isActive
                          ? "bg-[var(--color-primary)] text-white shadow-lg"
                          : "text-[var(--color-primary)] hover:bg-gray-100"
                          }`}
                        onClick={() => {
                          MenuOnClick(matchingSubMenu);
                          setRights({
                            rights_Insert: matchingSubMenu?.rights_Insert,
                            rights_Update: matchingSubMenu?.rights_Update,
                            rights_Export: matchingSubMenu?.rights_Export,
                            rights_View: matchingSubMenu?.rights_View,
                            rights_Approval: matchingSubMenu?.rights_Approval,
                            rights_Delete: matchingSubMenu?.rights_Delete,
                          });
                        }}
                      >
                        {mainMenu.title}
                      </div>
                    ) : (
                      // ✅ Hover dropdown for non-matching menus
                      <>
                        <div
                          className={`cursor-pointer px-4 py-2 rounded-full transition-all duration-200 ${isActive
                            ? "bg-[var(--color-primary)] text-white shadow-lg"
                            : "text-[var(--color-primary)] hover:bg-gray-100"
                            }`}
                        >
                          {mainMenu.title}
                        </div>

                        {/* Submenu on hover */}
                        <div className="absolute left-0 top-full hidden group-hover:flex flex-col bg-white shadow-xl rounded-md overflow-hidden min-w-[200px] z-50">
                          {mainMenu.content.map((subMenu) => {
                            const isSubActive = isSubMenuActive(subMenu);
                            return (
                              <div
                                key={subMenu.menu_SK}
                                className={`px-4 py-3 cursor-pointer text-nowrap transition-all duration-200 ${isSubActive
                                  ? "bg-[var(--color-primary-400)] text-white shadow-md"
                                  : "text-gray-700 hover:bg-gray-100 hover:text-[var(--color-primary)]"
                                  }`}
                                onClick={() => {
                                  MenuOnClick(subMenu);
                                  setRights({
                                    rights_Insert: subMenu.rights_Insert,
                                    rights_Update: subMenu.rights_Update,
                                    rights_View: subMenu.rights_View,
                                    rights_Approval: subMenu.rights_Approval,
                                    rights_Delete: subMenu.rights_Delete,
                                  });
                                }}
                              >
                                {subMenu.title}
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mblMenuOpen && (
        <div className="min-h-screen bg-gray-100 md:hidden block lg:hidden">
          {mblMenuOpen && (
            <div
              className="fixed inset-0 bg-black/20 bg-opacity-50 z-40 lg:hidden md:hidden transition-opacity duration-300"
              onClick={() => setmblMenuOpen(false)}
            />
          )}

          <div className="absolute">
            {AdminisAuthenticated && mblMenuOpen && (
              <div
                className={`lg:hidden md:hidden fixed top-0 right-0 bottom-0 bg-white h-screen w-64 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${mblMenuOpen ? "translate-x-0" : "translate-x-full"
                  }`}
              >
                <div className="flex flex-col gap-5 p-4 overflow-y-auto h-full">
                  <div className="flex justify-between items-center mb-2 pb-4 border-b">
                    <h2 className="text-lg font-medium text-gray-800">
                      Menu
                    </h2>
                    <button
                      onClick={() => setmblMenuOpen(false)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  {menuData.map((mainMenu) => {
                    const isActive = isMenuActive(mainMenu);

                    // Same logic for mobile
                    const matchingSubMenu =
                      mainMenu.content &&
                      mainMenu.content.find(
                        (subMenu) => subMenu.title === mainMenu.title,
                      );

                    const isDirectNav =
                      matchingSubMenu && mainMenu.content.length > 0;

                    return (
                      <div key={mainMenu.menu_Sk} className="relative">
                        {isDirectNav ? (
                          // ✅ Direct clickable navigation on mobile
                          <div
                            className={`cursor-pointer px-4 py-2 rounded-full transition-all duration-200 ${isActive
                              ? "bg-[var(--color-primary)] text-white shadow-lg"
                              : "text-blue-500 hover:bg-gray-100"
                              }`}
                            onClick={() => {
                              MenuOnClick(matchingSubMenu);
                              setRights({
                                rights_Insert: matchingSubMenu.rights_Insert,
                                rights_Update: matchingSubMenu.rights_Update,
                                rights_View: matchingSubMenu.rights_View,
                                rights_Approval:
                                  matchingSubMenu.rights_Approval,
                                rights_Delete: matchingSubMenu.rights_Delete,
                              });
                              setmblMenuOpen(false);
                            }}
                          >
                            {mainMenu.title}
                          </div>
                        ) : (
                          // ✅ Expanded submenu list on mobile
                          <>
                            <div
                              className={`cursor-pointer px-4 py-2 rounded-full transition-all duration-200 ${isActive
                                ? "bg-[var(--color-primary)] text-white shadow-lg"
                                : "text-blue-500 hover:bg-gray-100"
                                }`}
                            >
                              {mainMenu.title}
                            </div>

                            {mainMenu.content &&
                              mainMenu.content.length > 0 && (
                                <div className="mt-2 ml-4 flex flex-col gap-1">
                                  {mainMenu.content.map((subMenu) => {
                                    const isSubActive =
                                      isSubMenuActive(subMenu);
                                    return (
                                      <div
                                        key={subMenu.menu_SK}
                                        className={`px-4 py-3 cursor-pointer rounded-md transition-all duration-200 ${isSubActive
                                          ? "bg-[var(--color-primary-600)] text-white shadow-md"
                                          : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                                          }`}
                                        onClick={() => {
                                          MenuOnClick(subMenu);
                                          setRights({
                                            rights_Insert:
                                              subMenu.rights_Insert,
                                            rights_Update:
                                              subMenu.rights_Update,
                                            rights_View: subMenu.rights_View,
                                            rights_Approval:
                                              subMenu.rights_Approval,
                                            rights_Delete:
                                              subMenu.rights_Delete,
                                          });
                                        }}
                                      >
                                        {subMenu.title}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "wrk_menu_position";

const MenuPositionContext = createContext(null);

export const MenuPositionProvider = ({ children }) => {
  const [menuPosition, setMenuPositionState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || "sidebar";
  });

  const setMenuPosition = (pos) => {
    localStorage.setItem(STORAGE_KEY, pos);
    setMenuPositionState(pos);
  };

  return (
    <MenuPositionContext.Provider value={{ menuPosition, setMenuPosition }}>
      {children}
    </MenuPositionContext.Provider>
  );
};

export const useMenuPosition = () => {
  const ctx = useContext(MenuPositionContext);
  if (!ctx) throw new Error("useMenuPosition must be used within MenuPositionProvider");
  return ctx;
};

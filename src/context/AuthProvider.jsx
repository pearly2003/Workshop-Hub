import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const reducer = (previousState, updatedState) => ({
    ...previousState,
    ...updatedState,
  });

  const initialState = {
    rights: {
      rights_Insert: false,
      rights_Update: false,
      rights_Export: true,
      rights_View: false,
      rights_Approval: false,
      rights_Delete: false,
    },
  };
  const [MenusList, setMenusList] = useState([]);
  const storedMenusdata = sessionStorage.getItem("MenusList");
  const AdminisAuthenticated = JSON.parse(sessionStorage.getItem("AdminLogin"));
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSectionExpire, setIsSectionExpired] = useState(false);
  const { rights } = state;

  useEffect(() => {
    if (storedMenusdata) {
      const parsedMenusData = JSON.parse(storedMenusdata);
      if (parsedMenusData) {
        // setMenusList(parsedMenusData.MenusList);
        setMenusList(parsedMenusData);
      }
    }
    // else if (!storedMenusdata) {
    //   Adminlogout();
    //   // navigate("/Admin-login");
    // }
  }, [storedMenusdata]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const IsvalidLocation = location.pathname;

  useEffect(() => {
    if (AdminisAuthenticated) {
      if (MenusList.length !== 0) {
        if (IsvalidLocation !== "/Admin-Home") {
          if (IsvalidLocation !== "/SelectClaim") {
            if (IsvalidLocation !== "/*") {
              if (IsvalidLocation !== "/Admin-login") {
                if (
                  IsvalidLocation !== "/Login" &&
                  IsvalidLocation !== "/login" &&
                  IsvalidLocation !== "/"
                ) {
                  if (IsvalidLocation !== "/ClaimTrack-Login") {
                    if (IsvalidLocation !== "/Resubmit-Login") {
                      if (IsvalidLocation !== "/WorkShopLogin") {
                        if (IsvalidLocation !== "/PageNotFound") {
                          if (IsvalidLocation !== "/tickting") {
                            let shouldNavigate = true;
                            for (const menu of MenusList) {
                              if (menu.content && Array.isArray(menu.content)) {
                                for (const item of menu.content) {
                                  if (item.to !== "/FindLRNo")
                                    if (item.to === IsvalidLocation) {
                                      shouldNavigate = false;
                                      break;
                                    }
                                }
                              }
                              if (!shouldNavigate) {
                                break;
                              }
                            }
                            if (shouldNavigate) {
                              navigate("*");
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }, [IsvalidLocation, MenusList, AdminisAuthenticated]);

  useEffect(() => {
    const savedRights = JSON.parse(sessionStorage.getItem("userRights"));
    if (savedRights) {
      dispatch({ rights: savedRights });
    }
  }, []);

  const setRights = (newRights) => {
    sessionStorage.setItem("userRights", JSON.stringify(newRights));
    dispatch({ rights: newRights });
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogout,
        setRights,
        rights,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetCompanyAPI } from "../service/Api";
import enTranslations from "../i18n/locales/en.json";
import arTranslations from "../i18n/locales/ar.json";

const BranchContext = createContext();

const DataProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Initialize from session storage or fallback to "en"
    return sessionStorage.getItem("language") || "en";
  });

  const [translations, setTranslations] = useState(language === "en" ? enTranslations : arTranslations);

  // Sync language changes
  useEffect(() => {
    sessionStorage.setItem("language", language);
    setTranslations(language === "en" ? enTranslations : arTranslations);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = (key) => {
    const keys = key.split(".");
    let value = translations;
    for (let k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    return value || key;
  };

  const [claim, setClaim] = useState(null);
  const [claimType, setClaimType] = useState(null);
  const [loginInfo, setloginInfo] = useState(null);
  const [workshopInfo, setWorkshopInfo] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [commondrp, setCommondrp] = useState([]);
  const [companyAddressData, setCompanyAddressData] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const Claimstored = sessionStorage.getItem("Claim");
    if (Claimstored) {
      setClaim(JSON.parse(Claimstored));
    }

    const ClaimType = sessionStorage.getItem("ClaimType");
    if (ClaimType) {
      setClaimType(JSON.parse(ClaimType));
    }
    const CompanyData = sessionStorage.getItem("CompanyData");
    if (CompanyData) {
      setCompanyData(JSON.parse(CompanyData));
    }

    const CompanyAddressLogin = sessionStorage.getItem("CompanyAddressData");
    if (CompanyAddressLogin) {
      setCompanyAddressData(JSON.parse(CompanyAddressLogin));
    }

    const LoginFormData = sessionStorage.getItem("LoginData");
    if (LoginFormData) {
      setloginInfo(JSON.parse(LoginFormData));
    }

    const WorkShopLoginData = sessionStorage.getItem("WorkshopLogin");
    if (WorkShopLoginData) {
      setWorkshopInfo(JSON.parse(WorkShopLoginData));
    }
  }, [location.pathname]);

  useEffect(() => {
    const AdminLogin = sessionStorage.getItem("AdminLogin");
    if (AdminLogin) {
      setAdminData(JSON.parse(AdminLogin));
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!loginInfo) {
      return;
    }
    FetchCompanyDetails();
  }, [loginInfo]);

  const FetchCompanyDetails = async () => {
    try {
      const response = await GetCompanyAPI();
      if (response.status === 200) {
        sessionStorage.setItem(
          "CompanyData",
          JSON.stringify(response.data.data),
        );
        setCompanyData(response.data.data);
      } else {
        console.error(
          "Failed to fetch company details. Status:",
          response.status,
        );
      }
    } catch (error) {
      showError(
        "Error",
        error.response?.data?.data?.error[0]?.errorMessage ||
        error.response?.data?.message ||
        "Something went wrong.",
      );
    }
  };

  return (
    <BranchContext.Provider
      value={{
        language,
        setLanguage,
        t,
        claim,
        claimType,
        loginInfo,
        companyData,
        adminData,
        companyAddressData,
        workshopInfo,
        isLoading,
        setIsLoading,
        commondrp,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
};

export default DataProvider;

export function useData() {
  return useContext(BranchContext);
}

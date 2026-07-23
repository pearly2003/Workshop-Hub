import React, { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import { InputGroup } from "../../../../utils/inputfields/InputBox";
import {
  showConfirm,
  showSuccess,
  showError,
} from "../../../../utils/SwalUtils";
import { SaveMenuAPI, UpdateMenuAPI } from "../../../service/Api";
import { useData } from "../../../context/DataProvider";
import CommonCheckbox from "../../../../utils/inputfields/CommonCheckbox";
import { SelectGroup } from "../../../../utils/inputfields/SelectBox";
import FormHeader from "../../../../utils/formpageutils/FormHeader";

const MenuCreationForm = ({
  selectedMenu,
  setSelectedMenu,
  setIsFormVisible,
  isUpdateMode,
  setIsUpdateMode,
  fetchData,
  filteredMenus,
  BackClick
}) => {
  const [menuName, setMenuName] = useState("");
  const [menuUrl, setMenuUrl] = useState("");
  const [menuLevel, setMenuLevel] = useState("1"); // '0' is parent, '1' is submenu
  const [parentMenu, setParentMenu] = useState(null);
  const [menuOrder, setMenuOrder] = useState(0);
  const [cssClass, setCssClass] = useState("");
  const [active, setActive] = useState(true);
  const [parentMenus, setParentMenus] = useState(filteredMenus); // List for dropdown
  const { loginInfo } = useData();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMenuUrl("");
    setParentMenu(null);
  }, [menuLevel]);

  useEffect(() => {
    if (selectedMenu) {
      setMenuName(selectedMenu.menuName || "");
      setMenuUrl(selectedMenu.menuURL || "");
      setMenuLevel(selectedMenu.parent_SK === 0 ? "0" : "1");
      setMenuOrder(selectedMenu.menuOrder || 0);
      setCssClass(selectedMenu.iconStyle || "");
      setActive(selectedMenu.active ?? true);
      // const parentMatch = parentMenus.find(
      //   (p) => p.menu_SK === selectedMenu.parent_SK,
      // );
      // setParentMenu(parentMatch?.menu_SK || null);
      setParentMenu(selectedMenu.parent_SK || null);
      setIsUpdateMode(true);
    }
  }, [selectedMenu, parentMenus]);

  const resetForm = () => {
    setMenuName("");
    setMenuUrl("");
    setMenuLevel("1");
    setParentMenu(null);
    setMenuOrder(0);
    setCssClass("");
    setActive(true);
    setIsUpdateMode(false);
    setSelectedMenu(null);
  };

  const handleCancel = () => {
    resetForm();
    setIsFormVisible(true);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!menuName || !menuName.trim()) newErrors.menuName = "Menu Name is required";

    if (menuLevel === "1") {
      if (!menuUrl || !menuUrl.trim()) newErrors.menuUrl = "Menu URL is required";
      if (!parentMenu) newErrors.parentMenu = "Parent Menu is required";
    }

    if (menuOrder === "" || menuOrder === null || menuOrder === undefined) {
      newErrors.menuOrder = "Menu Order is required";
    }

    if (!cssClass || !cssClass.trim()) newErrors.cssClass = "Css Class is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const payload = {
      project_Sk: 1,
      menuName,
      menuUrl,
      menuLevel: Number(menuLevel),
      parent_SK: parentMenu || 0,
      menuOrder,
      cssClass,
      active,
      userBy: loginInfo?.user_Sk || 0,
    };
    const Updatepayload = {
      menu_SK: isUpdateMode ? selectedMenu.menu_SK : 0,
      ...payload,
    };
    const actionText = isUpdateMode ? "update" : "save";
    const confirmed = await showConfirm({
      title: "Confirm Action",
      text: `Do you want to ${actionText} this menu?`,
    });
    try {
      if (confirmed.isConfirmed) {
        const response = isUpdateMode
          ? await UpdateMenuAPI(Updatepayload)
          : await SaveMenuAPI(payload);
        if (response.status === 200) {
          showSuccess("Success", `Menu ${actionText}d successfully.`);
          setIsFormVisible(true);
          if (fetchData) fetchData();
          resetForm();
        }
      }
    } catch (error) {
      showError(
        "Error",
        error.response?.data?.data?.error[0]?.errorMessage ||
        error.response?.data?.message ||
        "Something went wrong",
      );
      console.error(error);
    }
  };

  const parentMenuOptions = (parentMenus || []).map((menu) => ({
    value: menu.menu_SK,
    label: menu.menuName,
  }));


  return (
    <div>
      <div className="overflow-hidden rounded-[24px]">
        <form className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 shadow-sm" onSubmit={handleSubmit}>
          <FormHeader
            onBack={BackClick}
            title={isUpdateMode ? "Edit Menu" : "Add Menu"}
            isUpdateMode={isUpdateMode}
          />
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
              {/* Menu Name */}
              <InputGroup
                label="Menu Name"
                value={menuName}
                setter={setMenuName}
                error={errors.menuName}
                required
                placeholder="Enter Menu Name"
              />
              {/* Menu URL */}

              <InputGroup
                label="Menu URL"
                value={menuUrl}
                setter={setMenuUrl}
                error={errors.menuUrl}
                disabled={menuLevel === "0"}
                required={menuLevel === "1"}
                placeholder="Enter Menu Url"
              />

              {/* Menu Level */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider px-1">
                  Menu Level *
                </label>
                <div className="flex items-center gap-6 h-[42px] px-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="menuLevel"
                      value="0"
                      checked={menuLevel === "0"}
                      onChange={(e) => setMenuLevel(e.target.value)}
                      className="w-4 h-4 text-black focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">
                      Parent Menu
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="menuLevel"
                      value="1"
                      checked={menuLevel === "1"}
                      onChange={(e) => setMenuLevel(e.target.value)}
                      className="w-4 h-4 text-black focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">
                      Sub Menu
                    </span>
                  </label>
                </div>
              </div>

              {/* Parent Menu (Conditional) */}
              <div className={`transition-opacity duration-300 w-full ${menuLevel === "0" ? "opacity-30 pointer-events-none" : "opacity-100"}`}>

                <SelectGroup
                  label="Parent Menu"
                  value={parentMenu}
                  onChange={(val) => setParentMenu(val)}
                  options={parentMenuOptions}
                  error={errors.parentMenu}
                  disabled={menuLevel === "0"}
                  required={menuLevel === "1"}
                  placeholder="Select Parent Menu"
                />
              </div>

              {/* Menu Order */}
              <InputGroup
                label="Menu Order"
                type="number"
                value={menuOrder}
                setter={(val) => setMenuOrder(val ? Number(val) : "")}
                error={errors.menuOrder}
                required
                placeholder="0"
              />

              {/* Css Class */}
              <InputGroup
                label="Css Class"
                value={cssClass}
                setter={setCssClass}
                error={errors.cssClass}
                required
                placeholder="Enter menu Css Class"
              />


              <div className="mt-5">
                {/* Status */}
                <CommonCheckbox
                  checked={active}
                  onChange={() => setActive(!active)}
                  label="Status"
                />
              </div>

            </div>
          </div>

          {/* ACTION FOOTER */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={isUpdateMode ? handleCancel : resetForm}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <X size={16} /> {isUpdateMode ? "Cancel" : "Clear"}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-lg hover:brightness-110 transition-colors shadow-sm"
            >
              <Save size={16} /> {isUpdateMode ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuCreationForm;

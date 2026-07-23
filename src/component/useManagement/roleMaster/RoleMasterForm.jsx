import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import { SelectGroup } from "../../../../utils/inputfields/SelectBox";
import {
  showConfirm,
  showSuccess,
  showError,
} from "../../../../utils/SwalUtils";
import {
  GETUserTypeDrpAPI,
  SaveRoleMasterAPI,
  UpdateRoleMasterAPI,
} from "../../../service/Api";
import { isValidString } from "../../../../utils/Validation";
import CommonCheckbox from "../../../../utils/inputfields/CommonCheckbox";
import { InputGroup } from "../../../../utils/inputfields/InputBox";
import { useData } from "../../../context/DataProvider";
import FormHeader from "../../../../utils/formpageutils/FormHeader";

const RoleMasterForm = ({
  selectedUser,
  setSelectedUser,
  fetchData,
  setIsFormVisible,
  isUpdateMode,
  BackClick
}) => {
  const [userType_SK, setuserType_SK] = useState(null);
  const [userTypeDesc, setuserTypeDesc] = useState("");
  const [roleName, setRoleName] = useState("");
  const [active, setactive] = useState(true);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [UserTypeList, setUserTypeList] = useState([]);

  const { loginInfo } = useData();

  const fetchUserTypes = async () => {
    try {
      const response = await GETUserTypeDrpAPI();
      setUserTypeList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching user types:", error);
    }
  };

  useEffect(() => {
    fetchUserTypes();
  }, []);

  useEffect(() => {

    if (selectedUser) {
      setuserType_SK(selectedUser.userType_SK);
      setuserTypeDesc(selectedUser.userTypeDesc);
      setRoleName(selectedUser.roleName || "");
      setactive(selectedUser.active ?? true);
    }
  }, [selectedUser]);

  const handleCancel = () => {
    resetForm();
    setIsFormVisible(true);
  };

  const resetForm = () => {
    setuserType_SK(null);
    setuserTypeDesc("");
    setRoleName("");
    setactive(true);
    setSubmitClicked(false);
    setSelectedUser(null);
  };

  const validateForm = () => {
    debugger
    const newErrors = {};
    if (!userType_SK) newErrors.userType_SK = "User Type is required";
    if (!roleName.trim()) newErrors.roleName = "Role Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async () => {
    setSubmitClicked(true);
    validateForm()
    const actionText = isUpdateMode ? "update" : "save";

    const payload = {
      userType_SK: Number(userType_SK),
      roleName: roleName.trim(),
      active,
      userBy: loginInfo?.user_Sk || 0,
    };
    const Updatepayload = {
      role_SK: selectedUser?.role_SK || 0,
      ...payload,
    };

    const result = await showConfirm({
      title: "Are you sure?",
      text: `Do you want to ${actionText} this role?`,
      icon: "question",
    });

    if (!result.isConfirmed) return;

    try {
      const apiResponse = isUpdateMode
        ? await UpdateRoleMasterAPI(Updatepayload)
        : await SaveRoleMasterAPI(payload);
      if (apiResponse.status === 200) {
        showSuccess(
          isUpdateMode ? "Updated!" : "Saved!",
          isUpdateMode
            ? "Role updated successfully"
            : "Role saved successfully",
        );
      }

      setIsFormVisible(true);
      fetchData(); // refresh table
      resetForm(); // clear form
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

  return (
    <div>
      <div className="overflow-hidden rounded-[24px]">
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 shadow-sm">
          <FormHeader
            onBack={BackClick}
            title={isUpdateMode ? "Edit Role" : "Add Role"}
            isUpdateMode={isUpdateMode}
          />
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* User Type Select */}
              <SelectGroup
                label="User Type"
                required={true}
                value={userType_SK}
                onChange={(val) => {
                  setuserType_SK(val);
                }}
                options={UserTypeList.map((u) => ({
                  value: u.userType_SK,
                  label: u.userTypeDesc,
                }))}
                placeholder="Select User Type"
                error={
                  submitClicked && !userType_SK ? "User Type is required." : ""
                }
              />
              {/* Role Name Input */}
              <InputGroup
                label="Role Name"
                value={roleName}
                required
                disabled={isUpdateMode}
                setter={(val) => {
                  if (isValidString(val)) setRoleName(val);
                }}
                placeholder="Role Name"
                error={
                  submitClicked && !roleName ? "Role Name is required." : ""
                }
              />
              {/* Status checkbox */}
              <div className="mt-5">
                <CommonCheckbox
                  checked={active}
                  onChange={() => setactive(!active)}
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
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-lg hover:brightness-110 transition-colors shadow-sm"
            >
              <Save size={16} /> {isUpdateMode ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleMasterForm;

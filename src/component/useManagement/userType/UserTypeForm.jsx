import React, { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import {
  showConfirm,
  showSuccess,
  showError,
} from "../../../../utils/SwalUtils";
import {
  GetAllUserTypesAPI,
  SaveUserTypesAPI,
  UpdateUserTypesAPI,
} from "../../../service/Api";
import { isValidString } from "../../../../utils/Validation";
import CommonCheckbox from "../../../../utils/inputfields/CommonCheckbox";
import { InputGroup } from "../../../../utils/inputfields/InputBox";
import { useData } from "../../../context/DataProvider";
import FormHeader from "../../../../utils/formpageutils/FormHeader";

const UserTypeForm = ({
  selectedUser,
  setSelectedUser,
  setIsFormVisible,
  isUpdateMode,
  setIsUpdateMode,
  fetchData,
}) => {
  const [userTypeDesc, setuserTypeDesc] = useState("");
  const [active, setactive] = useState(true);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [existingUserType, setexistingUserType] = useState([]);
  const [errors, setErrors] = useState({});
  const { loginInfo } = useData();

  // Fetch All User Types
  const fetchExistingUsertype = async () => {
    try {
      const response = await GetAllUserTypesAPI();
      setexistingUserType(response.data.data || []);
    } catch (error) {
      console.error("Error fetching existing:", error);
    }
  };

  // Load Data When Page Opens
  useEffect(() => {
    fetchData();
    fetchExistingUsertype();
  }, []);

  // Load Selected User for Update
  useEffect(() => {
    if (selectedUser) {
      setuserTypeDesc(selectedUser.userTypeDesc || "");
      setactive(selectedUser.active ?? true);
      setIsUpdateMode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedUser]);

  // Reset Form
  const resetForm = () => {
    setuserTypeDesc("");
    setactive(true);
    setSubmitClicked(false);
    setIsUpdateMode(false);
    setSelectedUser(null);
  };

  // Cancel Button
  const BackClick = () => {
    resetForm();
    setIsFormVisible(true);
  };

  const validateForm = () => {
    debugger
    const newErrors = {};
    if (!userTypeDesc) newErrors.userTypeDesc = "User Type Name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger
    validateForm()
    setSubmitClicked(true);

    if (!userTypeDesc.trim()) return;
    const isUpdate = isUpdateMode;

    if (isUpdate) {
      const updateData = {
        userType_SK: selectedUser.userType_SK,
        userTypeDesc,
        active,
        userBy: loginInfo?.user_Sk || 0,
      };
      showConfirm({
        title: "Are You Sure?",
        text: "Do you want to update this User Type?",
        icon: "warning",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await UpdateUserTypesAPI(updateData);
            const success =
              response.data.code === 1 &&
              response.data.data?.info?.[0]?.message ===
              "Record Updated Successfully";

            if (success) {
              showSuccess("Updated!", "User Type updated successfully.");
              BackClick()
              fetchData();
              resetForm();
            } else {
              showError(
                "Update Failed",
                response.data.message || "Please try again.",
              );
            }
          } catch (error) {
            showError(
              "Update Failed",
              error.response?.data?.data.error[0]?.errorMessage ||
              error.response?.data?.message ||
              "Something went wrong.",
            );
          }
        }
      });

      return;
    }
    const saveData = {
      userTypeDesc,
      active,
      userBy: loginInfo?.user_Sk || 0,
    };
    showConfirm({
      title: "Are You Sure?",
      text: "Do you want to save this User Type?",
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await SaveUserTypesAPI(saveData);

          if (response.data.code !== 1) {
            showError("Error", response.data.message || "Failed to save.");
          } else {
            showSuccess("Saved!", "User Type saved successfully.");
            BackClick();
            fetchData();
            resetForm();
          }
        } catch (error) {
          showError(
            "Error",
            error.response?.data?.data?.error[0]?.errorMessage ||
            error.response?.data?.message ||
            "Something went wrong.",
          );
        }
      }
    });
  };

  return (
    <div>
      <div className="overflow-hidden rounded-[24px]">
        <form className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 shadow-sm" onSubmit={handleSubmit}>
          <FormHeader
            onBack={BackClick}
            title={isUpdateMode ? "Edit User Type" : "Add New User Type"}
            isUpdateMode={isUpdateMode}
          />
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
            {/* Form Header */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,360px)_auto] lg:items-end">
              <InputGroup
                label="User Type"
                value={userTypeDesc}
                error={errors.userTypeDesc}
                required
                setter={(val) => {
                  if (isValidString(val)) setuserTypeDesc(val);
                }}
                placeholder="User Type"
              />

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
              onClick={isUpdateMode ? BackClick : resetForm}
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

export default UserTypeForm;

import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import {
  showConfirm,
  showSuccess,
  showError,
} from "../../../../utils/SwalUtils";
import { SelectGroup } from "../../../../utils/inputfields/SelectBox";
import {
  GetPendingUserRightsDrpAPI,
  GetUserRightsDrpAPI,
  RoleDrpAPI,
  saveUserRightsAPI,
  updateUserRightsAPI,
} from "../../../service/Api";
import CommonCheckbox from "../../../../utils/inputfields/CommonCheckbox";
import { useAuth } from "../../../context/AuthProvider";
import { useData } from "../../../context/DataProvider";
import FormHeader from "../../../../utils/formpageutils/FormHeader";

const UserRightsForm = ({
  selectedUser,
  setselectedUser,
  setIsFormVisible,
  isUpdateMode,
  setIsUpdateMode,
  fetchData,
  BackClick
}) => {
  const [user_SK, setUser_SK] = useState("");
  const [role_SK, setRole_SK] = useState("");
  const [active, setActive] = useState(true);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [usersDropdown, setUsersDropdown] = useState([]);
  const [rolesDropdown, setRolesDropdown] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const { loginInfo } = useData();

  // Fetch Users Dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = isUpdateMode
          ? await GetUserRightsDrpAPI()
          : await GetPendingUserRightsDrpAPI();
        if (res.data.code === 1)
          isUpdateMode
            ? setUsersDropdown(res.data.data.users)
            : setUsersDropdown(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  // Fetch Roles Dropdown
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await RoleDrpAPI();
        if (res.data.code === 1) setRolesDropdown(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingRoles(false);
      }
    };
    fetchRoles();
  }, []);

  // Update Mode → Fill Form
  useEffect(() => {
    if (selectedUser) {
      setUser_SK(selectedUser.user_SK || "");
      setRole_SK(selectedUser.role_SK || "");
      setActive(selectedUser.active || false);
      setIsUpdateMode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedUser]);

  // Reset Form
  const resetForm = () => {
    setUser_SK("");
    setRole_SK("");
    setActive(true);
    setSubmitClicked(false);
    setIsUpdateMode(false);
    if (typeof setselectedUser === "function") {
      setselectedUser(null);
    }
  };

  const handleCancel = () => {
    setIsFormVisible(true);
    resetForm();
  };

  //  BUILD SAVE PAYLOAD
  const buildSavePayload = () => ({
    user_SK: parseInt(user_SK),
    role_SK: parseInt(role_SK),
    active,
    userBy: loginInfo?.user_Sk,
  });

  //  BUILD UPDATE PAYLOAD
  const buildUpdatePayload = () => ({
    userRights_SK: selectedUser?.userRights_SK || 0,
    user_SK: parseInt(user_SK),
    role_SK: parseInt(role_SK),
    active,
    userBy: loginInfo?.user_Sk,
  });

  // SUBMIT HANDLER (Save + Update separated)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);

    if (!user_SK || !role_SK) return;

    const savePayload = buildSavePayload();
    const updatePayload = buildUpdatePayload();

    // ====================== UPDATE ======================
    if (isUpdateMode) {
      showConfirm({
        title: "Update Confirmation",
        text: "Do you want to update this User Rights?",
        icon: "question",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {

            await updateUserRightsAPI(updatePayload);
            showSuccess("Updated!", "User Rights updated successfully!");
            fetchData();
            resetForm();
            setIsFormVisible(true);
          } catch (err) {
            const backendError =
              err.response?.data?.data?.error?.[0]?.errorMessage ||
              err.response?.data?.message ||
              "Failed to save User Rights";

            showError("Error", backendError);
          }
        }
      });

      return;
    }

    // ====================== SAVE ======================
    showConfirm({
      title: "Save Confirmation",
      text: "Do you want to save this User Rights?",
      icon: "question",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await saveUserRightsAPI(savePayload);
          if (res.data.code === 1) {
            showSuccess("Saved!", "User Rights saved successfully!");
          }
        } catch (err) {
          const backendError =
            err.response?.data?.data?.error?.[0]?.errorMessage ||
            err.response?.data?.message ||
            "Failed to save User Rights";

          showError("Error", backendError);
        } finally {
          fetchData();
          resetForm();
          setIsFormVisible(true);
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-[24px]">
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 shadow-sm">
          <FormHeader
            onBack={BackClick}
            title={isUpdateMode ? "Edit User Rights" : "Add User Rights"}
            isUpdateMode={isUpdateMode}
          />
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 bg-white">

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* User Dropdown */}
              <SelectGroup
                label="User"
                required={true}
                value={user_SK}
                onChange={(val) => {
                  setUser_SK(val);
                }}
                // onChange={(selected) => setUser_SK(selected?.value)}
                options={usersDropdown.map((user) => ({
                  value: user.user_SK,
                  label: user.userName,
                }))}
                placeholder="Select User"
                disabled={isUpdateMode || loadingUsers}
                isLoading={loadingUsers}
                error={submitClicked && !user_SK ? "User is required." : ""}
              />
              {/* Role Dropdown */}
              <SelectGroup
                label="Role"
                required={true}
                value={role_SK}
                placeholder="Select Role"
                // onChange={(selected) => setRole_SK(selected?.value)}
                onChange={(val) => {
                  setRole_SK(val);
                }}
                options={rolesDropdown.map((role) => ({
                  value: role.role_SK,
                  label: role.roleName,
                }))}
                disabled={loadingRoles}
                isLoading={loadingRoles}
                error={submitClicked && !role_SK ? "Role is required." : ""}
              />

              {/* Active */}
              <div className="mt-5">
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
        </div>
      </div>
    </form>
  );
};

export default UserRightsForm;

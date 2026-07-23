import React, { useState, useEffect } from "react";
import {
  showConfirm,
  showSuccess,
  showError,
} from "../../../../utils/SwalUtils";
import { Eye, EyeClosed, Save, X } from "lucide-react";
import CryptoJS from "crypto-js";
import {
  GETUserTypeDrpAPI,
  saveUserCreationAPI,
  updateUserCreationAPI,
} from "../../../service/Api";
import { MdEncryptPassword } from "../../../../utils/EncryptDecrypt";
import { isNumeric } from "../../../../utils/Validation";
import { InputGroup } from "../../../../utils/inputfields/InputBox";
import { SelectGroup } from "../../../../utils/inputfields/SelectBox";
import CommonCheckbox from "../../../../utils/inputfields/CommonCheckbox";
import { useData } from "../../../context/DataProvider";
import FormHeader from "../../../../utils/formpageutils/FormHeader";

const UserCreationForm = ({
  selectedUser,
  setSelectedUser,
  setIsFormVisible,
  isUpdateMode,
  setIsUpdateMode,
  fetchData,
  BackClick
}) => {
  const [userType_SK, setUserType_SK] = useState(null);
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [active, setActive] = useState(true);
  const [submitClicked, setSubmitClicked] = useState(false);
  const { loginInfo } = useData();

  useEffect(() => {
    if (selectedUser) {
      setUserType_SK(selectedUser.userType_SK || null);
      setUserName(selectedUser.userName || "");
      setMobile(selectedUser.mobileno || "");
      setEmail(selectedUser.emailID || "");
      setPassword("");
      setConfirmPassword("");
      setActive(selectedUser.active || false);
      setIsUpdateMode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedUser]);

  const fetchUserTypes = async () => {
    try {
      const response = await GETUserTypeDrpAPI();
      setUserData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching user types:", error);
      setUserData([]);
    }
  };

  useEffect(() => {
    fetchUserTypes();
  }, []);

  const resetForm = () => {
    setUserType_SK(null);
    setUserName("");
    setMobile("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setActive(true);
    setSubmitClicked(false);
    setIsUpdateMode(false);
    setSelectedUser(null);
  };

  const handleCancel = () => {
    resetForm();
    setIsFormVisible(true);
  };

  // const MdEncryptPassword = (password) => {
  //   const key = CryptoJS.MD5("A1login2023passcode");
  //   const encrypted = CryptoJS.TripleDES.encrypt(password, key, {
  //     mode: CryptoJS.mode.ECB,
  //     padding: CryptoJS.pad.Pkcs7,
  //   }).ciphertext;
  //   return encrypted.toString(CryptoJS.enc.Base64).replace(/[^A-Z0-9]/gi, "");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);

    if (
      !userType_SK ||
      !mobile ||
      !email ||
      (!isUpdateMode && (!userName || !password || !confirmPassword))
    ) {
      showError("Validation Error", "Please fill all required fields.");
      return;
    }

    if (!isUpdateMode && password !== confirmPassword) {
      showError("Validation Error", "Passwords do not match.");
      return;
    }

    let payload, url;
    const actionText = isUpdateMode ? "update" : "save";

    if (isUpdateMode) {
      payload = {
        user_SK: selectedUser?.user_SK || 0,
        userType_SK: String(userType_SK),
        mobileNo: mobile,
        emailID: email,
        active,
        userBy: String(loginInfo?.user_Sk),
        parentUserSk: 0,
      };

      try {
        const result = await showConfirm({
          title: `Are you sure?`,
          text: `Do you want to ${actionText} this user?`,
          icon: "question",
        });

        if (result.isConfirmed) {
          await updateUserCreationAPI(payload);
          showSuccess("Updated!", "User updated successfully");
          setIsFormVisible(true);
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
    } else {
      const encryptedPassword = MdEncryptPassword(password);
      const encryptedOldPassword = MdEncryptPassword("");

      payload = {
        userType_SK: String(userType_SK),
        userName: userName.trim(),
        mobileNo: mobile,
        emailID: email.trim(),
        password: encryptedPassword,
        oldPassword: encryptedOldPassword,
        active,
        userBy: String(loginInfo?.user_Sk),
        isAppAccess: true,
      };
      try {
        const result = await showConfirm({
          title: `Are you sure?`,
          text: `Do you want to ${actionText} this user?`,
          icon: "question",
        });

        if (result.isConfirmed) {
          const res = await saveUserCreationAPI(payload);
          if (res.data.code === 1) {
            showSuccess("Saved!", "User saved successfully");
          }
        }
      } catch (error) {
        showError(
          "Error",
          error.response?.data?.data?.error[0]?.errorMessage ||
          error.response?.data?.message ||
          "Something went wrong.",
        );
      } finally {
        setIsFormVisible(true);
        fetchData();
        resetForm();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-[24px] ">
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 shadow-sm">
          <FormHeader
            onBack={BackClick}
            title={isUpdateMode ? "Edit User" : "Add User"}
            isUpdateMode={isUpdateMode}
          />
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 bg-white">
            {/* Form Header */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
              <SelectGroup
                value={userType_SK}
                onChange={setUserType_SK}
                options={userData.map((ut) => ({
                  value: ut.userType_SK,
                  label: ut.userTypeDesc,
                }))}
                label="User Type *"
                required
                placeholder="Select..."
                error={
                  submitClicked && !userType_SK ? "User Type is required" : ""
                }
              />

              <InputGroup
                label={isUpdateMode ? "Username" : "Username *"}
                value={userName}
                setter={setUserName}
                disabled={isUpdateMode}
                autoComplete="off"
                error={
                  submitClicked && !isUpdateMode && !userName
                    ? "Username is required"
                    : ""
                }
              />
              <InputGroup
                label="Mobile No *"
                type="tel"
                maxLength={10}
                value={mobile}
                autoComplete="off"
                setter={(val) => {
                  if (isNumeric(val)) {
                    setMobile(val);
                  }
                }}
                error={
                  submitClicked && !mobile
                    ? "Mobile No is required"
                    : submitClicked && mobile.length !== 10
                      ? "Mobile No must be 10 digits"
                      : ""
                }
              />
              <InputGroup
                label="Email ID *"
                type="email"
                value={email}
                setter={setEmail}
                error={submitClicked && !email ? "Email ID is required" : ""}
              />
              {!isUpdateMode && (
                <>
                  <div className="relative flex flex-col group">
                    <InputGroup
                      label="Password *"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      setter={setPassword}
                      error={
                        submitClicked && !password ? "Password is required" : ""
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-[28px]"
                    >
                      {showPassword ? (
                        <EyeClosed size="18" color="#3c682b" />
                      ) : (
                        <Eye size="18" color="#3c682b" />
                      )}
                    </button>
                  </div>

                  <div className="relative flex flex-col group">
                    <InputGroup
                      label="Confirm Password *"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      setter={setConfirmPassword}
                      error={
                        submitClicked && !confirmPassword
                          ? "Confirm Password is required"
                          : submitClicked && password !== confirmPassword
                            ? "Passwords do not match"
                            : ""
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-[28px]"
                    >
                      {showConfirmPassword ? (
                        <EyeClosed size="18" color="#3c682b" />
                      ) : (
                        <Eye size="18" color="#3c682b" />
                      )}
                    </button>
                  </div>
                </>
              )}
              <div className="mt-5">
                <CommonCheckbox
                  id="active"
                  checked={active}
                  onChange={setActive}
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

export default UserCreationForm;

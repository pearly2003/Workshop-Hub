import React, { useState, useEffect } from "react";
import {
  Edit2,
  Eye,
  EyeClosed,
  Lock,
  X,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Trash2,
  SquarePen,
} from "lucide-react";
import { CustomPagination, getData } from "../../../../utils/PaginationUtils";
import {
  MdEncryptPassword,
  decryptPassword,
} from "../../../../utils/EncryptDecrypt";
import { updatePSWAPI, updateUserCreationAPI, DeleteUserAPI } from "../../../service/Api";
import {
  showConfirm,
  showSuccess,
  showError,
} from "../../../../utils/SwalUtils";
import ViewDetailsModal from "../../../common/ViewDetailsModal";

const UserCreationTable = ({
  setIsFormVisible,
  setIsUpdateMode,
  current,
  setCurrent,
  perPage,
  selectedUser,
  setSelectedUser,
  searchTerm,
  user, // actual user data array
  rights,
  fetchData,
}) => {
  const [filteredBus, setFilteredBus] = useState([]);
  const [viewRow, setViewRow] = useState(null);
  const [showPasswordRow, setShowPasswordRow] = useState(null);
  // NEW PASSWORD POPUP STATE
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [passwordUser, setPasswordUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleDelete = (row) => {
    showConfirm({
      title: "Delete User",
      text: `Are you sure you want to delete user "${row.userName}"?`,
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await DeleteUserAPI(row.user_SK);
          if (response.status === 200) {
            showSuccess("Deleted!", "User has been deleted successfully.");
            if (fetchData) fetchData();
          }
        } catch (error) {
          showError(
            "Error",
            error.response?.data?.data?.error[0]?.errorMessage ||
            error.response?.data?.message ||
            "Failed to delete User.",
          );
        }
      }
    });
  };

  // Toast notification state
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message: string }
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };
  // ⭐ Password mask function
  const maskPassword = (password) => {
    if (!password || typeof password !== "string") return "";
    return "••••••••"; // Full mask
  };

  // 🔍 Search and Sort filter
  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();

    let filtered = Array.isArray(user)
      ? user.filter(
        (item) =>
          item.userName?.toLowerCase().includes(lowerTerm) ||
          item.userTypeDesc?.toLowerCase().includes(lowerTerm) ||
          item.emailID?.toLowerCase().includes(lowerTerm),
      )
      : [];

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        // Handle nulls, undefined, boolean
        valA =
          valA !== null && valA !== undefined
            ? valA.toString().toLowerCase()
            : "";
        valB =
          valB !== null && valB !== undefined
            ? valB.toString().toLowerCase()
            : "";

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredBus(filtered);
  }, [user, searchTerm, sortConfig]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey)
      return <ArrowUpDown size={12} className="text-gray-300" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={12} className="text-[#3c682b]" />
    ) : (
      <ArrowDown size={12} className="text-[#3c682b]" />
    );
  };

  const dataToRender = getData(current, perPage, filteredBus);

  // ✏️ Edit User
  const handleEdit = (row) => {
    setSelectedUser(row);
    setIsFormVisible(false);
    setIsUpdateMode(true);
  };

  const viewRowSections = viewRow
    ? [
      {
        title: "User Details",
        data: [
          { label: "User Name", value: viewRow.userName || "—" },
          { label: "User Type", value: viewRow.userTypeDesc || "—" },
          { label: "Email ID", value: viewRow.emailID || "—" },
          { label: "Mobile No", value: viewRow.mobileno || "—" },
          {
            label: "Status",
            value: viewRow.active ? "Active" : "Inactive",
            className: viewRow.active ? "text-green-600 font-medium" : "text-red-600 font-medium"
          },
          { label: "App Access", value: viewRow.isAppAccess ? "Yes" : "No" },
        ]
      },
      {
        title: "Audit Logs",
        data: [
          { label: "Created By", value: viewRow.createdBy || "—" },
          { label: "Created On", value: viewRow.createdOn || "—" },
          { label: "Modified By", value: viewRow.modifiedBy || "—" },
          { label: "Modified On", value: viewRow.modifiedOn || "—" },
        ]
      }
    ]
    : [];

  // 🔐 Password Change Handlers
  const handlePasswordEditClick = (userRow) => {
    setPasswordUser(userRow);
    setNewPassword(decryptPassword(userRow.password));
    setConfirmPassword(decryptPassword(userRow.password));
    setShowPasswordPopup(true);
  };

  const handlePasswordUpdate = async () => {
    if (!newPassword.trim()) {
      showError("Error", "Password cannot be empty.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showError("Error", "Passwords do not match.");
      return;
    }

    const confirm = await showConfirm({
      title: "Update Password?",
      text: "Do you want to change the password for this user?",
      icon: "question",
    });

    if (confirm.isConfirmed) {
      setIsSaving(true);
      try {
        const encryptedNewPassword = MdEncryptPassword(newPassword);

        const payload = {
          user_SK: passwordUser.user_SK,
          password: encryptedNewPassword,
          oldPassword: passwordUser?.password,
        };

        const res = await updatePSWAPI(payload);
        if (res.data.code === 1) {
          showToast("success", "Password updated successfully.");
          setShowPasswordPopup(false);
          const updatedUser = {
            ...passwordUser,
            password: MdEncryptPassword(newPassword),
          };
          setFilteredBus((prev) =>
            prev.map((u) =>
              u.user_SK === passwordUser.user_SK ? updatedUser : u,
            ),
          );
        } else {
          showError("Error", res.data.message || "Failed to update password.");
        }
      } catch (error) {
        showError(
          "Error",
          error.response?.data?.data?.error[0]?.errorMessage ||
          error.response?.data?.message ||
          "Something went wrong.",
        );
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <>
      {/* ── Toast Notification ── */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "1.25rem",
            right: "1.25rem",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 18px",
            borderRadius: "14px",
            background:
              toast.type === "success" ? "var(--color-primary)" : "#dc2626",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            animation: "toastSlideIn 0.25s ease",
            minWidth: "220px",
          }}
        >
          <span style={{ fontSize: "16px" }}>
            {toast.type === "success" ? "✓" : "✕"}
          </span>
          {toast.message}
        </div>
      )}
      <style>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Password Popup */}
      {showPasswordPopup && (
        <PasswordModal
          user={passwordUser}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          showNewPass={showNewPass}
          setShowNewPass={setShowNewPass}
          showConfirmPass={showConfirmPass}
          setShowConfirmPass={setShowConfirmPass}
          onClose={() => setShowPasswordPopup(false)}
          onSave={handlePasswordUpdate}
          isSaving={isSaving}
        />
      )}

      <div className="p-1 w-full flex flex-col gap-4">
        <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden ">
          <div className="overflow-x-auto ">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F8FAFC] text-gray-500 uppercase font-black tracking-widest text-[10px]">
                <tr>
                  <th className="px-6 py-3 w-12 text-center">#</th>
                  <th
                    className="px-6 py-3 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort("userName")}
                  >
                    <div className="flex items-center gap-1">
                      User Name <SortIcon columnKey="userName" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort("emailID")}
                  >
                    <div className="flex items-center gap-1">
                      Contact Detail <SortIcon columnKey="emailID" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort("userTypeDesc")}
                  >
                    <div className="flex items-center gap-1">
                      User Type <SortIcon columnKey="userTypeDesc" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-center cursor-pointer select-none hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort("active")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Status <SortIcon columnKey="active" />
                    </div>
                  </th>
                  <th className="px-6 py-3">Security</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {dataToRender.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-10 text-gray-400 font-medium"
                    >
                      No users found matching your search.
                    </td>
                  </tr>
                ) : (
                  dataToRender.map((rows, index) => (
                    <tr
                      key={rows.user_SK || index}
                      className="hover:bg-[#F8FAFC]/50 transition-colors"
                    >
                      <td className="px-6 py-3 text-center text-gray-400 font-medium">
                        {index + 1 + (current - 1) * perPage}
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-medium text-gray-900">
                          {rows.userName}
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-gray-900 font-medium">
                            {rows.emailID}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            {rows.mobileno}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-medium text-[10px]">
                          {rows.userTypeDesc}
                        </span>
                      </td>

                      <td className="px-6 py-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium
                          ${rows.active
                              ? "bg-green-50 text-green-600"
                              : "bg-red-50 text-red-600"
                            }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${rows.active ? "bg-green-500" : "bg-red-500"}`}
                          />
                          {rows.active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 font-mono tracking-widest text-[10px] bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                            {showPasswordRow === rows.user_SK
                              ? decryptPassword(rows.password)
                              : maskPassword(decryptPassword(rows.password))}
                          </span>

                          <button
                            onClick={() =>
                              setShowPasswordRow(
                                showPasswordRow === rows.user_SK
                                  ? null
                                  : rows.user_SK,
                              )
                            }
                            className="p-1.5 text-gray-400 hover:text-black hover:bg-blue-50 rounded-lg transition-colors"
                            title="Toggle Password"
                          >
                            {showPasswordRow === rows.user_SK ? (
                              <EyeClosed size={14} />
                            ) : (
                              <Eye size={14} />
                            )}
                          </button>

                          <button
                            onClick={() => handlePasswordEditClick(rows)}
                            className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title="Change Password"
                          >
                            <Lock size={14} />
                          </button>
                        </div>
                      </td>

                      <td className="px-6 py-3">
                        <div className="flex items-center justify-center gap-2">
                          {(!rights || rights?.rights_View) && (
                            <button
                              onClick={() => setViewRow(rows)}
                              className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 rounded-xl transition-all"
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>
                          )}
                          {rights?.rights_Update && (
                            <button
                              onClick={() => handleEdit(rows)}
                              className="p-1.5  flex gap-2 items-center text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                              title="Edit User"
                            >
                              <SquarePen size={14} />
                              <span>Edit</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Section */}
        <div className="flex items-center justify-between px-2">
          <div className="text-[11px] text-gray-400 font-medium">
            Showing {dataToRender.length} of {filteredBus.length} entries
          </div>
          <CustomPagination
            total={filteredBus.length}
            current={current}
            pageSize={perPage}
            onChange={(page) => setCurrent(page)}
          />
        </div>
      </div>

      <ViewDetailsModal
        isOpen={!!viewRow}
        onClose={() => setViewRow(null)}
        title="User Creation Details"
        subtitle={viewRow?.userName}
        sections={viewRowSections}
      />
    </>
  );
};

// 🔐 Password Popup Component (Local)
const PasswordModal = ({
  user,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showNewPass,
  setShowNewPass,
  showConfirmPass,
  setShowConfirmPass,
  onClose,
  onSave,
  isSaving,
}) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-[var(--color-primary)] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Lock size={20} />
            </div>
            <div>
              <h3 className="font-medium text-sm leading-tight">
                Change Password
              </h3>
              <p className="text-[11px] text-white/70 italic">
                {user.userName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* New Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider px-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPass ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3c682b] transition-all pr-10"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3c682b]"
              >
                {showNewPass ? <EyeClosed size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider px-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3c682b] transition-all pr-10"
                placeholder="Repeat new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3c682b]"
              >
                {showConfirmPass ? <EyeClosed size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>


        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[var(--color-primary)] rounded-xl hover:opacity-90 shadow-lg transition-all disabled:opacity-70"
          >
            {isSaving ? "Saving..." : "Update"}
          </button>
        </div>
      </div>

    </div>
  );
};

export default UserCreationTable;

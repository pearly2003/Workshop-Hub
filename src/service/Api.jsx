import axiosInstance from "./axiosInstance";
import AuthorizationUtils from "../../utils/AuthorizationUtils";

const API_BASE_URL = window.APP_CONFIG?.VITE_API_PORT;

export const GetCompanyAPI = async () => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.get(
      // `${API_BASE_URL}/CompanyDetails/GetCompany`,
      `${API_BASE_URL}/Master/GetCompanyDetails`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to GetCompanyAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error GetCompany in:", error);

    throw error;
  }
};
export const LoginAPI = async (SaveData) => {
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/Login/Auth/GetAuthentication`,
      SaveData,
    );
    if (response.status !== 200) {
      throw new Error("Failed to LoginAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error logging in:", error);

    throw error;
  }
};

export const GetMenuByRoleSKAPI = async (Role_SK) => {
  const axiosConfig = AuthorizationUtils();

  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/Menu/GetMenuByRoleSK?Role_SK=${Role_SK}`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to GetMenuByRoleSKAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error getting menu by role SK:", error);

    throw error;
  }
};
export const getUserTypeDrpAPI = async () => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/UserManagement/User/UserTypeDrp`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to GetMenuByRoleSKAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error getting menu by role SK:", error);

    throw error;
  }
};

export const getUserTypeAPI = async () => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/UserManagement/User/GetAllUserTypes`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to getUserTypeAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error getting user type:", error);

    throw error;
  }
};
export const MenuGetByRoleSKAPI = async (role_SK) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/Menu/GetMenuByRoleSK?Role_SK=${role_SK}`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch MenuGetByRoleSKAPI data");
    }

    return response;
  } catch (error) {
    console.error("Error fetching MenuGetByRoleSKAPIs data:", error);
    throw error;
  }
};
export const SaveMenuAPI = async (payload) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/Menu/SaveMenu`,
      payload,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch SaveMenuAPI data");
    }

    return response;
  } catch (error) {
    console.error("Error fetching SaveMenuAPI data:", error);
    throw error;
  }
};

export const UpdateMenuAPI = async (payload) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.put(
      `${API_BASE_URL}/Menu/UpdateMenu`,
      payload,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch UpdateMenuAPI data");
    }

    return response;
  } catch (error) {
    console.error("Error fetching UpdateMenuAPI data:", error);
    throw error;
  }
};
export const GETMenuAPI = async () => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/Menu/GetallMenuDetails`,
      // `${API_BASE_URL}/UserManagement/GetallMenuDetails`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch SaveMenuAPI data");
    }

    return response;
  } catch (error) {
    console.error("Error fetching SaveMenuAPI data:", error);
    throw error;
  }
};
export const saveRoleRightsAPI = async (payload) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/UserManagement/RoleRights/SaveRoleRights`,
      payload,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch saveRoleRightsAPI data");
    }

    return response;
  } catch (error) {
    console.error("Error fetching saveRoleRightsAPI data:", error);
    throw error;
  }
};
export const DeleteRoleRightsAPI = async (id) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.delete(
      `${API_BASE_URL}/UserManagement/RoleRights/DeleteRoleRights/${id}`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to DeleteRoleRightsAPI request");
    }
    return response;
  } catch (error) {
    console.error("Error deleting Role Rights:", error);
    throw error;
  }
};
export const saveUserCreationAPI = async (payload) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/UserManagement/User/SaveUser`,
      payload,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch saveUserCreationAPI data");
    }

    return response;
  } catch (error) {
    console.error("Error fetching saveUserCreationAPI data:", error);
    throw error;
  }
};
export const updateUserCreationAPI = async (payload) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.put(
      `${API_BASE_URL}/UserManagement/User/UpdateUser`,
      payload,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch updateUserCreationAPI data");
    }

    return response;
  } catch (error) {
    console.error("Error fetching updateUserCreationAPI data:", error);
    throw error;
  }
};
export const updatePSWAPI = async (payload) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.put(
      `${API_BASE_URL}/UserManagement/User/ChangePassword`,
      payload,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch updatePSWAPI data");
    }

    return response;
  } catch (error) {
    console.error("Error fetching updatePSWAPI data:", error);
    throw error;
  }
};
export const DeleteUserAPI = async (id) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.delete(
      `${API_BASE_URL}/UserManagement/User/DeleteUser/${id}`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to DeleteUserAPI request");
    }
    return response;
  } catch (error) {
    console.error("Error deleting User:", error);
    throw error;
  }
};
export const updateUserRightsAPI = async (payload) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.put(
      `${API_BASE_URL}/UserManagement/UserRights/UpdateUserRights`,
      payload,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch updateUserRightsAPI data");
    }

    return response;
  } catch (error) {
    console.error("Error fetching updateUserRightsAPI data:", error);
    throw error;
  }
};
export const DeleteUserRightsAPI = async (id) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.delete(
      `${API_BASE_URL}/UserManagement/UserRights/DeleteUserRights/${id}`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to DeleteUserRightsAPI request");
    }
    return response;
  } catch (error) {
    console.error("Error deleting User Rights:", error);
    throw error;
  }
};
export const saveUserRightsAPI = async (payload) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/UserManagement/UserRights/SaveUserRights`,
      payload,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch saveUserRightsAPI data");
    }

    return response;
  } catch (error) {
    console.error("Error fetching saveUserRightsAPI data:", error);
    throw error;
  }
};
export const GetAllUserTypesAPI = async () => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/UserManagement/User/GetAllUserTypes`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to getUserTypeAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error getting user type:", error);

    throw error;
  }
};
export const GetUsersAPI = async () => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/UserManagement/User/GetUsers`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to GetUsersAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error getting GetUsersAPI:", error);

    throw error;
  }
};
export const GETUserTypeDrpAPI = async () => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/UserManagement/User/UserTypeDrp`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to GETUserTypeDrpAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error getting GETUserTypeDrpAPI:", error);

    throw error;
  }
};
export const GetAllRolesAPI = async () => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/UserManagement/RoleMaster/GetAllRoles`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to GetAllRolesAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error getting GetAllRolesAPI:", error);

    throw error;
  }
};
export const SaveRoleMasterAPI = async (SaveData) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/UserManagement/RoleMaster/SaveRoleMaster`,
      SaveData,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to SaveRoleMasterAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error saving role master:", error);

    throw error;
  }
};
export const UpdateRoleMasterAPI = async (SaveData) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.put(
      `${API_BASE_URL}/UserManagement/RoleMaster/UpdateRoleMaster`,
      SaveData,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to UpdateRoleMasterAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error updating role master:", error);

    throw error;
  }
};
export const DeleteRoleMasterAPI = async (id) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.delete(
      `${API_BASE_URL}/UserManagement/RoleMaster/DeleteRoleMaster/${id}`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to DeleteRoleMasterAPI request");
    }
    return response;
  } catch (error) {
    console.error("Error deleting role master:", error);
    throw error;
  }
};
export const GetAllMenuRightsAPI = async () => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/UserManagement/RoleRights/GetAllMenuRights`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to GetAllMenuRightsAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error getting GetAllMenuRightsAPI:", error);

    throw error;
  }
};
export const getPendingRoleRightsAPI = async () => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/UserManagement/RoleRights/PendingRights`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to getPendingRoleRightsAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error getting getPendingRoleRightsAPI:", error);

    throw error;
  }
};

export const getMenuRightsAPI = async (roleSK) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/UserManagement/RoleRights/GetMenuRightsByRoleSK/${roleSK}`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to getMenuRightsAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error getting getMenuRightsAPI:", error);

    throw error;
  }
};

export const RoleDrpAPI = async () => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/UserManagement/RoleMaster/GetRolesDropdown`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to RolesNameDrpAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error getting RolesNameDrpAPI:", error);

    throw error;
  }
};
export const GetAllUserRightsAPI = async () => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/UserManagement/UserRights/GetAllUserRights`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to GetAllUserRightsAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error getting GetAllUserRightsAPI:", error);

    throw error;
  }
};
export const GetUserRightsDrpAPI = async () => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/UserManagement/UserRights/GetUserRightsDrpDwn`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to GetUserRightsDrpAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error getting GetUserRightsDrpAPI:", error);

    throw error;
  }
};

export const GetPendingUserRightsDrpAPI = async () => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/UserManagement/UserRights/GetUserPendingRights`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to GetPendingUserRightsDrpAPI request");
    }

    return response;
  } catch (error) {
    console.error("Error getting GetPendingUserRightsDrpAPI:", error);

    throw error;
  }
};

export const SaveUserTypesAPI = async (GetData) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/UserManagement/User/SaveUserTypes`,
      GetData,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to SaveUserTypesAPI request");
    }
    return response;
  } catch (error) {
    console.error("Error getting SaveUserTypesAPI:", error);
    throw error;
  }
};
export const UpdateUserTypesAPI = async (UpdateData) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.put(
      `${API_BASE_URL}/UserManagement/User/UpdateUserTypes`,
      UpdateData,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to SaveUserTypesAPI request");
    }
    return response;
  } catch (error) {
    console.error("Error getting SaveUserTypesAPI:", error);
    throw error;
  }
};
export const DeleteUserTypesAPI = async (id) => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.delete(
      `${API_BASE_URL}/UserManagement/User/DeleteUserTypes/${id}`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to DeleteUserTypesAPI request");
    }
    return response;
  } catch (error) {
    console.error("Error deleting User Type:", error);
    throw error;
  }
};
export const BusinessProcessDRPAPI = async () => {
  const axiosConfig = AuthorizationUtils();
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/BusinessProcess/GetByAllBusinessProcess`,
      axiosConfig,
    );
    if (response.status !== 200) {
      throw new Error("Failed to BusinessProcessDRPAPI request");
    }
    return response;
  } catch (error) {
    console.error("Error getting BusinessProcessDRPAPI:", error);
    throw error;
  }
};

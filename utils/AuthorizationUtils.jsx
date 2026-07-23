import { useLocation } from "react-router-dom";

const AuthorizationUtils = () => {
  const userDetails = sessionStorage.getItem("LoginData");
  const parsedDetails = userDetails ? JSON.parse(userDetails) : null;
  // Check if token exists
  const token = parsedDetails ? `Bearer ${parsedDetails.token}` : ""; // No btoa
  return {
    headers: {
      Authorization: token,
    },
  };
};

export default AuthorizationUtils;

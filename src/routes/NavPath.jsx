import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const PrivateRoute = lazy(() => import("./PrivateRoute"));
const HomeLayout = lazy(() => import("../layout/HomeLayout"));
const ComMenu = lazy(() => import("../pages/userManagement/ComMenu"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const UserType = lazy(() => import("../pages/userManagement/UserType"));
const UserCreation = lazy(() => import("../pages/userManagement/UserCreation"));
const RoleMaster = lazy(() => import("../pages/userManagement/RoleMaster"));
const RoleRights = lazy(() => import("../pages/userManagement/RoleRights"));
const UserRights = lazy(() => import("../pages/userManagement/UserRights"));
const Loader = lazy(() => import("../common/Loader"));
const Login = lazy(() => import("../pages/Login"));
const PageNotFound = lazy(() => import("../common/PageNotFound"));
const JobRequests = lazy(() => import("../pages/JobRequests"));

const NavPath = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/Home" element={<AdminLayout />} /> */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomeLayout />
              </PrivateRoute>
            }
          >
            <Route path="/DashBoard" element={<Dashboard />} />
            <Route path="/JobRequests" element={<JobRequests />} />
            {/* User Management */}
            <Route path="/UserManagement/UserType" element={<UserType />} />
            <Route
              path="/UserManagement/UserCreation"
              element={<UserCreation />}
            />
            <Route path="/UserManagement/RoleMaster" element={<RoleMaster />} />
            <Route path="/UserManagement/RoleRights" element={<RoleRights />} />
            <Route path="/UserManagement/UserRights" element={<UserRights />} />
            <Route path="/UserManagement/Menu" element={<ComMenu />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default NavPath;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rights: JSON.parse(sessionStorage.getItem('userRights')) || {
    rights_Insert: false,
    rights_Update: false,
    rights_View: false,
    rights_Approval: false,
    rights_Delete: false,
  },
  menusList: JSON.parse(sessionStorage.getItem('MenusList')) || [],
  adminIsAuthenticated: JSON.parse(sessionStorage.getItem('LoginData')) || null,
  isSectionExpire: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRights: (state, action) => {
      state.rights = action.payload;
      sessionStorage.setItem('userRights', JSON.stringify(action.payload));
    },
    setMenusList: (state, action) => {
      state.menusList = action.payload;
      sessionStorage.setItem('MenusList', JSON.stringify(action.payload));
    },
    setAdminIsAuthenticated: (state, action) => {
      state.adminIsAuthenticated = action.payload;
      sessionStorage.setItem('LoginData', JSON.stringify(action.payload));
    },
    setIsSectionExpire: (state, action) => {
      state.isSectionExpire = action.payload;
    },
    logout: (state) => {
      state.rights = initialState.rights;
      state.menusList = [];
      state.adminIsAuthenticated = false;
      state.isSectionExpire = false;
      sessionStorage.clear();
    },
  },
});

export const { setRights, setMenusList, setAdminIsAuthenticated, setIsSectionExpire, logout } = authSlice.actions;
export default authSlice.reducer;

import { IMechanicProfile } from "@/types/mechanics.types";
import { IUserProfile } from "@/types/user.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthState {
  isAuthenticated: boolean;
  user: IUserProfile | null;
  mechanic: IMechanicProfile | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  mechanic: null,
};

export const counterSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<IUserProfile>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    mechanicLogin: (state, action: PayloadAction<IMechanicProfile>) => {
      state.isAuthenticated = true;
      state.mechanic = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.mechanic = null;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { mechanicLogin, userLogin, logout, setIsAuthenticated } =
  counterSlice.actions;
export default counterSlice.reducer;

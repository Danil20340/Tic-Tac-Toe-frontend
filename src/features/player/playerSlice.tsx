import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../app/types";
import { playerApi } from "../../app/services/playerApi";
import { RootState } from "../../app/store";
import { disconnectSocket } from "../../utils/socketSingleton";

type InitialState = {
  current: Player | null;
  isAuthenticated: boolean;
  token?: string;
};

const getInitialState = (): InitialState => ({
  current: null,
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || undefined,
});

const initialState = getInitialState();

const slice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("token");
      disconnectSocket();
      const newState = getInitialState();
      return newState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(playerApi.endpoints.login.matchFulfilled, (state, action) => {
        const token = action.payload.token;
        state.token = token;
        state.isAuthenticated = true;
      })
      .addMatcher(playerApi.endpoints.getCurrentPlayer.matchFulfilled, (state, action) => {
        state.current = action.payload;
      });
  }
});

export default slice.reducer;
export const { logout } = slice.actions;


// Селекторы
export const selectIsAuthenticated = (state: RootState) => state.player.isAuthenticated;
export const selectCurrent = (state: RootState) => state.player.current;

// Комбинированный селектор для оптимизации
export const selectPlayerSocketState = createSelector(
  [selectIsAuthenticated, selectCurrent],
  (isAuthenticated, currentPlayer) => ({
    isAuthenticated,
    currentPlayer
  })
);
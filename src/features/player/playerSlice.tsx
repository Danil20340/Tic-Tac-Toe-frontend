import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../app/types";
import { playerApi } from "../../app/services/playerApi";
import { RootState } from "../../app/store";

type InitialState = {
  player: Player | null;
  current: Player | null;
  isAuthenticated: boolean;
  token?: string;
  socketConnected: boolean;
};

const initialState: InitialState = {
  player: null,
  current: null,
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || undefined,
  socketConnected: false
};

const slice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("token");
      return { ...initialState };
    },
    setSocketConnected: (state, action: PayloadAction<boolean>) => {
      state.socketConnected = action.payload;
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
      })
  }
})

export default slice.reducer

export const { logout, setSocketConnected } = slice.actions;

// Селекторы
export const selectIsAuthenticated = (state: RootState) => state.player.isAuthenticated;
export const selectCurrent = (state: RootState) => state.player.current;
export const selectPlayer = (state: RootState) => state.player.player;
export const selectSocket = (state: RootState) => state.player.socketConnected;

// Комбинированный селектор для оптимизации
export const selectPlayerSocketState = createSelector(
  [selectIsAuthenticated, selectCurrent, selectSocket],
  (isAuthenticated, currentPlayer, socketConnected) => ({
    isAuthenticated,
    currentPlayer,
    socketConnected,
  })
);
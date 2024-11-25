import { createSlice } from "@reduxjs/toolkit";
import { Player } from "../../app/types";
import { playerApi } from "../../app/services/playerApi";
import { RootState } from "../../app/store";

type InitialState = {
  player: Player | null;
  isAuthenticated: boolean;
  players: Player[] | null;
  current: Player | null;
  token?: string
}

const initialState: InitialState = {
  player: null,
  isAuthenticated: false,
  players: null,
  current: null
}

const slice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    logout: () => initialState,
    resetplayer: (state) => {
      state.player = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(playerApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token
        state.isAuthenticated = true;
      })
      // .addMatcher(playerApi.endpoints.current.matchFulfilled, (state, action) => {
      //   state.isAuthenticated = true;
      //   state.current = action.payload
      // })
      // .addMatcher(playerApi.endpoints.getplayerById.matchFulfilled, (state, action) => {
      //   state.player = action.payload;
      // })
  }
})

export const { logout, resetplayer } = slice.actions;
export default slice.reducer

export const selectIsAuthenticated = (state: RootState) =>
  state.player.isAuthenticated

export const selectCurent = (state: RootState) => state.player.current

export const selectplayer = (state: RootState) => state.player.player
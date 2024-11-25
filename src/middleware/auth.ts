import { createListenerMiddleware } from "@reduxjs/toolkit";
import { playerApi } from "../app/services/playerApi";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: playerApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if(action.payload.token) {
      localStorage.setItem('token', action.payload.token)
    }
  }
})
import { api } from "./api";
import { Player } from "../types";

export const playerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { login: string; password: string }>({
      query: (playerData) => ({
        url: "/login",
        method: "POST",
        body: playerData,
      }),
    }),
    register: builder.mutation<
      { fullName: string; age: number; gender: string },
      { login: string; password: string; fullName: string; age: number; gender: string }
    >({
      query: (playerData) => ({
        url: "/register",
        method: "POST",
        body: playerData,
      }),
    }),
    getAllPlayers: builder.query<Player[], void>({
      query: () => ({
        url: "/players",
        method: "GET",
      }),
    }),
    updatePlayer: builder.mutation<
      Player,
      { playerData: FormData; id: string }
    >({
      query: ({ playerData, id }) => ({
        url: `/player/${id}`,
        method: "PATCH",
        body: playerData,
      }),
    }),
    changePlayerStatus: builder.mutation<
      Player,
      { id: string; }
    >({
      query: ({ id }) => ({
        url: `/player/${id}`,
        method: "PATCH"
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAllPlayersQuery,
  useLazyGetAllPlayersQuery,
  useUpdatePlayerMutation,
  useChangePlayerStatusMutation,
} = playerApi;

export const {
  endpoints: { login, register, getAllPlayers, updatePlayer, changePlayerStatus },
} = playerApi;
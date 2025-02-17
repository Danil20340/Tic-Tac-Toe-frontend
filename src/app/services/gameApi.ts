import { api } from "./api";
import { ChatMessage, Game, Player, Rating } from "../types";

export const gameApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPlayerRatings: builder.query<Rating[], void>({
            query: () => ({
                url: "/rating",
                method: "GET",
            }),
        }),
        getCurrentGame: builder.query<Game, { id: string; }>({
            query: ({ id }) => ({
                url: `/game/${id}`,
                method: "GET",
            }),
        }),
        getGameMessages: builder.query<ChatMessage[], { id: string; }>({
            query: ({ id }) => ({
                url: `/messages/${id}`,
                method: "GET",
            }),
        })

    })
});

export const {
    useGetPlayerRatingsQuery,
    useLazyGetPlayerRatingsQuery,
    useGetCurrentGameQuery,
    useLazyGetCurrentGameQuery,
    useGetGameMessagesQuery,
    useLazyGetGameMessagesQuery
} = gameApi;

export const {
    endpoints: { getPlayerRatings, getCurrentGame, getGameMessages },
} = gameApi;
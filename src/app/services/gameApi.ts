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
        }),
        getGamesTable: builder.query<{id: string, 
            player1: Player['fullName'], 
            player2: Player['fullName']
            duration: string,
            winner: Player['fullName'],
            createTime: Date
        }[], void>({
            query: () => ({
                url: "/games",
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
    useLazyGetGameMessagesQuery,
    useGetGamesTableQuery
} = gameApi;

export const {
    endpoints: { getPlayerRatings, getCurrentGame, getGameMessages, getGamesTable },
} = gameApi;
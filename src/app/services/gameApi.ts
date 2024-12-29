import { api } from "./api";
import { Player, Rating } from "../types";

export const gameApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPlayerRatings: builder.query<Rating[], void>({
            query: () => ({
                url: "/rating",
                method: "GET",
            }),
        })
    })
});

export const {
    useGetPlayerRatingsQuery,
    useLazyGetPlayerRatingsQuery
} = gameApi;

export const {
    endpoints: { getPlayerRatings },
} = gameApi;
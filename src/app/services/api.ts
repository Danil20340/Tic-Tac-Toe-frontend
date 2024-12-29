import { createApi, fetchBaseQuery, retry, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";
import { RootState } from "../store";
import { logout } from "../../features/player/playerSlice";

// Базовый запрос с добавлением токена
const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).player.token || localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Обработка ошибок авторизации
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,          // Аргументы запроса (строка URL или объект FetchArgs)
  unknown,                     // Тип данных ответа
  FetchBaseQueryError          // Тип ошибки
>
  = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 403 || result.error?.status === 401 || result.error?.status === 404) {
      // Логика обработки ошибки токена
      api.dispatch(logout()); // Сбрасываем Redux-состояние
    }

    return result;
  };

// Добавляем повторные попытки
const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 1 });

// Создание API
export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry, // Используем обёрнутый запрос с повторными попытками
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
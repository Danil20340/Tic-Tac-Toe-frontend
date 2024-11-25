import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { Auth } from "./pages/auth"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Rating } from "./pages/rating";
import { PlayingField } from "./pages/playing-field";
import { GameHistory } from "./pages/game-history";
import { ActivePlayers } from "./pages/active-players";
import { Players } from "./pages/players";
import { Layout } from "./components/layout";
import { Provider } from "react-redux";
import { store } from "./app/store";

const container = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />
  },
  {
    element: <Layout />,
    children: [
      {
        path: "playing",
        element: <PlayingField />
      },
      {
        path: "rating",
        element: <Rating />
      },
      {
        path: "",
        element: <ActivePlayers />
      },
      {
        path: "history",
        element: <GameHistory />
      },
      {
        path: "players",
        element: <Players />
      },
    ]
  }
])

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
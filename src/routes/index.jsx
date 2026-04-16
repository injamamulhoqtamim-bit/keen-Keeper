import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";

import Home from "../pages/Home";
import Timeline from "../pages/Timeline";
import Stats from "../pages/Stats";
import FriendDetails from "../pages/FriendDetails";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "timeline", element: <Timeline /> },
      { path: "stats", element: <Stats /> },
      { path: "friend/:id", element: <FriendDetails /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
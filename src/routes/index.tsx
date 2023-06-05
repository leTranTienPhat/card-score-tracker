import { createBrowserRouter } from "react-router-dom";
import SelectionPage from "../pages/SelectionPage";
import GameConfigPage from "../pages/GameConfigPage";
import PageNotFound from "../pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SelectionPage />,
    // loader: rootLoader,
    // children: [
    //   {
    //     path: "team",
    //     element: <Team />,
    //     loader: teamLoader,
    //   },
    // ],
  },
  {
    path: "/config/:gameName",
    element: <GameConfigPage />,
  },
  {
    path: "/*",
    element: <PageNotFound />,
  },
]);

export default router;
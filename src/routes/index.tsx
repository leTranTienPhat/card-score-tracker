import { createBrowserRouter } from "react-router-dom";
import SelectionPage from "../pages/SelectionPage";
import GameConfigPage from "../pages/GameConfigPage";
import PageNotFound from "../pages/PageNotFound";
import Layout from "../layout";
import TienLen from "../pages/GameTrackerPages/TienLen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <SelectionPage />,
      },
      {
        path: "/config/:gameName",
        element: <GameConfigPage />,
      },
      {
        path: "/score/tien-len",
        element: <TienLen />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  }
]);

export default router;
import { createBrowserRouter } from "react-router-dom";
import SelectionPage from "../pages/SelectionPage";
import GameConfigPage from "../pages/GameConfigPage";
import PageNotFound from "../pages/PageNotFound";
import Layout from "../layout";

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
        path: "*",
        element: <PageNotFound />,
      },
    ],
  }
]);

export default router;
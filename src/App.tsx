import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import SelectionPage from './pages/SelectionPage';
import GameConfigPage from './pages/GameConfigPage';
import PageNotFound from './pages/PageNotFound';
import ErrorPage from './pages/ErrorPage';
import Header from './layout/Header';
import Footer from './layout/Footer';

function App() {

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
      path: "/gameconfig",
      element: <GameConfigPage />,
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <div className="flex flex-col bg-red-200 min-h-screen">
        <Header />
        <div className="grow">
          <RouterProvider router={router} />
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App

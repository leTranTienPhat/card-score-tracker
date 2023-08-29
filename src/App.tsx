import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./pages/ErrorPage";
import router from "./routes";
import ModalProvider from "./context/ModalContext";

function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </ErrorBoundary>
  );
}

export default App;

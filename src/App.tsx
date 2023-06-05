import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './pages/ErrorPage';
import Header from './layout/Header';
import Footer from './layout/Footer';
import router from './routes';

function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="h-[calc(100vh-var(--header-height)-var(--footer-height))] overflow-y-scroll">
          <RouterProvider router={router} />
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App

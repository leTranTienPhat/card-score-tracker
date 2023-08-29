import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="h-[calc(100vh-var(--header-height)-var(--footer-height))] overflow-y-scroll">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

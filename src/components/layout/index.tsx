import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-purple-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 px-5 md:px-10 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;

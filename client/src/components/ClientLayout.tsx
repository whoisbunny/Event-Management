import { Suspense } from "react";
import Loading from "@/components/Loading";
import Header from "./Header";
import Footer from "./Footer";
// import { AppSidebar } from "./app-sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";

export default function ClientLayout() {
  const { pathname } = useLocation();

  const isLoginPage = pathname === "/";

  return (
    <>
      {!isLoginPage && <AppSidebar />}
      <div className="flex flex-col min-h-screen w-full">
        {!isLoginPage && <Header />}

        <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>

        {!isLoginPage && <Footer />}
      </div>
    </>
  );
}

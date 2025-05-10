import { Suspense, useEffect } from "react";
import Loading from "@/components/Loading";
import Header from "./Header";
import Footer from "./Footer";
// import { AppSidebar } from "./app-sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";
import { useAppSelector } from "@/store";

export default function ClientLayout() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAppSelector((state) => state.auth);


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useLocation();

  const isLoginPage = pathname === "/";
  // useEffect(() => {
  //   setLoading(true);
  //   const timer = setTimeout(() => setLoading(false), 500);
  //   return () => clearTimeout(timer);
  // }, [pathname]);
  return (
    <>
      {!isLoginPage && <AppSidebar />}
      <div className="flex flex-col min-h-screen w-full">
        {!isLoginPage && <Header />}

        <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
          {/* {loading && <Loading />} */}
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>

        {!isLoginPage && <Footer />}
      </div>
    </>
  );
}

import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "@/components/Loading";
import ClientLayout from "./components/ClientLayout";
import { useAppDispatch } from "./store";
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Error = lazy(() => import("./pages/404"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(get)
  }, [dispatch])
  

  return (
    <Routes>
      <Route
        path="/"
        element={<Suspense fallback={<Loading />}>{<Login />}</Suspense>}
      />
      <Route path="/*" element={<ClientLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>
      <Route
        path="/404"
        element={
          <Suspense fallback={<Loading />}>
            <Error />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;

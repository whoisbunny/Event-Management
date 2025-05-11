import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "@/components/Loading";
import ClientLayout from "./components/ClientLayout";
import { useAppDispatch } from "./store";
import { getLoginState } from "./store/authReducer";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
const Signup = lazy(() => import("./pages/Signup"));
const Event = lazy(() => import("./pages/event"));
const Error = lazy(() => import("./pages/404"));
const Login = lazy(() => import("./pages/Login"));
const About = lazy(() => import("./pages/about"));

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLoginState());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <PublicRoute>
                <Login />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<Loading />}>
              <PublicRoute>
                <Signup />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <ClientLayout />
            </ProtectedRoute>
          }
        >
          <Route path="event" element={<Event />} />
          <Route path="about" element={<About />} />
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
    </>
  );
}

export default App;

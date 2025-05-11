import { useAppSelector } from "@/store";
import type React from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAppSelector((state) => state.auth.isAuthenticated);

  if (auth) {
    return <Navigate to="/event" replace />;
  }

  return children;
}

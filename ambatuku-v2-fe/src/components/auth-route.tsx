// src/components/AuthRoute.tsx
import { Navigate } from "@tanstack/react-router";

import { useAuthStore } from "@/stores/auth";

export function ProtectedRoute({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: string[];
}) {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/auth/login' />;
  }

  if (roles && !roles.includes(user?.role || "")) {
    return <Navigate to='/' />;
  }

  return <>{children}</>;
}

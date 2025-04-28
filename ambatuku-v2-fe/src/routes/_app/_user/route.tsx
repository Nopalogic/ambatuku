import { Outlet } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

import { ProtectedRoute } from "@/components/auth-route";
import { Header } from "@/components/app/header";

export const Route = createFileRoute("/_app/_user")({
  component: RouteLayoutComponent,
});

function RouteLayoutComponent() {
  return (
    <ProtectedRoute roles={["user", "admin"]}>
      <Header />
      <main className='container mx-auto px-4 py-6'>
        <Outlet />
      </main>
    </ProtectedRoute>
  );
}

import { Outlet, createFileRoute } from "@tanstack/react-router";

import { useAuthStore } from "@/stores/auth";

import { Header } from "@/components/app/header";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}

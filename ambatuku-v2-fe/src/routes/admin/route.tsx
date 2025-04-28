import { SearchProvider } from "@/contexts/search-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { Outlet, createFileRoute } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

import { SidebarProvider } from "@/components/ui/sidebar";

import { Header } from "@/components/admin/layout/header";
import { AppSidebar } from "@/components/admin/layout/sidebar";
import { ProtectedRoute } from "@/components/auth-route";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute roles={["admin"]}>
      <ThemeProvider>
        <SearchProvider>
          <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <div
              id='content'
              className={cn(
                "ml-auto w-full max-w-full",
                "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
                "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
                "transition-[width] duration-200 ease-linear",
                "flex h-svh flex-col",
                "group-data-[scroll-locked=1]/body:h-full",
                "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh"
              )}
            >
              <Header />
              <Outlet />
            </div>
          </SidebarProvider>
        </SearchProvider>
      </ThemeProvider>
    </ProtectedRoute>
  );
}

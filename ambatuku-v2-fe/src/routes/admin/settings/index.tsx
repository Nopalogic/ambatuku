import SettingsAccount from "@/pages/admin/settings/account";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/settings/")({
  component: SettingsAccount,
});

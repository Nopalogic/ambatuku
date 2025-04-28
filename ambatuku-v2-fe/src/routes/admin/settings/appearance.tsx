import SettingsAppearance from "@/pages/admin/settings/appearance";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/settings/appearance")({
  component: SettingsAppearance,
});

import ProfilePage from "@/pages/app/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_user/profile/")({
  component: ProfilePage,
});

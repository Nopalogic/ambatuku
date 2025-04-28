import {
  Banknote,
  LayoutDashboard,
  MessagesSquare,
  Package,
  Users,
} from "lucide-react";

import { SidebarData } from "@/types/sidebar";

export const sidebarData: SidebarData = {
  user: {
    name: "satnaing",
    email: "satnaingdev@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/admin",
          icon: LayoutDashboard,
        },
        {
          title: "Products",
          url: "/admin/products",
          icon: Package,
        },
        {
          title: "Transactions",
          url: "/admin/transactions",
          icon: Banknote,
        },
        {
          title: "Chats",
          url: "/admin/chats",
          badge: "3",
          icon: MessagesSquare,
        },
        {
          title: "Users",
          url: "/admin/users",
          icon: Users,
        },
      ],
    },
  ],
};

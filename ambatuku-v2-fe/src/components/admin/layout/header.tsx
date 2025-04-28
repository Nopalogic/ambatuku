import React from "react";

import { cn } from "@/lib/utils";

import { useAuthStore } from "@/stores/auth";

import { SidebarTrigger } from "@/components/ui/sidebar";

import { Search } from "@/components/admin/search";
import ProfileDropdown from "@/components/profile-dropdown";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  ref?: React.Ref<HTMLElement>;
}

const adminMenu = [
  {
    label: "Settings",
    url: "/admin/settings",
  },
];

export const Header = ({
  className,
  fixed,
  children,
  ...props
}: HeaderProps) => {
  const { user } = useAuthStore();
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    };

    // Add scroll listener to the body
    document.addEventListener("scroll", onScroll, { passive: true });

    // Clean up the event listener on unmount
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "flex h-16 items-center gap-3 bg-background p-4 sm:gap-4",
        fixed && "header-fixed peer/header fixed z-50 w-[inherit] rounded-md",
        offset > 10 && fixed ? "shadow" : "shadow-none",
        className
      )}
      {...props}
    >
      <SidebarTrigger variant='outline' className='scale-125 sm:scale-100' />
      <div className='ml-auto flex items-center space-x-4'>
        <Search />
        <ProfileDropdown user={user} routes={adminMenu} />
      </div>
    </header>
  );
};

Header.displayName = "Header";

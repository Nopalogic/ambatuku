import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/user";

interface Route {
  label: string;
  url: string;
}

interface ProfileDropdownProps {
  user: User;
  routes: Route[];
}

export default function ProfileDropdown({ user, routes }: ProfileDropdownProps) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const currentHref = useLocation({ select: (location) => location.href });
  const firstName = user.name.split(" ")[0];

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const isAdmin = user.role === "admin";
  const isAdminRoute = currentHref.includes("/admin");

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button 
          className="flex items-center gap-2"
          aria-label="User profile menu"
        >
          <img
            src={user.image || "/user-placeholder.png"}
            alt={`${user.name}'s profile`}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium capitalize">
            {firstName}
          </span>
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <UserProfileLabel name={user.name} email={user.email} />
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          {isAdmin && (
            <DropdownMenuItem asChild>
              {isAdminRoute ? (
                <Link to="/">Home</Link>
              ) : (
                <Link to="/admin">Dashboard</Link>
              )}
            </DropdownMenuItem>
          )}
          {routes.map((route) => (
            <NavLink key={route.url} route={route} />
          ))}
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserProfileLabel({ name, email }: { name: string; email: string }) {
  return (
    <DropdownMenuLabel className="font-normal">
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-xs leading-none text-muted-foreground">{email}</p>
      </div>
    </DropdownMenuLabel>
  );
}

function NavLink({ route }: { route: Route }) {
  return (
    <DropdownMenuItem asChild>
      <Link 
        to={route.url} 
        className="w-full"
        activeProps={{ className: "font-semibold" }}
      >
        {route.label}
      </Link>
    </DropdownMenuItem>
  );
}
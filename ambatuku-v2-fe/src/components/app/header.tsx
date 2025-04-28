import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";

import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import ProfileDropdown from "../profile-dropdown";

// import Searchbar from "@/components/app/search-bar";

const userMenu = [
  {
    label: "Profile",
    url: "/profile",
  },
  {
    label: "Pembelian",
    url: "/order-list",
  },
];

export const Header = () => {
  const { user } = useAuthStore();
  const { cartItems } = useCartStore();
  // const { products } = useLoaderData({ from: "/_app/" });

  return (
    <header className='sticky top-0 z-10 border-b border-gray-200 bg-white'>
      <div className='container mx-auto px-4 py-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <a href='/' className='flex-shrink-0'>
              <h1>Ambatuku</h1>
            </a>
          </div>

          <div className='mx-4 w-[60%]'>{/* <Searchbar data={[]} /> */}</div>

          <div className='flex items-center gap-4'>
            {(user?.role === "user" || user?.role === "admin") && (
              <Link to='/cart'>
                <button className='relative'>
                  <ShoppingCart className='h-6 w-6 text-gray-700' />
                  {cartItems.length > 0 && (
                    <Badge className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                      {cartItems.length}
                    </Badge>
                  )}
                </button>
              </Link>
            )}
            {user ? (
              <ProfileDropdown user={user} routes={userMenu} />
            ) : (
              <Link to='/auth/login'>
                <Button variant='outline'>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

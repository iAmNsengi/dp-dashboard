import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  MusicalNoteIcon,
  ShoppingBagIcon,
  CalendarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Tracks", href: "/tracks", icon: MusicalNoteIcon },
  { name: "Merchandise", href: "/merchandise", icon: ShoppingBagIcon },
  { name: "Events", href: "/events", icon: CalendarIcon },
  { name: "Profile", href: "/profile", icon: UserIcon },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow pt-5 bg-primary-900 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img className="h-8 w-auto" src="/logo.png" alt="DJ Plus Admin" />
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive
                      ? "bg-primary-800 text-white"
                      : "text-primary-100 hover:bg-primary-800"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon
                    className="mr-3 flex-shrink-0 h-6 w-6"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

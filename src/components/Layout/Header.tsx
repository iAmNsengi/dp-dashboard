import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon, BellIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import { Image } from "../common/Image";

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-primary-900">
                DJ Plus Admin
              </h1>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <BellIcon className="h-6 w-6 text-gray-500" />
            </button>
            <Menu as="div" className="ml-3 relative">
              <Menu.Button className="flex items-center">
                {user?.profileImage ? (
                  <Image
                    src={user.profileImage}
                    alt={user.username}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <UserCircleIcon className="h-8 w-8 text-gray-500" />
                )}
              </Menu.Button>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

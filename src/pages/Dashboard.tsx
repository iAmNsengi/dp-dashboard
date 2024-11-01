import React from "react";
import { Card } from "../components/common/Card";
import {
  ChartBarIcon,
  ShoppingBagIcon,
  TicketIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";

const stats = [
  { name: "Total Tracks", value: "24", icon: MusicalNoteIcon },
  { name: "Total Events", value: "12", icon: TicketIcon },
  { name: "Products in Stock", value: "156", icon: ShoppingBagIcon },
  { name: "Total Sales", value: "$12,345", icon: ChartBarIcon },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="flex items-center">
            <div className="p-3 rounded-md bg-primary-500 bg-opacity-10">
              <stat.icon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-lg font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="text-lg font-medium text-gray-900">Recent Tracks</h3>
          {/* Add recent tracks list */}
        </Card>
        <Card>
          <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
          {/* Add upcoming events list */}
        </Card>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import {
  ChartBarIcon,
  ShoppingBagIcon,
  TicketIcon,
  MusicalNoteIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Track, Event, Merchandise } from "../types";
import { tracks, events, merchandise } from "../services/api";
import toast from "react-hot-toast";

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    tracks: 0,
    events: 0,
    products: 0,
    sales: 0,
  });
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [tracksData, eventsData, merchandiseData] = await Promise.all([
          tracks.getAll().catch(() => []),
          events.getAll().catch(() => []),
          merchandise.getAll().catch(() => []),
        ]);

        console.log("events data logging...", eventsData.events);

        setStats({
          tracks: tracksData?.length || 0,
          events: eventsData?.events?.length || 0,
          products: merchandiseData?.length || 0,
          sales:
            merchandiseData?.reduce(
              (acc: number, item: Merchandise) =>
                acc + (item.price || 0) * (item.stockCount || 0),
              0
            ) || 0,
        });

        setRecentTracks(tracksData?.slice(0, 5) || []);
        setUpcomingEvents(
          (
            eventsData?.events.filter((e) => e.status === "upcoming") || []
          ).slice(0, 5)
        );
      } catch (error) {
        console.error("Dashboard data loading error:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Error loading dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <div className="space-x-4">
          <Link to="/tracks/new">
            <Button>
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Track
            </Button>
          </Link>
          <Link to="/events/new">
            <Button variant="secondary">
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Event
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Tracks"
          value={stats.tracks}
          icon={MusicalNoteIcon}
        />
        <StatCard
          title="Upcoming Events"
          value={stats.events}
          icon={TicketIcon}
        />
        <StatCard
          title="Products"
          value={stats.products}
          icon={ShoppingBagIcon}
        />
        <StatCard
          title="Total Sales"
          value={`$${stats.sales.toLocaleString()}`}
          icon={ChartBarIcon}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentTracks tracks={recentTracks} />
        <UpcomingEvents events={upcomingEvents} />
      </div>
    </div>
  );
};

// Additional components for the dashboard
const StatCard: React.FC<{
  title: string;
  value: number | string;
  icon: React.ComponentType<any>;
}> = ({ title, value, icon: Icon }) => (
  <Card className="flex items-center">
    <div className="p-3 rounded-md bg-primary-500 bg-opacity-10">
      <Icon className="h-6 w-6 text-primary-600" />
    </div>
    <div className="ml-4">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  </Card>
);

const RecentTracks: React.FC<{ tracks: Track[] }> = ({ tracks }) => (
  <Card>
    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Tracks</h3>
    <div className="space-y-4">
      {tracks.map((track) => (
        <div key={track._id} className="flex items-center">
          <img
            src={track.coverImage}
            alt={track.title}
            className="h-12 w-12 rounded object-cover"
          />
          <div className="ml-4">
            <p className="font-medium text-gray-900">{track.title}</p>
            {track.featuring && (
              <p className="text-sm text-gray-500">feat. {track.featuring}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const UpcomingEvents: React.FC<{ events: Event[] }> = ({ events }) => (
  <Card>
    <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h3>
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event._id} className="flex items-center">
          <img
            src={event.image}
            alt={event.title}
            className="h-12 w-12 rounded object-cover"
          />
          <div className="ml-4">
            <p className="font-medium text-gray-900">{event.title}</p>
            <p className="text-sm text-gray-500">
              {new Date(event.date).toLocaleDateString()} at {event.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

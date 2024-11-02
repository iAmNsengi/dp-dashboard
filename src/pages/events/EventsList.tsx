import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Event } from "../../types";
import { events } from "../../services/api";
import toast from "react-hot-toast";

export const EventsList: React.FC = () => {
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await events.getAll();
      setEventsList(data);
    } catch (error) {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await events.delete(id);
        toast.success("Event deleted successfully");
        fetchEvents();
      } catch (error) {
        toast.error("Failed to delete event");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Events</h2>
        <Link to="/events/new">
          <Button>
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Event
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {eventsList?.events.map((event: Event) => (
          <Card key={event._id} className="relative">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">
                {event.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(event.date).toLocaleDateString()} at {event.time}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {event.venue.name}, {event.venue.city}
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                <Link to={`/events/edit/${event._id}`}>
                  <Button variant="secondary" className="p-2">
                    <PencilIcon className="h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  className="p-2"
                  onClick={() => handleDelete(event._id)}
                >
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div
              className={`absolute top-2 right-2 px-2 py-1 rounded text-sm font-medium ${
                event.status === "upcoming"
                  ? "bg-green-100 text-green-800"
                  : event.status === "ongoing"
                  ? "bg-blue-100 text-blue-800"
                  : event.status === "completed"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {event.status}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

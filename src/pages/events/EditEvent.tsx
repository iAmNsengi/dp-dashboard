import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { EventForm } from "../../components/events/EventForm";
import { events } from "../../services/api";
import { Event } from "../../types";
import toast from "react-hot-toast";
import Loading from "../../components/common/Loading";

export const EditEvent: React.FC = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      if (id) {
        const data = await events.getOne(id);
        setEvent(data);
      }
    } catch (error) {
      toast.error("Failed to load event");
      navigate("/events");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      if (id) {
        await events.update(id, formData);
        toast.success("Event updated successfully");
        navigate("/events");
      }
    } catch (error) {
      toast.error("Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Edit Event</h2>
      <Card>
        {event && (
          <EventForm
            initialData={event}
            onSubmit={handleSubmit}
            isLoading={loading}
          />
        )}
      </Card>
    </div>
  );
};

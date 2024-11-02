// src/pages/events/AddEvent.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { EventForm } from "../../components/events/EventForm";
import { events } from "../../services/api";
import toast from "react-hot-toast";

export const AddEvent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await events.create(formData);
      toast.success("Event created successfully");
      navigate("/events");
    } catch (error) {
      toast.error("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>
      <Card>
        <EventForm onSubmit={handleSubmit} isLoading={loading} />
      </Card>
    </div>
  );
};

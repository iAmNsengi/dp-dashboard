import React, { useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { Event } from "../../types";

interface EventFormProps {
  initialData?: Partial<Event>;
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading: boolean;
}

export const EventForm: React.FC<EventFormProps> = ({
  initialData = {},
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    date: initialData.date?.split("T")[0] || "",
    time: initialData.time || "",
    venue: initialData.venue || "",
    status:
      initialData.status ||
      ("upcoming" as "upcoming" | "ongoing" | "completed" | "cancelled"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = new FormData();

    // Append all fields
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value.toString());
    });

    // Append image if it exists
    const imageInput =
      document.querySelector<HTMLInputElement>('input[type="file"]');
    if (imageInput?.files?.length)
      submitData.append("image", imageInput.files[0]);

    console.log(Object.fromEntries(submitData.entries()));

    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Event Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <Input
          type="date"
          label="Date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />

        <Input
          type="time"
          label="Time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          required
        />

        <div className="md:col-span-2">
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            rows={4}
            placeholder="Event Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Venue Details
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Venue Name"
              value={formData.venue}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  venue: e.target.value,
                })
              }
              required
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Event Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 block w-full"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // Preview logic could be added here
              }
            }}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {initialData._id ? "Update Event" : "Create Event"}
        </Button>
      </div>
    </form>
  );
};

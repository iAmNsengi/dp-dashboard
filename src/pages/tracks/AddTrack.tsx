import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { TrackForm } from "../../components/tracks/TrackForm";
import { tracks } from "../../services/api";
import toast from "react-hot-toast";

export const AddTrack: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await tracks.create(formData);
      toast.success("Track uploaded successfully");
      navigate("/tracks");
    } catch (error) {
      toast.error("Failed to upload track");
      if (error instanceof Error) {
        console.error("Upload error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Upload New Track</h2>
      </div>

      <Card>
        <TrackForm onSubmit={handleSubmit} isLoading={loading} />
      </Card>
    </div>
  );
};

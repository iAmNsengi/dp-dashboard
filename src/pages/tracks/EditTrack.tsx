// src/pages/tracks/EditTrack.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { TrackForm } from "../../components/tracks/TrackForm";
import { tracks } from "../../services/api";
import { Track } from "../../types";
import toast from "react-hot-toast";
import Loading from "../../components/common/Loading";

export const EditTrack: React.FC = () => {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchTrack();
  }, [id]);

  const fetchTrack = async () => {
    try {
      if (id) {
        const data = await tracks.getOne(id);
        setTrack(data);
      }
    } catch (error) {
      toast.error("Failed to load track");
      navigate("/tracks");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      if (id) {
        await tracks.update(id, formData);
        toast.success("Track updated successfully");
        navigate("/tracks");
      }
    } catch (error) {
      toast.error("Failed to update track");
      if (error instanceof Error) {
        console.error("Update error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Edit Track</h2>
      </div>

      <Card>
        {track && (
          <TrackForm
            initialData={track}
            onSubmit={handleSubmit}
            isLoading={loading}
          />
        )}
      </Card>
    </div>
  );
};

// src/pages/tracks/TracksList.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Track } from "../../types";
import { tracks } from "../../services/api";
import toast from "react-hot-toast";

export const TracksList: React.FC = () => {
  const [tracksList, setTracksList] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );

  useEffect(() => {
    fetchTracks();
    return () => {
      // Cleanup audio on unmount
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
      }
    };
  }, []);

  const fetchTracks = async () => {
    try {
      const data = await tracks.getAll();
      setTracksList(data);
    } catch (error) {
      toast.error("Failed to load tracks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this track?")) {
      try {
        await tracks.delete(id);
        toast.success("Track deleted successfully");
        fetchTracks();
      } catch (error) {
        toast.error("Failed to delete track");
      }
    }
  };

  const handlePlayPause = (trackId: string, audioUrl: string) => {
    if (currentlyPlaying === trackId) {
      audioElement?.pause();
      setCurrentlyPlaying(null);
    } else {
      if (audioElement) {
        audioElement.pause();
      }
      const audio = new Audio(audioUrl);
      audio.play();
      setAudioElement(audio);
      setCurrentlyPlaying(trackId);

      audio.addEventListener("ended", () => {
        setCurrentlyPlaying(null);
      });
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
        <h2 className="text-2xl font-bold text-gray-900">Tracks</h2>
        <Link to="/tracks/new">
          <Button>
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Track
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tracksList.map((track) => (
          <Card key={track._id} className="flex flex-col">
            <div className="relative">
              <img
                src={track.coverImage}
                alt={track.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <button
                onClick={() => handlePlayPause(track._id, track.audioFile)}
                className="absolute bottom-2 right-2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
              >
                {currentlyPlaying === track._id ? (
                  <PauseIcon className="h-6 w-6 text-primary-600" />
                ) : (
                  <PlayIcon className="h-6 w-6 text-primary-600" />
                )}
              </button>
            </div>

            <div className="p-4 flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                {track.title}
              </h3>
              {track.featuring && (
                <p className="text-sm text-gray-500">feat. {track.featuring}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Released: {new Date(track.releaseDate).toLocaleDateString()}
              </p>
            </div>

            <div className="border-t p-4 flex justify-end space-x-2">
              <Link to={`/tracks/edit/${track._id}`}>
                <Button variant="secondary" className="p-2">
                  <PencilIcon className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="danger"
                className="p-2"
                onClick={() => handleDelete(track._id)}
              >
                <TrashIcon className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

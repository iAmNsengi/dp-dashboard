// src/pages/tracks/index.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { TracksList } from "./TracksList";
import { AddTrack } from "./AddTrack";
import { EditTrack } from "./EditTrack";

export const Tracks: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TracksList />} />
      <Route path="/new" element={<AddTrack />} />
      <Route path="/edit/:id" element={<EditTrack />} />
    </Routes>
  );
};

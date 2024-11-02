import React from "react";
import { Route, Routes } from "react-router-dom";
import { MerchandiseList } from "./MerchandiseList";
import { AddMerchandise } from "./AddMerchndise";
import { EditMerchandise } from "./EditMerchandise";

export const Merchandise: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MerchandiseList />} />
      <Route path="/new" element={<AddMerchandise />} />
      <Route path="/edit/:id" element={<EditMerchandise />} />
    </Routes>
  );
};

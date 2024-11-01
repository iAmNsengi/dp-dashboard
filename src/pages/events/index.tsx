import { Routes, Route } from "react-router-dom";
import { EventsList } from "./EventsList";
// import { AddEvent } from "./AddEvent";
// import { EditEvent } from "./EditEvent";

export const Events: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<EventsList />} />
      {/* <Route path="/new" element={<AddEvent />} />
      <Route path="/edit/:id" element={<EditEvent />} /> */}
    </Routes>
  );
};

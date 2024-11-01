import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { Login } from "./auth/Login";
import { Dashboard } from "./pages/Dashboard";
// import { Tracks } from "./pages/tracks";
// import { Merchandise } from "./pages/merchandise";
// import { Events } from "./pages/events";
// import { Profile } from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/tracks/*" element={<Tracks />} /> */}
            {/* <Route path="/merchandise/*" element={<Merchandise />} /> */}
            {/* <Route path="/events/*" element={<Events />} /> */}
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


import React, { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Messages from "./pages/Messages";
import Connections from "./pages/Connections";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import ChatBox from "./pages/ChatBox";
import Layout from "./pages/Layout";   

// ────────────────────────────────────────────────
//  This component protects all nested routes
// ────────────────────────────────────────────────
const ProtectedRoutes = ({ currentUser, setCurrentUser }) => {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />;
};

const App = () => {
  const storedUser = localStorage.getItem("PingUpuser");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [currentUser, setCurrentUser] = useState(initialUser);

  return (
    <Routes>
      {/* Public – redirect away if already authenticated */}
      <Route
        path="/login"
        element={
          currentUser ? <Navigate to="/" replace /> : <Login setCurrentUser={setCurrentUser} />
        }
      />

      <Route
        path="/signup"
        element={
          currentUser ? <Navigate to="/" replace /> : <Signup setCurrentUser={setCurrentUser} />
        }
      />

      {/* All protected routes */}
      <Route element={<ProtectedRoutes currentUser={currentUser} setCurrentUser={setCurrentUser} />}>
      
        <Route index element={<Feed />} />
        <Route path="messages" element={<Messages />} />
        <Route path="messages/:userId" element={<ChatBox />} />
        <Route path="connections" element={<Connections />} />
        <Route path="discover" element={<Discover />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/:profileId" element={<Profile />} />
        <Route path="create-post" element={<CreatePost />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
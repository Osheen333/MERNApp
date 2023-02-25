import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import { ProtectedLayout } from "../components/ProtectedLayout";
import { AuthProvider } from "../context/AuthContext";

function Routing() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="*"
          element={
            <ProtectedLayout>
              <Profile />
            </ProtectedLayout>
          }
        />
        <Route path="/login/*" element={<Login />} />
        <Route path="/register/*" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}

export default Routing;

import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export const ProtectedLayout = ({ children }) => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

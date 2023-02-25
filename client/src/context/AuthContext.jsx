import React,{ createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children, userData, userDetailsData }) => {
  const [user, setUser] = useLocalStorage("user", userData);
  const [userDetails, setUserDetails] =  useLocalStorage("userDetails", userDetailsData);
  const navigate = useNavigate();
  const login = async (email,password) => {
    email = email.trim();
    password = password.trim();
    try {
      const response = await fetch("http://localhost:8000/api/transactions/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (data.status === "ok") {
        alert("login successful");
        setUser(data.data);
        navigate("/profile", { replace: true });
      } else {
        alert("Username or Password is incorrect");
      }
    } catch (error) {
      alert("Error");
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    setUserDetails(null)
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

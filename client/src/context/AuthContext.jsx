import React,{ createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children}) => {
  const [token, setToken] = useLocalStorage("token", null);
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
        toast.success('login successful');
        setToken(data.data);
        navigate("/profile", { replace: true });
      } else {
        toast.error('Username or Password is incorrect');
      }
    } catch (error) {
      console.log(error)
      toast.error('Error! Please try again after some time.');
    }
  };

  const logout = () => {
    setToken(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

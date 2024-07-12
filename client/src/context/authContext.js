import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const register = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", inputs);
      setCurrentUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:8800/api/auth/logout", {}, { withCredentials: true });
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

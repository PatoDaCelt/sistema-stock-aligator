import { useState, useEffect } from "react";
import axios from "axios";

export function useAuth() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );

  const login = async (username: string, password: string) => {
    const res = await axios.post("http://localhost:8000/api/token/", {
      username,
      password,
    });
    const token = res.data.access;
    localStorage.setItem('authToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setToken(res.data.access);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  const register = async (username: string, email: string, password: string) => {
    await axios.post("http://localhost:8000/api/register_view/", {
      username,
      email,
      password,
    });
  };

  const isAuthenticated = !!token;

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return { token, login, logout, register, isAuthenticated };
}

import { useState, useEffect } from "react";
import axios from "axios";

const TOKEN = "authToken";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const login = async (username: string, password: string) => {
    const res = await axios.post("http://localhost:8000/api/token/", {
      username,
      password,
    });

    const accessToken = res.data.access;

    localStorage.setItem(TOKEN, accessToken);

    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    setToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN);
    delete axios.defaults.headers.common["Authorization"];
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

  // Carga el token al iniciar la app
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN);

    if (savedToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
      setToken(savedToken);
    }

    setLoadingAuth(false);
  }, []);

  return { token, login, logout, register, isAuthenticated, loadingAuth };
}
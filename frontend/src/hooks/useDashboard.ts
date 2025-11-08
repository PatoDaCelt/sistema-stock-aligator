import { useEffect, useState } from "react";
import api from "../api.ts";
import type{ DashboardData } from "../types/models.ts";

// Hook para obtener stats
export default function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get<DashboardData>("dashboard/")
      .then((res) => {
        //Datos recibidos del back
        console.log("DATA Dashboard:", res.data);
        if (!mounted) return;
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (!mounted) return;
        setError(err.message || "Error al obtener dashboard");
        setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  return { data, loading, error };
}
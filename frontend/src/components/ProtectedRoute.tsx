import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated,loadingAuth } = useAuth();

  // Esperar a que el auth cargue el token
  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Verificando sesión...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children
}

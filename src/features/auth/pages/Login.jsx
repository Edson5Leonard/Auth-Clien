// Login.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Prellenar email si viene del registro
  useEffect(() => {
    if (location.state?.registeredEmail) {
      setCredentials((prev) => ({
        ...prev,
        email: location.state.registeredEmail,
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      alert("Por favor, complete todos los campos");
      return;
    }

    try {
      await login(credentials);
      navigate("/profile");
    } catch (error) {
      console.error("Error en login:", error);
      alert(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      {/* Tarjeta principal */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
        
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">✓</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bienvenido de nuevo
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="usuario@empresa.com"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 text-gray-900 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Campo Contraseña */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 text-gray-900 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50/80 text-red-700 text-sm px-4 py-3 backdrop-blur-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold 
                     rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 
                     disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                Iniciando sesión...
              </span>
            ) : (
              "Iniciar sesión"
            )}
          </button>

          {/* Enlace a registro */}
          <p className="text-center text-sm text-gray-600 pt-4">
            ¿No tienes una cuenta?{" "}
            <Link 
              to="/register" 
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
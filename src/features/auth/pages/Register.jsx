// Register.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    document_number: "",
    name: "",
    paternal_lastname: "",
    maternal_lastname: "",
    email: "",
    phone: "",
    user_name: "",
    password: "",
    last_session: new Date().toISOString().split("T")[0],
    account_statement: true,
    document_type_id: 1,
    country_id: 179,
  });

  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUserData({
      ...userData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(userData);
      alert("✅ Usuario registrado exitosamente!");
      navigate("/login", {
        replace: true,
        state: { registeredEmail: userData.email },
      });
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        alert(`Errores:\n\n${errorMessages.join("\n")}`);
      } else {
        alert(
          `Error: ${
            error.response?.data?.message || "Error al registrar usuario"
          }`
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center px-4 py-10">
      {/* Contenedor principal */}
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
        
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl font-bold">👤</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Crear cuenta
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Únete a nuestra comunidad completando tus datos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid de información personal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Nombre */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Nombre *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={userData.name}
                onChange={handleChange}
                placeholder="Ej: Juan"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 text-gray-900 placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Apellido paterno */}
            <div className="space-y-2">
              <label htmlFor="paternal_lastname" className="block text-sm font-semibold text-gray-700">
                Apellido paterno *
              </label>
              <input
                id="paternal_lastname"
                name="paternal_lastname"
                type="text"
                required
                value={userData.paternal_lastname}
                onChange={handleChange}
                placeholder="Ej: Pérez"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 text-gray-900 placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Apellido materno */}
            <div className="space-y-2">
              <label htmlFor="maternal_lastname" className="block text-sm font-semibold text-gray-700">
                Apellido materno *
              </label>
              <input
                id="maternal_lastname"
                name="maternal_lastname"
                type="text"
                required
                value={userData.maternal_lastname}
                onChange={handleChange}
                placeholder="Ej: García"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 text-gray-900 placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Número de documento */}
            <div className="space-y-2">
              <label htmlFor="document_number" className="block text-sm font-semibold text-gray-700">
                Documento *
              </label>
              <input
                id="document_number"
                name="document_number"
                type="text"
                required
                value={userData.document_number}
                onChange={handleChange}
                placeholder="Ej: 87654321"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 text-gray-900 placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Correo electrónico *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={userData.email}
              onChange={handleChange}
              placeholder="usuario@empresa.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 text-gray-900 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Nombre de usuario */}
          <div className="space-y-2">
            <label htmlFor="user_name" className="block text-sm font-semibold text-gray-700">
              Usuario *
            </label>
            <input
              id="user_name"
              name="user_name"
              type="text"
              required
              value={userData.user_name}
              onChange={handleChange}
              placeholder="Ej: jperez"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 text-gray-900 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Grid de contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Teléfono */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                Teléfono *
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                required
                value={userData.phone}
                onChange={handleChange}
                placeholder="Ej: 987654321"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 text-gray-900 placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Contraseña *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={userData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 text-gray-900 placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50/80 text-red-700 text-sm px-4 py-3 backdrop-blur-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Botón de registro */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold 
                     rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-200 
                     disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl mt-6"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                Creando cuenta...
              </span>
            ) : (
              "Crear mi cuenta"
            )}
          </button>

          {/* Enlace a login */}
          <p className="text-center text-sm text-gray-600 pt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link 
              to="/login" 
              className="font-semibold text-green-600 hover:text-green-700 hover:underline transition-colors"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
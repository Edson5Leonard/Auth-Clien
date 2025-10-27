// Profile.jsx
import React from "react";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../../auth/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Globe, Shield, Hash, LogOut } from "lucide-react";

const Profile = () => {
  const { profile, loading, error } = useProfile();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Generar iniciales para avatar
  const getInitials = (name = "", paternal = "") =>
    `${name.charAt(0) || ""}${paternal.charAt(0) || ""}`.toUpperCase();

  // Estados de carga
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 text-sm">Cargando tu perfil...</p>
        </div>
      </div>
    );
  }

  // Manejo de errores
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-6 py-4 rounded-xl max-w-md text-center">
          ⚠️ {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center px-4 py-10">
      
      {/* Tarjeta de perfil */}
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
        
        {/* Encabezado con avatar */}
        <div className="flex flex-col items-center text-center mb-8">
          
          {/* Avatar con gradiente o imagen */}
          {profile.image_url ? (
            <img
              src={profile.image_url}
              alt="Foto de perfil"
              className="w-28 h-28 rounded-full border-4 border-white/60 shadow-lg object-cover mb-4"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center 
                          text-white text-3xl font-bold border-4 border-white/60 shadow-lg mb-4">
              {getInitials(profile.name, profile.paternal_lastname)}
            </div>
          )}

          {/* Nombre y rol */}
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {profile.name} {profile.paternal_lastname} {profile.maternal_lastname}
          </h2>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
            {profile.role?.name || "Usuario"}
          </div>
        </div>

        {/* Grid de información */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Información personal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <User className="w-5 h-5 mr-2 text-purple-500" />
              Información Personal
            </h3>
            <div className="rounded-xl border border-gray-200/60 bg-white/50 p-5 space-y-4 backdrop-blur-sm">
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Teléfono</p>
                  <p className="text-sm font-medium text-gray-900">
                    {profile.phone || "No registrado"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Usuario</p>
                  <p className="text-sm font-medium text-gray-900">{profile.user_name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-purple-500" />
              Información Adicional
            </h3>
            <div className="rounded-xl border border-gray-200/60 bg-white/50 p-5 space-y-4 backdrop-blur-sm">
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">País</p>
                  <p className="text-sm font-medium text-gray-900">
                    {profile.country?.name || "No disponible"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Hash className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">ID de Usuario</p>
                  <p className="text-sm font-medium text-gray-900">#{profile.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de cerrar sesión */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white 
                     font-semibold rounded-xl hover:from-gray-900 hover:to-black transition-all duration-200 
                     shadow-lg hover:shadow-xl"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
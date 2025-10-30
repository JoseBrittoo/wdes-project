"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../src/lib/supabase";
import { Link } from "react-router-dom";

interface HeaderProps {
  onLogout?: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  const [userName, setUserName] = useState<string | null>(null);
  const [profileType, setProfileType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("name, profile")
          .eq("id", user.id)
          .single();

        if (!error && profileData) {
          setUserName(profileData.name);
          setProfileType(profileData.profile);
        }
      }
    };

    fetchUserData();
  }, []);

  const getNavOptions = () => {
    if (profileType === "estudante") {
      return [
        { name: "Dashboard", route: "/dashboard-estudante" },
        { name: "Grade", route: "/grade-curricular" },
        { name: "Projetos", route: "/projects" },
        { name: "Eventos", route: "/events" },
        { name: "Professores", route: "/professors" },
        { name: "Assistente", route: "/assistant" },
      ];
    }
    if (profileType === "professor") {
      return [
        { name: "Dashboard", route: "/dashboard-professor" },
      ];
    }
    if (profileType === "admin") {
      return [
        { name: "Dashboard", route: "/dashboard" },
      ];
    }
    return [{ name: "Dashboard", route: "/dashboard" }];
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (onLogout) onLogout();
  };

  return (
    <div className="w-full bg-white">
      <div className="flex justify-between items-center px-6 py-4 w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">SA</span>
          </div>
          <span className="text-lg font-medium text-gray-800">Sistema Acadêmico</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            {userName ? `Bem-vindo, ${userName}` : "Carregando..."}
          </span>
          {userName && (
            <div className="w-9 h-9 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="ml-2 text-sm text-red-600 hover:underline"
          >
            Sair
          </button>
        </div>
      </div>

      <nav className="flex gap-8 px-6 border-t-4 border-t-green-700 border-b border-b-gray-200 w-full">
        {getNavOptions().map((option, index) => (
          <Link
            key={index}
            to={option.route} // Navegar para a rota com o Link
            onClick={() => setActiveTab(option.name)} // Atualiza a aba ativa
            className={`relative py-3 text-sm font-medium transition-colors ${
              activeTab === option.name
                ? "text-green-700"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {option.name}
            {activeTab === option.name && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-700" />
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}

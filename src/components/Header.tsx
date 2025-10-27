"use client";

import { useState } from "react";

interface HeaderProps {
  user: { name: string };
  profileType: string;
  onLogout: () => void;
}

export default function Header({ user, profileType }: HeaderProps) {
  const getNavOptions = () => {
    if (profileType === "aluno") {
      return ["Dashboard", "Grade", "Projetos"];
    }
    if (profileType === "professor") {
      return ["Dashboard", "Grade", "Projetos", "Recomendações IA"];
    }
    return ["Dashboard"];
  };

  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="w-full bg-white">
      <div className="flex justify-between items-center px-6 py-4 w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">SA</span>
          </div>
          <span className="text-lg font-medium text-gray-800">
            Sistema Acadêmico
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Bem-vindo, {user.name}</span>
          <div className="w-9 h-9 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>
      </div>

      <nav className="flex gap-8 px-6 border-t-4 border-t-green-700 border-b border-b-gray-200 w-full">
        {getNavOptions().map((option, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(option)}
            className={`relative py-3 text-sm font-medium transition-colors ${
              activeTab === option
                ? "text-green-700"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {option}
            {activeTab === option && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-700" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase"; // Conexão com o Supabase
import { useNavigate } from "react-router-dom";

// Tipo de dados que vamos manipular
interface Profile {
  id: string;
  name: string;
  email: string;
  matricula: string;
  course: string;
  profile: string | null;
  is_cotista: boolean;
  cota: string | null;
  is_pcd: boolean;
  deficiencia: string | null;
  course_id: string;
  lattes_link: string | null;
  disciplines: string[] | null;
  description: string | null;
  is_teacher: boolean;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const courseNameMap: Record<string, string> = {
    licenciatura_computacao: "Licenciatura em Computação",
    engenharia_computacao: "Engenharia da Computação",
    sistema_informacao: "Sistema de Informação",
  };

  const formatCourseName = (courseKey: string): string => {
    return courseNameMap[courseKey] || courseKey;
  };

  // Recupera as informações do perfil do usuário logado
  useEffect(() => {
    const fetchProfile = async () => {
      // Obtém o usuário logado usando a API atual
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Usuário não encontrado:", authError);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id) // Usa user.id do objeto retornado
        .single();

      if (error) {
        console.error("Erro ao buscar perfil:", error);
        return;
      }

      setProfile(data);
    };

    fetchProfile();
  }, []);

  // Função para atualizar o perfil (somente para professores)
  const handleUpdateProfile = async () => {
    if (!profile) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        description: profile.description,
        disciplines: profile.disciplines,
        lattes_link: profile.lattes_link,
      })
      .eq("id", profile.id);

    if (error) {
      console.error("Erro ao atualizar perfil", error);
    } else {
      setIsEditing(false);
    }
  };

  if (!profile) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="relative bg-[#588B1E] p-8 rounded-3xl shadow-2xl max-w-2xl w-full">
        {" "}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
            <div className="w-20 h-20 bg-[#E2e0af] rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-[#AE2B2A]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2 uppercase">
                Nome:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile(
                      profile ? { ...profile, name: e.target.value } : profile
                    )
                  }
                  className="w-full bg-[#072E13] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-green-300"
                />
              ) : (
                <div className="w-full bg-green-800/80 text-white rounded-lg px-4 py-3">
                  {profile.name || "Nome não disponível"}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2 uppercase">
                Email:
              </label>
              <div className="w-full bg-green-800/80 text-white rounded-lg px-4 py-3 text-sm">
                {profile.email || "Email não disponível"}
              </div>
            </div>

            {/* Matrícula */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2 uppercase">
                Matrícula:
              </label>
              <div className="w-full bg-green-800/80 text-white rounded-lg px-4 py-3">
                {profile.matricula || "Matrícula não disponível"}
              </div>
            </div>

            {/* Curso */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2 uppercase">
                Curso:
              </label>
              <div className="w-full bg-green-800/80 text-white rounded-lg px-4 py-3 text-sm">
                {formatCourseName(profile.course) || "Curso não disponível"}
              </div>
            </div>

            {profile.is_teacher && (
              <div className="md:col-span-2">
                <label className="block text-white text-sm font-semibold mb-2 uppercase">
                  Disciplinas:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.disciplines?.join(", ") || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        disciplines: e.target.value.split(", "),
                      })
                    }
                    className="w-full bg-green-800/80 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-green-300"
                  />
                ) : (
                  <div className="w-full bg-green-800/80 text-white rounded-lg px-4 py-3">
                    {profile.disciplines?.join(", ") || "Sem disciplinas"}
                  </div>
                )}
              </div>
            )}

            {profile.is_teacher && (
              <div className="md:col-span-2">
                <label className="block text-white text-sm font-semibold mb-2 uppercase">
                  Link do Lattes:
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profile.lattes_link || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, lattes_link: e.target.value })
                    }
                    className="w-full bg-green-800/80 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-green-300"
                    placeholder="https://lattes.cnpq.br/..."
                  />
                ) : (
                  <div className="w-full bg-green-800/80 text-white rounded-lg px-4 py-3">
                    {profile.lattes_link ? (
                      <a
                        href={profile.lattes_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-200 hover:text-blue-100 underline truncate block"
                      >
                        Ver Currículo Lattes
                      </a>
                    ) : (
                      <p className="text-sm">Link do Lattes não disponível</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {profile.is_teacher && (
            <div>
              <label className="block text-white text-sm font-semibold mb-2 uppercase">
                Descrição:
              </label>
              {isEditing ? (
                <textarea
                  value={profile.description || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, description: e.target.value })
                  }
                  className="w-full bg-green-800/80 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-green-300"
                  rows={3}
                />
              ) : (
                <div className="w-full bg-green-800/80 text-white rounded-lg px-4 py-3">
                  {profile.description || "Sem descrição disponível"}
                </div>
              )}
            </div>
          )}

          <div className="bg-green-800/80 text-white rounded-lg px-4 py-3">
            <div className="grid grid-cols-2 gap-4">
              <p className="text-sm">
                <span className="font-semibold">Cotista:</span>{" "}
                {profile.is_cotista ? "Sim" : "Não"}
              </p>
              <p className="text-sm">
                <span className="font-semibold">PCD:</span>{" "}
                {profile.is_pcd ? "Sim" : "Não"}
              </p>
            </div>
            {profile.deficiencia && (
              <p className="text-sm mt-2">
                <span className="font-semibold">Deficiência:</span>{" "}
                {profile.deficiencia}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          {isEditing ? (
            <div className="flex gap-3">
              <button
                onClick={handleUpdateProfile}
                className="bg-green-800 hover:bg-green-900 text-white font-bold py-3 px-8 rounded-full uppercase tracking-wide transition-colors shadow-lg"
              >
                Salvar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-full uppercase tracking-wide transition-colors shadow-lg"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-800 hover:bg-green-900 text-white font-bold py-3 px-12 rounded-full uppercase tracking-wide transition-colors shadow-lg"
            >
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

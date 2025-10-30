import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

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

const TeacherProfilePage = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const navigate = useNavigate();

  const courseNameMap: Record<string, string> = {
    licenciatura_computacao: "Licenciatura em Computação",
    engenharia_computacao: "Engenharia da Computação",
    sistema_informacao: "Sistema de Informação",
  };

  const formatCourseName = (courseKey: string): string => {
    return courseNameMap[courseKey] || courseKey;
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("is_teacher", true);

      if (error) {
        console.error("Erro ao buscar professores:", error);
      } else {
        setProfiles(data);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Corpo Docente
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div key={profile.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-center mb-4">
                <div className="w-24 h-24 bg-[#E2e0af] rounded-full flex items-center justify-center mx-auto">
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
              <h2 className="text-lg font-semibold text-center">
                {profile.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2 break-all overflow-hidden">
                {profile.description || "Sem descrição disponível"}
              </p>

              {/* Nome do Curso */}
              <div className="mt-4">
                <p className="font-semibold">Curso:</p>
                <p className="text-sm text-gray-600">
                  {formatCourseName(profile.course) || "Curso não disponível"}
                </p>
              </div>

              {/* Disciplinas */}
              <div className="mt-4">
                <p className="font-semibold">Disciplinas:</p>
                <p className="text-sm text-gray-600">
                  {profile.disciplines?.join(", ") || "Sem disciplinas"}
                </p>

                <div className="mt-4 text-center">
                  <Button
                    onClick={() => {
                      if (profile.lattes_link) {
                        window.open(profile.lattes_link, "_blank");
                      } else {
                        alert("Link do Lattes não disponível");
                      }
                    }}
                  >
                    Ver Perfil Lattes
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfilePage;

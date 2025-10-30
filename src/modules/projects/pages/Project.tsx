import { useState, useEffect } from "react";
import type { Project } from "../types/ProjectType";
import { ProjectCard } from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { supabase } from "../../../lib/supabase";

export default function ProjetosPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase.from("projects").select("*");

        if (error) {
          throw error;
        }

        const formattedData = data?.map((project) => ({
          id: project.id,
          nome_edital: project.nome_edital,
          unidade: project.unidade,
          inicio_inscricoes: project.inicio_inscricoes,
          fim_inscricoes: project.fim_inscricoes,
          descricao: project.descricao,
          link_edital: project.link_edital,
          tipo_projeto: project.tipo_projeto,
        }));

        setProjects(formattedData || []);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-3xl font-bold whitespace-nowrap">
            Projetos Acadêmicos
          </h1>
          <div className="flex-shrink-0">
            <Button onClick={() => navigate("/projetos/cadastrar")}>
              Novo Projeto
            </Button>
          </div>
        </div>
        {/* Lista de Projetos */}
        <div className="space-y-4">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Nenhum projeto encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

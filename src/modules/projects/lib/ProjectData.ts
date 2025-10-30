import { supabase } from "../../../lib/supabase";
import type { Project } from "../types/ProjectType";

export async function fetchProjects(): Promise<Project[]> {
    const { data, error } = await supabase.from("projects").select("*");

    if (error) {
        console.error("Erro ao buscar projetos:", error.message);
        return [];
    }

    return data || [];
}

export const unidades = [
    "Escola Superior de Desenvolvimento",
    "Escola Superior de Biologia",
    "Escola Superior de Engenharia",
    "Escola Superior de Administração",
];

export const tiposProjeto = [
    { value: "monitoria", label: "Monitoria" },
    { value: "iniciacao-cientifica", label: "Iniciação Científica" },
    { value: "extensao", label: "Extensão" },
];

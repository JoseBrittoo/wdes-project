export type ProjectType = "monitoria" | "iniciacao-cientifica" | "extensao";

export interface Project {
  id: string;
  nome_edital: string;
  unidade: string;
  inicio_inscricoes: string;
  fim_inscricoes: string;
  tipo_projeto: ProjectType;
  link_edital: string;
  descricao?: string;
}

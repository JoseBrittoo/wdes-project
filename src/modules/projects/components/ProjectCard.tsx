// Importações
import type { Project } from "../types/ProjectType";
import { InfoButton } from "./../../../components/Button";

// Constantes
const tipoLabels: Record<string, string> = {
  monitoria: "Monitoria",
  "iniciacao-cientifica": "Iniciação Científica",
  extensao: "Extensão",
};

const tipoColors: Record<string, string> = {
  monitoria: "bg-blue-100 text-blue-800 border-blue-200",
  "iniciacao-cientifica": "bg-purple-100 text-purple-800 border-purple-200",
  extensao: "bg-green-100 text-green-800 border-green-200",
};

// Componentes Auxiliares
interface BadgeProps {
  variant?: "outline" | "solid";
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = "solid", className, children }: BadgeProps) {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  const variantClasses =
    variant === "outline" ? "border" : "bg-gray-100 text-gray-800";

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border shadow-sm ${className}`}>{children}</div>
  );
}

function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

// Interface Principal
interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-semibold text-base mb-1">
                Titulo: {project.nome_edital}
              </h3>
            </div>

            <div className="space-y-1.5 text-sm">
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground min-w-[140px]">
                  Unidade:
                </span>
                <span>{project.unidade}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground min-w-[140px]">
                  Início Inscrição:
                </span>
                <span>{project.inicio_inscricoes}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground min-w-[140px]">
                  Término Inscrição:
                </span>
                <span>{project.fim_inscricoes}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground min-w-[140px]">
                  Descrição:
                </span>
                <span>{project.descricao}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-16">
            <Badge
              variant="outline"
              className={tipoColors[project.tipo_projeto]}
            >
              {tipoLabels[project.tipo_projeto]}
            </Badge>
            <InfoButton onClick={() => window.open(project.link_edital, "_blank")}>
              Mais detalhes
            </InfoButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

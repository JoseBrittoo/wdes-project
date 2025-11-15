interface ProjectCardCoordProps {
  project: {
    titulo: string
    tipo: string
    professor: string
    descricao: string
    participantes: number
    prazo?: string
    concluido?: string
    status: "Aprovado" | "Em Análise" | "Concluído"
    progresso?: number
  }
  onViewDetails: () => void
  onEdit: () => void
  onApprove?: () => void
  onReject?: () => void
  onViewReport?: () => void
}

export function ProjectCardCoord({
  project,
  onViewDetails,
  onEdit,
  onApprove,
  onReject,
  onViewReport,
}: ProjectCardCoordProps) {
  const getStatusBadge = () => {
    const badges = {
      Aprovado: "bg-green-100 text-green-800",
      "Em Análise": "bg-yellow-100 text-yellow-800",
      Concluído: "bg-blue-100 text-blue-800",
    }
    return badges[project.status]
  }

  const getProgressColor = () => {
    if (!project.progresso) return "bg-gray-200"
    if (project.progresso === 100) return "bg-blue-500"
    return "bg-green-500"
  }

  return (
    <div className="border-b last:border-0 pb-6 last:pb-0">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">{project.titulo}</h4>
          <p className="text-sm text-gray-600">
            {project.tipo} • {project.professor}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge()}`}>
          {project.status}
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-3">{project.descricao}</p>

      <div className="text-sm text-gray-600 mb-3">
        <span>Participantes: {project.participantes} alunos</span>
        {project.prazo && <span> • Prazo: {project.prazo}</span>}
        {project.concluido && <span> • Concluído: {project.concluido}</span>}
      </div>

      {project.progresso !== undefined && (
        <div className="mb-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getProgressColor()}`}
              style={{ width: `${project.progresso}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{project.progresso}% concluído</p>
        </div>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        {project.status === "Aprovado" && (
          <>
            <button onClick={onViewDetails} className="text-sm text-indigo-600 hover:underline">
              Ver Detalhes
            </button>
            <button onClick={onEdit} className="text-sm text-indigo-600 hover:underline">
              Editar
            </button>
          </>
        )}
        {project.status === "Em Análise" && (
          <>
            <button onClick={onApprove} className="text-sm text-green-600 hover:underline">
              Aprovar
            </button>
            <button onClick={onReject} className="text-sm text-red-600 hover:underline">
              Rejeitar
            </button>
          </>
        )}
        {project.status === "Concluído" && (
          <button onClick={onViewReport} className="text-sm text-indigo-600 hover:underline">
            Ver Relatório
          </button>
        )}
      </div>
    </div>
  )
}

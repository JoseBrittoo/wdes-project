"use client"

interface Disciplina {
  nome: string
  creditos: number
  tipo: "Obrigatória" | "Optativa"
  professor: string
  periodo: string
  status: "Ativa" | "Pendente"
}

interface DisciplinasTableProps {
  disciplinas: Disciplina[]
  onEdit: (disciplina: Disciplina) => void
  onEmenta: (disciplina: Disciplina) => void
}

export default function DisciplinasTable({ disciplinas, onEdit, onEmenta }: DisciplinasTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Disciplina</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Professor</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Período</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Ações</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.map((disciplina, index) => (
            <tr key={index} className="border-b hover:bg-slate-50 transition-colors">
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-sm text-foreground">{disciplina.nome}</p>
                  <p className="text-xs text-muted-foreground">
                    {disciplina.creditos} créditos • {disciplina.tipo}
                  </p>
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-foreground">{disciplina.professor}</td>
              <td className="py-4 px-4 text-sm text-foreground">{disciplina.periodo}</td>
              <td className="py-4 px-4">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    disciplina.status === "Ativa" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {disciplina.status}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(disciplina)}
                    className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onEmenta(disciplina)}
                    className="px-3 py-1 text-xs font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                  >
                    Ementa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

"use client"

interface GradeCurricularCardProps {
  cargaHorariaTotal: string
  disciplinasObrigatorias: number
  disciplinasOptativas: number
  onExportar: () => void
}

export default function GradeCurricularCard({
  cargaHorariaTotal,
  disciplinasObrigatorias,
  disciplinasOptativas,
  onExportar,
}: GradeCurricularCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Grade Curricular</h3>

      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Carga Horária Total</p>
          <p className="text-3xl font-bold text-blue-600">{cargaHorariaTotal}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Disciplinas Obrigatórias</p>
          <p className="text-3xl font-bold text-green-600">{disciplinasObrigatorias}</p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Disciplinas Optativas</p>
          <p className="text-3xl font-bold text-orange-600">{disciplinasOptativas}</p>
        </div>

        <button
          onClick={onExportar}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Exportar Grade
        </button>
      </div>
    </div>
  )
}

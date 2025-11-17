import { Card, CardContent } from "../../dashboards/components/Card"

interface StatItem {
  value: number
  label: string
  color: "green" | "yellow" | "purple"
}

interface ProjectStatsProps {
  stats: StatItem[]
  onGenerateReport: () => void
}

export function ProjectStats({ stats, onGenerateReport }: ProjectStatsProps) {
  const getColorClasses = (color: string) => {
    const colors = {
      green: "bg-green-50 text-green-700",
      yellow: "bg-yellow-50 text-yellow-700",
      purple: "bg-purple-50 text-purple-700",
    }
    return colors[color as keyof typeof colors] || "bg-gray-50 text-gray-700"
  }

  return (
    <Card>
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Estatísticas</h3>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className={`p-4 rounded-lg ${getColorClasses(stat.color)}`}>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
        <button
          onClick={onGenerateReport}
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
        >
          Relatório Projetos
        </button>
      </CardContent>
    </Card>
  )
}

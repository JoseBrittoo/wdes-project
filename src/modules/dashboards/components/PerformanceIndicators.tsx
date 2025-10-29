import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { TrendingUp } from "lucide-react"

export default function PerformanceIndicators() {
  const indicators = [
    {
      title: "Taxa de Retenção",
      value: "92%",
      subtitle: "Alunos que não evadiram",
      bgColor: "bg-blue-500",
    },
    {
      title: "Satisfação Discente",
      value: "4.6/5",
      subtitle: "Avaliação média dos alunos",
      bgColor: "bg-emerald-500",
    },
    {
      title: "Tempo Médio de Formação",
      value: "4.2 anos",
      subtitle: "Duração média do curso",
      bgColor: "bg-orange-500",
    },
    {
      title: "Satisfação Docente",
      value: "80%",
      subtitle: "Professores satisfeitos",
      bgColor: "bg-purple-500",
    },
  ]

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Indicadores de Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {indicators.map((indicator, index) => (
          <div key={index} className={`${indicator.bgColor} p-4 rounded-lg text-white`}>
            <p className="text-sm font-medium mb-1">{indicator.title}</p>
            <p className="text-2xl font-bold mb-1">{indicator.value}</p>
            <p className="text-xs opacity-90">{indicator.subtitle}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

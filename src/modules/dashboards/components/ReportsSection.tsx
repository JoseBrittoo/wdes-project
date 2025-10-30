import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { FileText, Users, TrendingDown, FolderKanban } from "lucide-react"

export default function ReportsSection() {
  const reports = [
    {
      icon: FileText,
      title: "Relatório Acadêmico",
      subtitle: "Desempenho geral dos alunos",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Users,
      title: "Relatório Docente",
      subtitle: "Avaliação dos professores",
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      icon: TrendingDown,
      title: "Relatório de Evasão",
      subtitle: "Análise de desistências",
      iconColor: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      icon: FolderKanban,
      title: "Relatório de Projetos",
      subtitle: "Status dos projetos",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Relatórios Disponíveis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {reports.map((report, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className={`${report.bgColor} p-2 rounded-lg`}>
              <report.icon className={`h-5 w-5 ${report.iconColor}`} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm text-foreground">{report.title}</p>
              <p className="text-xs text-muted-foreground">{report.subtitle}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

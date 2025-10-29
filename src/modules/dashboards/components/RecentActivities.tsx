import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { CheckCircle2, Clock } from "lucide-react"

export default function RecentActivities() {
  const activities = [
    {
      title: "PPC de Segurança da Informação aprovado",
      subtitle: "Prof. Maria Costa • Há 1 hora",
      completed: true,
    },
    {
      title: "Grade curricular atualizada para 2024.1",
      subtitle: "Prof. Carlos Lima • Ontem",
      completed: true,
    },
    {
      title: "Novo projeto de pesquisa cadastrado",
      subtitle: "Prof. Carlos Lima • Ontem",
      completed: true,
    },
  ]

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Atividades Recentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-sm text-foreground">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.subtitle}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

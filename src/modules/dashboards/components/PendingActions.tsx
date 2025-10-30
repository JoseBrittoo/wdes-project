import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { AlertTriangle, Clock, FileCheck } from "lucide-react"
import { Badge } from "./Badge"

export default function PendingActions() {
  const actions = [
    {
      icon: AlertTriangle,
      title: "Aprovação de PCC - Disciplina IA",
      subtitle: "Aguardando há 5 dias",
      badge: "Urgente",
      badgeColor: "bg-red-500",
    },
    {
      icon: Clock,
      title: "Validação de Projeto de Extensão",
      subtitle: "Prazo: 3 dias",
      badge: "Atenção",
      badgeColor: "bg-orange-500",
    },
    {
      icon: FileCheck,
      title: "Ajuste de Horários - 7º Período",
      subtitle: "Conflitos detectados",
      badge: "Revisar",
      badgeColor: "bg-blue-500",
    },
  ]

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Ações Pendentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
            <action.icon className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-sm text-foreground">{action.title}</p>
              <p className="text-xs text-muted-foreground">{action.subtitle}</p>
            </div>
            <Badge className={`${action.badgeColor} text-white border-0`}>{action.badge}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

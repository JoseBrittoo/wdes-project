import { BookOpen, GraduationCap, Link2, Star } from "lucide-react";
import CardStat from "../components/CardStat";
import CombinedCharts from "../components/CombinedCharts";
import ProgressSection from "../components/ProgressSection";

export default function DashboardStudents() {

  const cardStats = [
    {
      title: "Disciplinas Matriculadas",
      value: 8,
      icon: BookOpen,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Projetos Vinculados",
      value: 3,
      icon: Link2,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Média Geral",
      value: 8.7,
      icon: Star,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Créditos Concluídos",
      value: "156/200",
      icon: GraduationCap,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (

      <div className="min-h-screen bg-slate-50">
        <main className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            Nome do Aluno
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cardStats.map((stat, index) => (
              <CardStat
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                iconColor={stat.iconColor}
                bgColor={stat.bgColor}
              />
            ))}
          </div>

          {/* Gráficos lado a lado */}
          <CombinedCharts />
          <ProgressSection />
        </main>
      </div>
  );
}

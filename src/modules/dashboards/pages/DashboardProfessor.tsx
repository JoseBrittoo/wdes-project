"use client"

import { useState } from "react"
import { Users, BookOpen, ClipboardCheck, TrendingUp, User } from "lucide-react"
import CardStat from "../components/CardStat"
import CombinedCharts from "../components/CombinedCharts"
import ProgressSection from "../components/ProgressSection"
import { Card, CardContent } from "../components/Card"

type TabType = "dashboard" | "disciplinas" | "turmas" | "avaliacoes" | "frequencia" | "relatorios"

export default function DashboardProfessor() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard")

  const tabs = [
    { id: "dashboard" as TabType, label: "Dashboard" },
    { id: "disciplinas" as TabType, label: "Disciplinas" },
    { id: "turmas" as TabType, label: "Turmas" },
    { id: "avaliacoes" as TabType, label: "Avaliações" },
    { id: "frequencia" as TabType, label: "Frequência" },
    { id: "relatorios" as TabType, label: "Relatórios" },
  ]

  const cardStats = [
    {
      title: "Alunos Ativos",
      value: 156,
      icon: Users,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Disciplinas",
      value: 4,
      icon: BookOpen,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Avaliações Pendentes",
      value: 12,
      icon: ClipboardCheck,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Taxa de Aprovação",
      value: "87%",
      icon: TrendingUp,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  const performanceIndicators = [
    {
      title: "Taxa de Retenção",
      value: "92%",
      subtitle: "Média do semestre",
      color: "bg-blue-500",
    },
    {
      title: "Satisfação Discente",
      value: "4.6/5",
      subtitle: "Última avaliação",
      color: "bg-green-500",
    },
    {
      title: "Tempo Médio de Correção",
      value: "3.2 dias",
      subtitle: "Últimos 30 dias",
      color: "bg-yellow-500",
    },
    {
      title: "Frequência Média",
      value: "85%",
      subtitle: "Todas as turmas",
      color: "bg-purple-500",
    },
  ]

  const reports = [
    {
      title: "Relatório de Notas",
      subtitle: "Desempenho dos alunos",
      status: "available",
    },
    {
      title: "Relatório de Frequência",
      subtitle: "Presença por disciplina",
      status: "available",
    },
    {
      title: "Relatório de Atividades",
      subtitle: "Entregas e prazos",
      status: "pending",
    },
    {
      title: "Relatório Semestral",
      subtitle: "Análise completa",
      status: "available",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header com Tabs */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Sistema Acadêmico</h1>
                <p className="text-sm text-muted-foreground">Portal do Professor</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Prof. Dr. Ana Silva</span>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex gap-1 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {activeTab === "dashboard" && (
          <>
            <h2 className="text-2xl font-bold text-foreground mb-6">Dashboard do Professor</h2>

            {/* Cards de Estatísticas */}
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

            {/* Relatórios e Indicadores */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Relatórios Disponíveis */}
              <Card>
                <div className="px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold">Relatórios Disponíveis</h3>
                </div>
                <CardContent>
                  <div className="space-y-3">
                    {reports.map((report, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <div>
                          <p className="font-medium text-sm">{report.title}</p>
                          <p className="text-xs text-muted-foreground">{report.subtitle}</p>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            report.status === "available"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {report.status === "available" ? "Disponível" : "Pendente"}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Indicadores de Performance */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Indicadores de Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  {performanceIndicators.map((indicator, index) => (
                    <Card key={index}>
                      <CardContent>
                        <div className={`${indicator.color} text-white p-4 rounded-lg`}>
                          <p className="text-sm opacity-90">{indicator.title}</p>
                          <p className="text-2xl font-bold mt-1">{indicator.value}</p>
                          <p className="text-xs opacity-75 mt-1">{indicator.subtitle}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Gráficos */}
            <CombinedCharts />

            {/* Ações Pendentes e Atividades Recentes */}
            <ProgressSection />
          </>
        )}

        {activeTab === "disciplinas" && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Disciplinas</h3>
            <p className="text-muted-foreground">Conteúdo da seção de disciplinas será implementado aqui</p>
          </div>
        )}

        {activeTab === "turmas" && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Turmas</h3>
            <p className="text-muted-foreground">Conteúdo da seção de turmas será implementado aqui</p>
          </div>
        )}

        {activeTab === "avaliacoes" && (
          <div className="text-center py-12">
            <ClipboardCheck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Avaliações</h3>
            <p className="text-muted-foreground">Conteúdo da seção de avaliações será implementado aqui</p>
          </div>
        )}

        {activeTab === "frequencia" && (
          <div className="text-center py-12">
            <ClipboardCheck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Frequência</h3>
            <p className="text-muted-foreground">Conteúdo da seção de frequência será implementado aqui</p>
          </div>
        )}

        {activeTab === "relatorios" && (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Relatórios</h3>
            <p className="text-muted-foreground">Conteúdo da seção de relatórios será implementado aqui</p>
          </div>
        )}
      </main>
    </div>
  )
}

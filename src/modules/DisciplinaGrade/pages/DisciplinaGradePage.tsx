"use client"

import { useState } from "react"
import { BookOpen, User } from "lucide-react"
import DisciplinasTable from "../components/DisciplinasTable"
import GradeCurricularCard from "../components/GradeCurricularCard"
import ScheduleGrid from "../components/ScheduleGrid"

type TabType = "dashboard" | "disciplinas-grade" | "professores" | "alunos" | "projetos" | "relatorios" | "qualidade"

export default function DisciplinaGradePage() {
  const [activeTab, setActiveTab] = useState<TabType>("disciplinas-grade")

  const tabs = [
    { id: "dashboard" as TabType, label: "Dashboard" },
    { id: "disciplinas-grade" as TabType, label: "Disciplinas & Grade" },
    { id: "professores" as TabType, label: "Professores" },
    { id: "alunos" as TabType, label: "Alunos" },
    { id: "projetos" as TabType, label: "Projetos" },
    { id: "relatorios" as TabType, label: "Relatórios" },
    { id: "qualidade" as TabType, label: "Qualidade" },
  ]

  const disciplinas = [
    {
      nome: "Algoritmos e Estruturas de Dados",
      creditos: 4,
      tipo: "Obrigatória" as const,
      professor: "Prof. Maria Santos",
      periodo: "3º",
      status: "Ativa" as const,
    },
    {
      nome: "Inteligência Artificial",
      creditos: 4,
      tipo: "Optativa" as const,
      professor: "Prof. João Silva",
      periodo: "7º",
      status: "Pendente" as const,
    },
    {
      nome: "Banco de Dados",
      creditos: 4,
      tipo: "Obrigatória" as const,
      professor: "Prof. Ana Costa",
      periodo: "5º",
      status: "Ativa" as const,
    },
  ]

  const schedule = [
    {
      day: "Segunda-feira",
      slots: [
        { time: "08:00", subject: "Algoritmos", room: "Sala 101" },
        { time: "10:00", subject: "Banco de Dados", room: "Lab 1" },
        { time: "14:00", subject: "IA", room: "Sala 203" },
      ],
    },
    {
      day: "Terça-feira",
      slots: [
        { time: "08:00", subject: "Eng. Software", room: "Sala 102" },
        { time: "10:00", subject: "Redes", room: "Lab 2" },
      ],
    },
    {
      day: "Quarta-feira",
      slots: [
        { time: "08:00", subject: "Cálculo II", room: "Sala 201" },
        { time: "14:00", subject: "Projeto Final", room: "Lab 3" },
      ],
    },
  ]

  const handleEdit = (disciplina: any) => {
    console.log("[v0] Editar disciplina:", disciplina)
  }

  const handleEmenta = (disciplina: any) => {
    console.log("[v0] Ver ementa:", disciplina)
  }

  const handleExportar = () => {
    console.log("[v0] Exportar grade")
  }

  const handleGerenciar = () => {
    console.log("[v0] Gerenciar horários")
  }

  const handleNovaDisciplina = () => {
    console.log("[v0] Nova disciplina")
  }

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
                <h1 className="text-xl font-bold text-foreground">Coordenação de Curso</h1>
                <p className="text-sm text-muted-foreground">Ciência da Computação</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium">Prof. Dr. Ana Silva</p>
                <p className="text-xs text-muted-foreground">Coordenadora</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex gap-1 -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
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
        {activeTab === "disciplinas-grade" && (
          <>
            <h2 className="text-2xl font-bold text-foreground mb-8">Gestão de Disciplinas e Grade Curricular</h2>

            {/* Disciplinas e Grade Curricular */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Disciplinas do Curso */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold text-foreground">Disciplinas do Curso</h3>
                    <button
                      onClick={handleNovaDisciplina}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      + Nova Disciplina
                    </button>
                  </div>
                  <div className="p-6">
                    <DisciplinasTable disciplinas={disciplinas} onEdit={handleEdit} onEmenta={handleEmenta} />
                  </div>
                </div>
              </div>

              {/* Grade Curricular */}
              <div>
                <GradeCurricularCard
                  cargaHorariaTotal="3.200h"
                  disciplinasObrigatorias={32}
                  disciplinasOptativas={13}
                  onExportar={handleExportar}
                />
              </div>
            </div>

            {/* Gestão de Horários */}
            <ScheduleGrid schedule={schedule} onGerenciar={handleGerenciar} />
          </>
        )}

        {activeTab === "dashboard" && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
            <p className="text-muted-foreground">Conteúdo do dashboard será implementado aqui</p>
          </div>
        )}

        {activeTab === "professores" && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Professores</h3>
            <p className="text-muted-foreground">Conteúdo da seção de professores será implementado aqui</p>
          </div>
        )}

        {activeTab === "alunos" && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Alunos</h3>
            <p className="text-muted-foreground">Conteúdo da seção de alunos será implementado aqui</p>
          </div>
        )}

        {activeTab === "projetos" && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Projetos</h3>
            <p className="text-muted-foreground">Conteúdo da seção de projetos será implementado aqui</p>
          </div>
        )}

        {activeTab === "relatorios" && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Relatórios</h3>
            <p className="text-muted-foreground">Conteúdo da seção de relatórios será implementado aqui</p>
          </div>
        )}

        {activeTab === "qualidade" && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Qualidade</h3>
            <p className="text-muted-foreground">Conteúdo da seção de qualidade será implementado aqui</p>
          </div>
        )}
      </main>
    </div>
  )
}

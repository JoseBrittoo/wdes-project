"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { ProjectCard } from "../components/ProjectCard"
import { ProjectStats } from "../components/ProjectStats"

export default function ProjetosPage() {
  const projetos = [
    {
      titulo: "Sistema de Gestão Acadêmica",
      tipo: "Projeto de Extensão",
      professor: "Prof. Maria Santos",
      descricao: "Desenvolvimento de sistema para automatizar processos acadêmicos da instituição.",
      participantes: 8,
      prazo: "Dez/2024",
      status: "Aprovado" as const,
      progresso: 75,
    },
    {
      titulo: "IA para Diagnóstico Médico",
      tipo: "Projeto de Pesquisa",
      professor: "Prof. João Silva",
      descricao: "Aplicação de machine learning para auxiliar no diagnóstico de doenças cardiovasculares.",
      participantes: 5,
      prazo: "Mar/2025",
      status: "Em Análise" as const,
    },
    {
      titulo: "App Mobile para Estudantes",
      tipo: "Projeto de Extensão",
      professor: "Prof. Ana Costa",
      descricao: "Aplicativo para facilitar o acesso dos estudantes aos serviços acadêmicos.",
      participantes: 6,
      concluido: "Nov/2024",
      status: "Concluído" as const,
      progresso: 100,
    },
  ]

  const stats = [
    { value: 18, label: "Projetos Ativos", color: "green" as const },
    { value: 12, label: "Concluídos", color: "green" as const },
    { value: 5, label: "Em Análise", color: "yellow" as const },
    { value: 89, label: "Alunos Envolvidos", color: "purple" as const },
  ]

  const handleNovoProjeto = () => {
    console.log("[v0] Criar novo projeto")
  }

  const handleVerDetalhes = (projeto: any) => {
    console.log("[v0] Ver detalhes:", projeto)
  }

  const handleEditar = (projeto: any) => {
    console.log("[v0] Editar projeto:", projeto)
  }

  const handleAprovar = (projeto: any) => {
    console.log("[v0] Aprovar projeto:", projeto)
  }

  const handleRejeitar = (projeto: any) => {
    console.log("[v0] Rejeitar projeto:", projeto)
  }

  const handleVerRelatorio = (projeto: any) => {
    console.log("[v0] Ver relatório:", projeto)
  }

  const handleRelatorioGeral = () => {
    console.log("[v0] Gerar relatório geral de projetos")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-foreground mb-8">Gestão de Projetos</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projetos Ativos */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-foreground">Projetos Ativos</h3>
                <button
                  onClick={handleNovoProjeto}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center gap-2"
                >
                  <Plus size={16} />
                  Novo Projeto
                </button>
              </div>
              <CardContent className="p-6">
                {projetos.map((projeto, index) => (
                  <ProjectCard
                    key={index}
                    title={projeto.titulo}
                    type={projeto.tipo}
                    professor={projeto.professor}
                    description={projeto.descricao}
                    participants={projeto.participantes}
                    deadline={projeto.prazo}
                    concluded={projeto.concluido}
                    status={projeto.status}
                    progress={projeto.progresso}
                    onViewDetails={() => handleVerDetalhes(projeto)}
                    onEdit={() => handleEditar(projeto)}
                    onApprove={() => handleAprovar(projeto)}
                    onReject={() => handleRejeitar(projeto)}
                    onViewReport={() => handleVerRelatorio(projeto)}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <ProjectStats stats={stats} onGenerateReport={handleRelatorioGeral} />
          </div>
        </div>
      </main>
    </div>
  )
}

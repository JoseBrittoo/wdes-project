"use client"

import { Card, CardContent } from "../../dashboards/components/Card"
import { Download } from "lucide-react"

export default function AlunosPage() {
  const alunos = [
    {
      nome: "Maria do Carmo",
      matricula: "11111111111",
      periodo: "3º",
      status: "Ativa",
    },
    {
      nome: "João Silva",
      matricula: "11111111111",
      periodo: "7º",
      status: "Jubilado",
    },
    {
      nome: "Carmem Lúcia",
      matricula: "11111111111",
      periodo: "5º",
      status: "Ativa",
    },
  ]

  const handleExportar = () => {
    console.log("[v0] Exportar dados de alunos")
  }

  const handleVerPerfil = (aluno: any) => {
    console.log("[v0] Ver perfil:", aluno)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-foreground mb-8">Gestão de Alunos</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alunos por Período */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-foreground">Alunos por Período</h3>
                <div className="flex items-center gap-3">
                  {/* Filtro de Curso */}
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Lic. em Computação</option>
                    <option>Eng. de Computação</option>
                    <option>Sistemas de Informação</option>
                  </select>

                  {/* Filtro de Período */}
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>2025/2</option>
                    <option>2025/1</option>
                    <option>2024/2</option>
                  </select>

                  {/* Botão Exportar */}
                  <button
                    onClick={handleExportar}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center gap-2"
                  >
                    <Download size={16} />
                    Exportar
                  </button>
                </div>
              </div>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Aluno</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Matrícula</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Período</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alunos.map((aluno, index) => (
                        <tr key={index} className="border-b last:border-0 hover:bg-slate-50">
                          <td className="py-3 px-4 text-sm text-foreground">{aluno.nome}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{aluno.matricula}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{aluno.periodo}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{aluno.status}</td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleVerPerfil(aluno)}
                              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                            >
                              Ver Perfil
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Estatísticas */}
          <div>
            <Card>
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-foreground">Estatísticas</h3>
              </div>
              <CardContent>
                <div className="space-y-4">
                  {/* Total de Alunos */}
                  <div className="bg-green-50 p-6 rounded-lg text-center">
                    <p className="text-4xl font-bold text-green-600">200</p>
                    <p className="text-sm text-green-700 mt-1">Total de Alunos</p>
                  </div>

                  {/* Taxa de Retenção */}
                  <div className="bg-green-50 p-6 rounded-lg text-center">
                    <p className="text-4xl font-bold text-green-600">12</p>
                    <p className="text-sm text-green-700 mt-1">Taxa de Retenção</p>
                  </div>

                  {/* Alunos em Risco de Jubilamento */}
                  <div className="bg-yellow-50 p-6 rounded-lg text-center">
                    <p className="text-4xl font-bold text-yellow-600">5</p>
                    <p className="text-sm text-yellow-700 mt-1">Alunos em Risco de Jubilamento</p>
                  </div>

                  {/* Alunos Concluintes */}
                  <div className="bg-purple-50 p-6 rounded-lg text-center">
                    <p className="text-4xl font-bold text-purple-600">89</p>
                    <p className="text-sm text-purple-700 mt-1">Alunos Concluintes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

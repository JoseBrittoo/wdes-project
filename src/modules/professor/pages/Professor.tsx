"use client"

import { Card, CardContent } from "../../dashboards/components/Card";

export default function ProfessoresPage() {
  const professores = [
    {
      nome: "Maria do Carmo",
      matricula: "11111111111",
      carga: "20h",
      curso: "SI",
    },
    {
      nome: "João Silva",
      matricula: "11111111111",
      carga: "18h",
      curso: "ENG. COMP",
    },
    {
      nome: "Carmem Lúcia",
      matricula: "11111111111",
      carga: "22h",
      curso: "LICOMP",
    },
  ]

  const handleNovoProfessor = () => {
    console.log("[v0] Adicionar novo professor")
  }

  const handleVerPerfil = (professor: any) => {
    console.log("[v0] Ver perfil:", professor)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-foreground mb-8">Gestão de Professores</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Corpo Docente */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-foreground">Corpo Docente</h3>
                <button
                  onClick={handleNovoProfessor}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  + Novo Professor
                </button>
              </div>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Professor</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Matrícula</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Carga</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Curso</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {professores.map((professor, index) => (
                        <tr key={index} className="border-b last:border-0 hover:bg-slate-50">
                          <td className="py-3 px-4 text-sm text-foreground">{professor.nome}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{professor.matricula}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{professor.carga}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{professor.curso}</td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleVerPerfil(professor)}
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
                  {/* Total de Professores */}
                  <div className="bg-green-50 p-6 rounded-lg text-center">
                    <p className="text-4xl font-bold text-green-600">200</p>
                    <p className="text-sm text-green-700 mt-1">Total de Professores</p>
                  </div>

                  {/* Carga Média */}
                  <div className="bg-green-50 p-6 rounded-lg text-center">
                    <p className="text-4xl font-bold text-green-600">18.5h</p>
                    <p className="text-sm text-green-700 mt-1">Carga Média</p>
                  </div>

                  {/* Avaliação Média */}
                  <div className="bg-yellow-50 p-6 rounded-lg text-center">
                    <p className="text-4xl font-bold text-yellow-600">5</p>
                    <p className="text-sm text-yellow-700 mt-1">Avaliação Média</p>
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

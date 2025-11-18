import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DisciplinasTable from "./../components/DisciplinasTable";
import GradeCurricularCard from "./../components/GradeCurricularCard";
import ScheduleGrid from "./../components/ScheduleGrid";


export default function DisciplinaGradePage() {
  const navigate = useNavigate();

  const [disciplinas, setDisciplinas] = useState([
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
  ]);
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
  ];

  const handleNovaDisciplina = () => {
    navigate("/professor/adicionar-disciplina");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-foreground mb-8">
          Gestão de Disciplinas e Grade Curricular
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-foreground">
                  Disciplinas do Curso
                </h3>
                <button
                  onClick={handleNovaDisciplina}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  + Nova Disciplina
                </button>
              </div>

              <div className="p-6">
                <DisciplinasTable
                  disciplinas={disciplinas}
                  onEdit={(d) => console.log("Editar:", d)}
                  onEmenta={(d) => console.log("Ementa:", d)}
                />
              </div>
            </div>
          </div>

          <div>
            <GradeCurricularCard
              cargaHorariaTotal="3.200h"
              disciplinasObrigatorias={32}
              disciplinasOptativas={13}
              onExportar={() => console.log("Exportar")}
            />
          </div>
        </div>

        <ScheduleGrid schedule={schedule} onGerenciar={() => console.log("Gerenciar horários")} />
      </main>
    </div>
  );
}
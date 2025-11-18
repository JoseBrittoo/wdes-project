import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

export default function AddDisciplinaPage() {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState<any[]>([]);
  const [professores, setProfessores] = useState<any[]>([]);

  // Campos do formulário
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [professorId, setProfessorId] = useState<string | null>(null);
  const [semester, setSemester] = useState<number>(1);
  const [tipo, setTipo] = useState("Obrigatória");

  useEffect(() => {
    fetchSubjects();
    fetchProfessores();
  }, []);

  // Buscar disciplinas do banco
  const fetchSubjects = async () => {
    const { data, error } = await supabase.from("subjects").select("*");
    if (!error) setSubjects(data);
  };

  // Buscar professores (profiles com profile = professor)
  const fetchProfessores = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, profile")
      .eq("profile", "professor");

    if (!error) setProfessores(data);
  };

  // Enviar para o Supabase
  const handleAddDisciplina = async () => {
    if (!subjectId || !professorId) {
      alert("Selecione a disciplina e o professor");
      return;
    }

    const { data, error } = await supabase.from("course_subjects").insert([
      {
        course_id: 1, // Se quiser depois deixamos dinâmico
        subject_id: subjectId,
        professor_id: professorId,
        semester: semester,
        prerequisites: [],
        tipo: tipo,
      },
    ]);

    if (error) {
      console.error("ERRO SUPABASE:", error);
      alert("Erro ao adicionar disciplina:" +error.message);
      return
    } else {
      alert("Disciplina adicionada com sucesso!");
      navigate("/disciplinas-grade");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-foreground mb-8">
          Adicionar Nova Disciplina
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* NOME DA DISCIPLINA */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Nome da Disciplina
            </label>
            <select
              className="border p-2 rounded w-full"
              value={subjectId ?? ""}
              onChange={(e) => setSubjectId(Number(e.target.value))}
            >
              <option value="">Selecione...</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* TIPO */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Tipo</label>
            <select
              className="border p-2 rounded w-full"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="Obrigatória">Obrigatória</option>
              <option value="Optativa">Optativa</option>
            </select>
          </div>

          {/* PROFESSOR */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Professor
            </label>
            <select
              className="border p-2 rounded w-full"
              value={professorId ?? ""}
              onChange={(e) => setProfessorId(e.target.value)}
            >
              <option value="">Selecione...</option>
              {professores.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* PERÍODO */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Período (1º ao 10º)
            </label>
            <select
              className="border p-2 rounded w-full"
              value={semester}
              onChange={(e) => setSemester(Number(e.target.value))}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}º
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* BOTÕES */}
        <div className="flex gap-4 mt-10">
          <button
            onClick={handleAddDisciplina}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
          >
            Confirmar
          </button>

          <button
            onClick={() => navigate("/disciplinas-grade")}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg"
          >
            Cancelar
          </button>
        </div>
      </main>
    </div>
  );
}

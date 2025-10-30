import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import type { ProjectType } from "../types/ProjectType";
import { Button, CancelButton } from "../../../components/Button";

export const unidades = [
  "Escola Superior de Desenvolvimento",
  "Escola Superior de Biologia",
  "Escola Superior de Engenharia",
  "Escola Superior de Administração",
];

export const tiposProjeto: { value: ProjectType; label: string }[] = [
  { value: "monitoria", label: "Monitoria" },
  { value: "iniciacao-cientifica", label: "Iniciação Científica" },
  { value: "extensao", label: "Extensão" },
];

export default function CadastrarProjetoPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: "",
    editalAbertura: "",
    unidade: "",
    inicioInscricao: "",
    terminoInscricao: "",
    tipo: "" as ProjectType,
    linkEdital: "",
    descricao: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Form submitted:", formData);

    const { error } = await supabase.from("projects").insert([
      {
        nome_edital: formData.titulo,
        unidade: formData.unidade,
        inicio_inscricoes: formData.inicioInscricao,
        fim_inscricoes: formData.terminoInscricao,
        tipo_projeto: formData.tipo,
        link_edital: formData.linkEdital,
        descricao: formData.descricao,
      },
    ]);

    if (error) {
      console.error("Erro ao cadastrar projeto:", error.message);
      return;
    }

    window.location.href = "/projetos";
  };

  const handleCancel = () => {
    window.location.href = "/projetos";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-8">
        <button
          onClick={() => navigate("/projetos")}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Projetos
        </button>

        <h1 className="text-3xl font-bold mb-8">Projetos Acadêmicos</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-6"
        >
          <div className="space-y-2">
            <label htmlFor="titulo" className="block font-medium">
              Título do Projeto <span className="text-red-500">*</span>
            </label>
            <input
              id="titulo"
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Ex: Edital Pibiti 2025/2"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
              required
            />
          </div>

          {/* <div className="space-y-2">
            <label htmlFor="editalAbertura" className="block font-medium">
              Edital de Abertura <span className="text-red-500">*</span>
            </label>
            <input
              id="editalAbertura"
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Ex: EDITAL 01/2025-2"
              value={formData.editalAbertura}
              onChange={(e) =>
                setFormData({ ...formData, editalAbertura: e.target.value })
              }
              required
            />
          </div> */}

          <div className="space-y-2">
            <label htmlFor="unidade" className="block font-medium">
              Unidade de Ensino <span className="text-red-500">*</span>
            </label>
            <select
              id="unidade"
              className="w-full border rounded px-3 py-2"
              value={formData.unidade}
              onChange={(e) =>
                setFormData({ ...formData, unidade: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Selecione a unidade
              </option>
              {unidades.map((unidade) => (
                <option key={unidade} value={unidade}>
                  {unidade}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="inicioInscricao" className="block font-medium">
                Início das Inscrições <span className="text-red-500">*</span>
              </label>
              <input
                id="inicioInscricao"
                type="date"
                className="w-full border rounded px-3 py-2"
                value={formData.inicioInscricao}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    inicioInscricao: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="terminoInscricao" className="block font-medium">
                Fim das Inscrições <span className="text-red-500">*</span>
              </label>
              <input
                id="terminoInscricao"
                type="date"
                className="w-full border rounded px-3 py-2"
                value={formData.terminoInscricao}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    terminoInscricao: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="tipo" className="block font-medium">
              Tipo de Projeto <span className="text-red-500">*</span>
            </label>
            <select
              id="tipo"
              className="w-full border rounded px-3 py-2"
              value={formData.tipo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tipo: e.target.value as ProjectType,
                })
              }
              required
            >
              <option value="" disabled>
                Selecione o tipo
              </option>
              {tiposProjeto.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="linkEdital" className="block font-medium">
              Link do Edital <span className="text-red-500">*</span>
            </label>
            <input
              id="linkEdital"
              type="url"
              className="w-full border rounded px-3 py-2"
              placeholder="https://exemplo.com/edital"
              value={formData.linkEdital}
              onChange={(e) =>
                setFormData({ ...formData, linkEdital: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="descricao" className="block font-medium">
              Descrição adicional
            </label>
            <textarea
              id="descricao"
              className="w-full border rounded px-3 py-2"
              placeholder="Informações adicionais sobre o projeto"
              rows={4}
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <CancelButton type="button" onClick={handleCancel}>
              Cancelar
            </CancelButton>
            <Button type="submit">Cadastrar Projeto</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import { Button, CancelButton } from "../../../components/Button";
import { ArrowLeft } from "lucide-react";
import type { Event } from "../types/EventsType";

const EventForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Event>({
    name: "",
    location: "",
    date: "",
    time: "",
    description: "",
    event_link: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("events").insert([
        {
          ...formData,
        },
      ]);

      if (error) {
        console.error("Erro detalhado:", error);
        if (error.message.includes("row-level security")) {
          alert("Erro de permissão. Verifique as configurações de segurança.");
        } else {
          alert(`Erro ao cadastrar evento: ${error.message}`);
        }
      } else {
        alert("Evento cadastrado com sucesso");
        navigate("/eventos");
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      alert("Erro inesperado. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-8">
        <button
          onClick={() => navigate("/eventos")}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Eventos
        </button>

        <h1 className="text-3xl font-bold mb-8">Cadastro de Evento</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-6"
        >
          <div className="space-y-2">
            <label htmlFor="name" className="block font-medium">
              Nome do Evento <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Ex: Palestra sobre IA"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="block font-medium">
              Local do Evento <span className="text-red-500">*</span>
            </label>
            <input
              id="location"
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Ex: UDA setor norte Sala B"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="date" className="block font-medium">
                Data do Evento <span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                type="date"
                className="w-full border rounded px-3 py-2"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="time" className="block font-medium">
                Horário do Evento <span className="text-red-500">*</span>
              </label>
              <input
                id="time"
                type="time"
                className="w-full border rounded px-3 py-2"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="event_link" className="block font-medium">
              Link do Evento
            </label>
            <input
              id="event_link"
              type="url"
              className="w-full border rounded px-3 py-2"
              placeholder="Ex: https://link-do-evento.com"
              value={formData.event_link}
              onChange={(e) =>
                setFormData({ ...formData, event_link: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block font-medium">
              Descrição do Evento
            </label>
            <textarea
              id="description"
              className="w-full border rounded px-3 py-2 min-h-[100px]"
              placeholder="Descreva os detalhes do evento..."
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <CancelButton type="button" onClick={() => navigate("/eventos")}>
              Cancelar
            </CancelButton>
            <Button type="submit">Cadastrar Evento</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;

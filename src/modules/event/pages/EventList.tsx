import { useEffect, useState } from "react";
import { supabase } from "./../../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button, InfoButton } from "../../../components/Button";

export default function EventList() {
  const [events, setEvents] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");
      if (error) {
        console.error("Erro ao buscar eventos", error);
      } else {
        setEvents(data || []);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">Eventos</h1>
          <div className="flex-shrink-0">
            <Button onClick={() => navigate("/eventos/cadastrar")}>
              Novo Evento
            </Button>
          </div>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: any) => (
              <div
                key={event.id}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col"
              >
                <div className="flex justify-center items-center h-40 bg-gradient-to-br from-[#E2e0af] to-[#E2e0af] rounded-lg mb-4">
                  <span className="text-6xl">🎉</span>
                </div>

                <h3 className="text-xl font-semibold text-gray-800">
                  {event.name}
                </h3>

                <div className="mt-2 text-gray-600">
                  <p className="text-sm mb-2">
                    <strong> Data:</strong>{" "}
                    {new Date(event.date).toLocaleDateString("pt-BR")}
                  </p>
                  <p className="text-sm mb-2">
                    <strong> Horário:</strong> {event.time}
                  </p>
                  <p className="text-sm mb-2">
                    <strong> Local:</strong> {event.location}
                  </p>
                  <p className="text-sm mb-4">
                    <strong> Descrição:</strong> {event.description}
                  </p>
                </div>

                <InfoButton onClick={() => navigate(`/eventos/${event.id}`)}>
                  Mais Detalhes
                </InfoButton>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              Nenhum evento encontrado
            </div>
            <p className="text-gray-400 mb-6">
              Comece criando seu primeiro evento!
            </p>
            <Button onClick={() => navigate("/eventos/cadastrar")}>
              Criar Primeiro Evento
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

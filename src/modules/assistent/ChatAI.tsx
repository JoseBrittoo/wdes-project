import { useState } from "react";
import axios from "axios";
import { Button } from "../../components/Button";

const fetchAIResponse = async (message: string) => {
  const apiKey = "SUA_CHAVE_API_OPENAI";
  const prompt = `Você é um assistente inteligente. Responda de forma clara e objetiva. Usuário disse: ${message}`;

  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  return response.data.choices[0].text.trim();
};

const ChatAI = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return; // Não envia mensagens vazias

    setMessages([...messages, `Você: ${userMessage}`]);

    const aiResponse = await fetchAIResponse(userMessage);

    setMessages((prevMessages) => [...prevMessages, `IA: ${aiResponse}`]);

    setUserMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
            <img
              src="./src/assets/logo.png"
              alt="Logo do Sistema"
              className="mx-auto w-24 h-24"
            />
          </div>

          <h2 className="text-2xl font-bold text-center mb-4">
            Bem-vindo ao chat com a IA
          </h2>
          <p className="text-center mb-6">
            Explore as perguntas sugeridas ou utilize a barra de conversa para
            criar suas próprias perguntas.
          </p>

          <div className="flex justify-center gap-4 mb-6">
            <button className="bg-pink-200 p-2 rounded-md text-black">
              Disciplinas Recomendadas
            </button>
            <button className="bg-yellow-200 p-2 rounded-md text-black">
              Projetos Sugeridos
            </button>
            <button className="bg-blue-200 p-2 rounded-md text-black">
              Cursos Sugeridos
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {messages.map((msg, index) => (
              <div key={index} className="p-2">
                <p
                  className={
                    msg.startsWith("Você") ? "text-blue-600" : "text-green-600"
                  }
                >
                  {msg}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center gap-2">
            <input
              type="text"
              className="flex-grow p-3 border border-gray-300 rounded-lg"
              placeholder="Digite sua mensagem"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />

            <div className="flex-shrink-0">
              <Button onClick={handleSendMessage}>Enviar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAI;

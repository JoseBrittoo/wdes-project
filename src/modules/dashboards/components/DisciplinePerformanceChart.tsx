import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function DisciplinePerformanceChart() {
  const data = [
    { name: "Algoritmos", media: 8.5 },
    { name: "Banco de Dados", media: 7.8 },
    { name: "IA", media: 9.2 },
    { name: "Redes", media: 7.5 },
    { name: "Eng. Software", media: 8.8 },
  ]

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Desempenho por Disciplina</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="media" fill="#14b8a6" radius={[8, 8, 0, 0]} name="Média da Turma" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

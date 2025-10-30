import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

export default function ApprovalRateChart() {
  const data = [
    { periodo: "1º", taxa: 92 },
    { periodo: "2º", taxa: 88 },
    { periodo: "3º", taxa: 85 },
    { periodo: "4º", taxa: 78 },
    { periodo: "5º", taxa: 82 },
    { periodo: "6º", taxa: 75 },
    { periodo: "7º", taxa: 72 },
    { periodo: "8º", taxa: 78 },
  ]

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Taxa de Aprovação por Período</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTaxa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="periodo" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="taxa"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="url(#colorTaxa)"
              name="Taxa de Aprovação (%)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

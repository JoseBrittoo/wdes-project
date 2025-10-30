"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Stat {
  value: number
  label: string
  color: "green" | "yellow" | "purple"
}

interface ProjectStatsProps {
  stats: Stat[]
  onGenerateReport?: () => void
}

export function ProjectStats({ stats, onGenerateReport }: ProjectStatsProps) {
  const getColorClasses = (color: "green" | "yellow" | "purple") => {
    switch (color) {
      case "green":
        return "bg-green-50 text-green-600"
      case "yellow":
        return "bg-yellow-50 text-yellow-600"
      case "purple":
        return "bg-purple-50 text-purple-600"
      default:
        return "bg-gray-50 text-gray-600"
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h3>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className={`p-4 rounded-lg ${getColorClasses(stat.color)}`}>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm mt-1">{stat.label}</div>
            </div>
          ))}
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={onGenerateReport}>
            Relatório Projetos
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

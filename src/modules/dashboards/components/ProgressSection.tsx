"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

interface ProgressItemProps {
  title: string;
  value: number;
  subtitle: string;
  detail: string;
  color: string;
}

const ProgressItem = ({
  title,
  value,
  subtitle,
  detail,
  color,
}: ProgressItemProps) => {
  const data = {
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: [color, "#E5E7EB"],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-col items-center w-60">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="relative w-36 h-36 mb-4">
        <Doughnut data={data} options={options} />
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
          {value}%
        </span>
      </div>
      <p className="text-sm font-medium">{subtitle}</p>
      <p className="text-sm text-gray-500">{detail}</p>
    </div>
  );
};

export default function ProgressSection() {
  const progressData = [
    {
      title: "Média Geral",
      value: 87,
      subtitle: "Excelente desempenho",
      detail: "8,7 de média",
      color: "#22C55E",
    },
    {
      title: "Progresso do Curso",
      value: 78,
      subtitle: "Créditos Concluídos",
      detail: "156 de 200 créditos",
      color: "#3B82F6",
    },
    {
      title: "Atividades Extras",
      value: 60,
      subtitle: "",
      detail: "120 de 200 horas",
      color: "#A855F7",
    },
  ];

  return (
    <section className="bg-white rounded-lg shadow-md p-8 mt-10">
      <h2 className="text-lg font-semibold mb-8">Progresso no Curso</h2>

      <div className="flex flex-wrap justify-around gap-6">
        {progressData.map((item, index) => (
          <ProgressItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
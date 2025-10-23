import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, type ChartOptions } from "chart.js";
import { useEffect, useRef } from "react";

// Registrando os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const semesterData = [
  { semester: "1º Sem", average: 8.9 },
  { semester: "2º Sem", average: 8.3 },
  { semester: "3º Sem", average: 7.5 },
  { semester: "4º Sem", average: 6.8 },
  { semester: "5º Sem", average: 7.2 },
];

const performanceData = [
  { subject: "Banco de Dados", grade: 8.5 },
  { subject: "Didática I", grade: 7.8 },
  { subject: "Matemática Discreta", grade: 6.9 },
  { subject: "Cálculo I", grade: 6.2 },
];

const barChartData = {
  labels: performanceData.map((data) => data.subject),
  datasets: [
    {
      label: "Desempenho por Disciplina",
      data: performanceData.map((data) => data.grade),
      backgroundColor: "rgba(16, 185, 129, 0.5)",
      borderColor: "rgb(16, 185, 129)",
      borderWidth: 1,
    },
  ],
};

const lineChartData = {
  labels: semesterData.map((data) => data.semester),
  datasets: [
    {
      label: "Média de Notas por Semestre",
      data: semesterData.map((data) => data.average),
      borderColor: "#8b5cf6",
      backgroundColor: "rgba(139, 92, 246, 0.2)",
      fill: true,
      tension: 0.4,
      borderWidth: 2,
    },
  ],
};

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: (context) => `Valor: ${context.raw}`,
      },
    },
  },
  scales: {
    y: {
      min: 0,
      max: 10,
    },
  },
};

const CombinedCharts = () => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.chartInstance?.destroy();
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">Desempenho por Disciplina</h3>
        </div>
        <div className="p-6">
          <Bar ref={chartRef} data={barChartData} options={options} />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">Média de Notas por Semestre</h3>
        </div>
        <div className="p-6">
          <Line ref={chartRef} data={lineChartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CombinedCharts;

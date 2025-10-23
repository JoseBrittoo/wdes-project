import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem: any) {
          return `Nota: ${tooltipItem.raw}`;
        },
      },
    },
  },
};

const ChartBar = () => {
  return (
    <div className="w-full h-[300px]">
      <Bar data={barChartData} options={options} />
    </div>
  );
};

export default ChartBar;

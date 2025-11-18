import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinancialTrendsChart = ({ transactions }) => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


  const [filter, setFilter] = useState("Month");


  const monthlyIncome = Array(12).fill(0);
  const monthlyExpense = Array(12).fill(0);

  transactions.forEach((t) => {
    const monthIndex = new Date(t.date).getMonth();
    if (t.type === "Income") {
      monthlyIncome[monthIndex] += t.amount;
    } else if (t.type === "Expense") {
      monthlyExpense[monthIndex] += t.amount;
    }
  });

  // Group data based on filter
  let labels = [];
  let incomeData = [];
  let expenseData = [];

  if (filter === "Month") {
    labels = months;
    incomeData = monthlyIncome;
    expenseData = monthlyExpense;
  } else if (filter === "Quarter") {
    labels = ["Q1", "Q2", "Q3", "Q4"];
    for (let i = 0; i < 4; i++) {
      const start = i * 3;
      const end = start + 3;
      incomeData.push(monthlyIncome.slice(start, end).reduce((a, b) => a + b, 0));
      expenseData.push(monthlyExpense.slice(start, end).reduce((a, b) => a + b, 0));
    }
  } else if (filter === "Year") {
    labels = ["Year"];
    incomeData = [monthlyIncome.reduce((a, b) => a + b, 0)];
    expenseData = [monthlyExpense.reduce((a, b) => a + b, 0)];
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(54, 162, 235, 0.6)", 
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.6)", 
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
  y: {
    beginAtZero: true,
    ticks: {
      stepSize: 1000,
      callback: function (value) {
        if (value >= 1000) {
          return value / 1000 + "k"; 
        }
        return value;
      },
    },
    grid: { drawBorder: false },
  },
  x: {
    grid: { display: false },
  },
}};


  return (
    <div className="h-96">
      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setFilter("Year")}
          className={`px-3 py-1 rounded ${filter === "Year" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Year
        </button>
        <button
          onClick={() => setFilter("Quarter")}
          className={`px-3 py-1 rounded ${filter === "Quarter" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Quarter
        </button>
        <button
          onClick={() => setFilter("Month")}
          className={`px-3 py-1 rounded ${filter === "Month" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Month
        </button>
      </div>

      {/* Chart */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default FinancialTrendsChart;

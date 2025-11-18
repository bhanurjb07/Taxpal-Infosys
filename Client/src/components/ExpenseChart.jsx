import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ transactions }) => {
  // Only expenses
  const expenses = transactions.filter((t) => t.type === "Expense");

  // Group by category
  const dataByCategory = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const categories = Object.keys(dataByCategory);
  const amounts = Object.values(dataByCategory);
  const total = amounts.reduce((a, b) => a + b, 0);

  // Calculate percentages
  const percentages = amounts.map((amt) =>
    ((amt / total) * 100).toFixed(0) // round to whole %
  );

  const colors = [
    "#36A2EB", // Rent/Mortgage
    "#4BC0C0", // Business
    "#FFCD56", // Utilities
    "#FF6384", // Food
    "#9966FF", // Other
  ];

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Expenses",
        data: amounts,
        backgroundColor: colors,
        borderColor: "#ffffff",
        borderWidth: 4,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <div className="h-64 w-64">
        <Doughnut
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%", 
            plugins: {
              legend: { display: false }, 
            },
          }}
        />
      </div>

      <div className="mt-4 w-full">
        {categories.map((cat, i) => (
          <div
            key={cat}
            className="flex justify-between items-center mb-2 text-sm"
          >
            <div className="flex items-center space-x-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[i % colors.length] }}
              ></span>
              <span>{cat}</span>
            </div>
            <span className="font-semibold">{percentages[i]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseChart;

import { useState, useEffect } from "react";
import { API } from "../api";
import { FileText, FileSpreadsheet, ClipboardList, X, TrendingUp, BarChart3 } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Report() {
  const [activeTab, setActiveTab] = useState("monthly");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fiers
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");

  //  Backend Dat
  const [financialData, setFinancialData] = useState([]);
  const [quarterlyData, setQuarterlyData] = useState([]);

  //  data from  MongoDB API
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Monthl
    fetch(`${API}/api/reports/monthly`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setFinancialData(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error fetching monthly reports:", err);
        setFinancialData([]);
      });

    // Quaterly
    fetch(`${API}/api/reports/quarterly`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setQuarterlyData(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error fetching quarterly reports:", err);
        setQuarterlyData([]);
      });
  }, []);

  // filters
  const filteredMonthlyData = selectedMonth
    ? financialData.filter((item) => item.month === selectedMonth)
    : financialData;

  const filteredQuarterlyData = selectedQuarter
    ? quarterlyData.filter((item) => item.quarter === selectedQuarter)
    : quarterlyData;

  //  Generate PDF with tables + totals
  const downloadPDF = () => {
  const doc = new jsPDF();

  doc.setDrawColor(0, 0, 0);
  doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10);


  const pageWidth = doc.internal.pageSize.width;
  doc.setFillColor(41, 128, 185); 
  doc.rect(0, 0, pageWidth, 20, "F"); 


  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("Annual Financial Report", pageWidth / 2, 16, { align: "center" });

  doc.setTextColor(0, 0, 0);

  // Monthly Table
  doc.setFontSize(14);
  doc.text("Monthly Summaries", pageWidth / 2, 40, { align: "center" });
  autoTable(doc, {
    startY: 46,
    margin: { left: 25, right: 25 }, 
    styles: { halign: "center" },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    body: filteredMonthlyData.map((item) => [
      item.month,
      `INR ${item.income.toLocaleString("en-IN")}`,
      `INR ${item.expense.toLocaleString("en-IN")}`,
      `INR ${item.net.toLocaleString("en-IN")}`,
    ]),
    head: [["Month", "Income", "Expense", "Net Savings"]],
    foot: [[
      "TOTAL",
      `INR ${filteredMonthlyData.reduce((s, i) => s + i.income, 0).toLocaleString("en-IN")}`,
      `INR ${filteredMonthlyData.reduce((s, i) => s + i.expense, 0).toLocaleString("en-IN")}`,
      `INR ${filteredMonthlyData.reduce((s, i) => s + i.net, 0).toLocaleString("en-IN")}`,
    ]],
    footStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold" },
  });


  let finalY = doc.lastAutoTable.finalY + 15;
  doc.text("Quarterly Summaries", pageWidth / 2, finalY, { align: "center" });
  autoTable(doc, {
    startY: finalY + 6,
    margin: { left: 25, right: 25 },
    styles: { halign: "center" },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    body: filteredQuarterlyData.map((item) => [
      item.quarter,
      `INR ${item.income.toLocaleString("en-IN")}`,
      `INR ${item.expense.toLocaleString("en-IN")}`,
      `INR ${item.net.toLocaleString("en-IN")}`,
    ]),
    head: [["Quarter", "Income", "Expense", "Net Savings"]],
    foot: [[
      "TOTAL",
      `INR ${filteredQuarterlyData.reduce((s, i) => s + i.income, 0).toLocaleString("en-IN")}`,
      `INR ${filteredQuarterlyData.reduce((s, i) => s + i.expense, 0).toLocaleString("en-IN")}`,
      `INR ${filteredQuarterlyData.reduce((s, i) => s + i.net, 0).toLocaleString("en-IN")}`,
    ]],
    footStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold" },
  });

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth - 30,
      doc.internal.pageSize.height - 10
    );
  }

  doc.save("Annual_Report.pdf");
};


  // Generate Excel
  const downloadExcel = () => {
    const wb = XLSX.utils.book_new();

    const addINR = (data) =>
      data.map((item) => ({
        ...item,
        income: `INR ${item.income.toLocaleString("en-IN")}`,
        expense: `INR ${item.expense.toLocaleString("en-IN")}`,
        net: `INR ${item.net.toLocaleString("en-IN")}`,
      }));

    const monthlySheet = XLSX.utils.json_to_sheet(
      filteredMonthlyData.length ? addINR(filteredMonthlyData) : addINR(financialData)
    );
    const quarterlySheet = XLSX.utils.json_to_sheet(
      filteredQuarterlyData.length ? addINR(filteredQuarterlyData) : addINR(quarterlyData)
    );

    XLSX.utils.book_append_sheet(wb, monthlySheet, "Monthly");
    XLSX.utils.book_append_sheet(wb, quarterlySheet, "Quarterly");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Annual_Report.xlsx");
  };

  //  Modal
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Financial Report</h1>

      {/* Filters & Export Buttons */}
      <div className="flex items-center gap-3">
        {activeTab === "monthly" && (
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-48 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <option value="" className="text-black">All Months</option>
            {financialData.map((item) => (
              <option key={item.month} value={item.month} className="text-black">
                {item.month}
              </option>
            ))}
          </select>
        )}

        {activeTab === "quarterly" && (
          <select
            value={selectedQuarter}
            onChange={(e) => setSelectedQuarter(e.target.value)}
          className="w-48 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <option value="" className="text-black">All Quarters</option>
            {quarterlyData.map((item) => (
              <option key={item.quarter} value={item.quarter} className="text-black">
                {item.quarter}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          <FileText className="w-4 h-4" /> Download PDF
        </button>

        <button
          onClick={downloadExcel}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          <FileSpreadsheet className="w-4 h-4" /> Download Excel
        </button>
      </div>

      {/* Tabs */}
      <div className="w-full">
        <div className="grid grid-cols-2 w-1/2 bg-gray-200 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("monthly")}
            className={`px-4 py-2 rounded-md font-medium ${activeTab === "monthly" ? "bg-white shadow" : "text-gray-600"}`}
          >
            Monthly Summaries
          </button>
          <button
            onClick={() => setActiveTab("quarterly")}
            className={`px-4 py-2 rounded-md font-medium ${activeTab === "quarterly" ? "bg-white shadow" : "text-gray-600"}`}
          >
            Quarterly Summaries
          </button>
        </div>

        {/* Monthly Cards */}
        {activeTab === "monthly" && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMonthlyData.map((item, idx) => (
              <div key={idx} className="border bg-white rounded-2xl shadow-md p-4 space-y-3">
                <h3 className="text-md font-semibold">{item.month}</h3>
                <p className="text-gray-500 text-sm">Financial overview</p>
                <div className="space-y-1 text-sm">
                  <p>Income: <span className="text-green-600 font-semibold">₹{item.income.toLocaleString()}</span></p>
                  <p>Expense: <span className="text-red-600 font-semibold">₹{item.expense.toLocaleString()}</span></p>
                  <p>Net Savings: <span className="text-blue-600 font-semibold">₹{item.net.toLocaleString()}</span></p>
                </div>
                <button onClick={() => openModal(item)} className="flex items-center justify-center gap-2 border border-gray-400 rounded-lg w-full py-2 hover:bg-gray-100">
                  <ClipboardList className="w-4 h-4" /> View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Quarterly Cards */}
        {activeTab === "quarterly" && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuarterlyData.map((item, idx) => (
              <div key={idx} className="border bg-white rounded-2xl shadow-md p-4 space-y-3">
                <h3 className="text-md font-semibold">{item.quarter}</h3>
                <p className="text-gray-500 text-sm">Financial overview</p>
                <div className="space-y-1 text-sm">
                  <p>Income: <span className="text-green-600 font-semibold">₹{item.income.toLocaleString()}</span></p>
                  <p>Expense: <span className="text-red-600 font-semibold">₹{item.expense.toLocaleString()}</span></p>
                  <p>Net Savings: <span className="text-blue-600 font-semibold">₹{item.net.toLocaleString()}</span></p>
                </div>
                <button onClick={() => openModal(item)} className="flex items-center justify-center gap-2 border border-gray-400 rounded-lg w-full py-2 hover:bg-gray-100">
                  <ClipboardList className="w-4 h-4" /> View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Charts Tab */}
        {activeTab === "charts" && (
          <div className="mt-6 space-y-8">
            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Total Income</h3>
                </div>
                <p className="text-3xl font-bold text-green-600">
                  ₹{filteredMonthlyData.reduce((sum, item) => sum + item.income, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">Across all months</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-8 h-8 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Total Expenses</h3>
                </div>
                <p className="text-3xl font-bold text-red-600">
                  ₹{filteredMonthlyData.reduce((sum, item) => sum + item.expense, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">Across all months</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Net Savings</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  ₹{filteredMonthlyData.reduce((sum, item) => sum + item.net, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">Across all months</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Income vs Expense Bar Chart */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Income vs Expenses</h3>
                <div className="h-80">
                  <Bar
                    data={{
                      labels: filteredMonthlyData.map(item => item.month),
                      datasets: [
                        {
                          label: 'Income',
                          data: filteredMonthlyData.map(item => item.income),
                          backgroundColor: 'rgba(34, 197, 94, 0.8)',
                          borderColor: 'rgba(34, 197, 94, 1)',
                          borderWidth: 1,
                        },
                        {
                          label: 'Expenses',
                          data: filteredMonthlyData.map(item => item.expense),
                          backgroundColor: 'rgba(239, 68, 68, 0.8)',
                          borderColor: 'rgba(239, 68, 68, 1)',
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: function(value) {
                              return '₹' + value.toLocaleString();
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Net Savings Trend Line Chart */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Net Savings Trend</h3>
                <div className="h-80">
                  <Line
                    data={{
                      labels: filteredMonthlyData.map(item => item.month),
                      datasets: [
                        {
                          label: 'Net Savings',
                          data: filteredMonthlyData.map(item => item.net),
                          borderColor: 'rgba(59, 130, 246, 1)',
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          borderWidth: 3,
                          fill: true,
                          tension: 0.4,
                          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                          pointBorderColor: '#fff',
                          pointBorderWidth: 2,
                          pointRadius: 6,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: function(value) {
                              return '₹' + value.toLocaleString();
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Quarterly Comparison */}
            {filteredQuarterlyData.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quarterly Performance</h3>
                <div className="h-80">
                  <Bar
                    data={{
                      labels: filteredQuarterlyData.map(item => item.quarter),
                      datasets: [
                        {
                          label: 'Quarterly Income',
                          data: filteredQuarterlyData.map(item => item.income),
                          backgroundColor: 'rgba(34, 197, 94, 0.6)',
                          borderColor: 'rgba(34, 197, 94, 1)',
                          borderWidth: 1,
                        },
                        {
                          label: 'Quarterly Expenses',
                          data: filteredQuarterlyData.map(item => item.expense),
                          backgroundColor: 'rgba(239, 68, 68, 0.6)',
                          borderColor: 'rgba(239, 68, 68, 1)',
                          borderWidth: 1,
                        },
                        {
                          label: 'Quarterly Net Savings',
                          data: filteredQuarterlyData.map(item => item.net),
                          backgroundColor: 'rgba(59, 130, 246, 0.6)',
                          borderColor: 'rgba(59, 130, 246, 1)',
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: function(value) {
                              return '₹' + value.toLocaleString();
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedItem.month || selectedItem.quarter} - Details</h2>
            <div className="space-y-2 text-sm">
              <p>Income: <span className="text-green-600">₹{selectedItem.income.toLocaleString()}</span></p>
              <p>Expense: <span className="text-red-600">₹{selectedItem.expense.toLocaleString()}</span></p>
              <p>Net Savings: <span className="text-blue-600">₹{selectedItem.net.toLocaleString()}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

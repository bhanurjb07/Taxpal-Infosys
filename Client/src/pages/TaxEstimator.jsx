import React, { useState, useEffect } from "react";
import { FaUniversity, FaReceipt, FaTimes } from "react-icons/fa";
import { FiPercent } from "react-icons/fi";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { API } from "../api";

//tax estimationn
function calculateIndiaTax(income) {
  if (income <= 300000) return 0;
  if (income <= 600000) return (income - 300000) * 0.05;
  if (income <= 900000) return 15000 + (income - 600000) * 0.1;
  if (income <= 1200000) return 45000 + (income - 900000) * 0.15;
  if (income <= 1500000) return 90000 + (income - 1200000) * 0.2;
  return 150000 + (income - 1500000) * 0.3;
}

function calculateUSTax(income) {
  if (income <= 11000) return income * 0.1;
  if (income <= 44725) return 1100 + (income - 11000) * 0.12;
  if (income <= 95375) return 5147 + (income - 44725) * 0.22;
  if (income <= 182100) return 16290 + (income - 95375) * 0.24;
  if (income <= 231250) return 37104 + (income - 182100) * 0.32;
  if (income <= 578125) return 52832 + (income - 231250) * 0.35;
  return 174238 + (income - 578125) * 0.37;
}

function calculateUKTax(income) {
  if (income <= 12570) return 0;
  if (income <= 50270) return (income - 12570) * 0.2;
  if (income <= 125140) return 7540 + (income - 50270) * 0.4;
  return 7540 + 29948 + (income - 125140) * 0.45;
}

function calculateAustraliaTax(income) {
  if (income <= 18200) return 0;
  if (income <= 45000) return (income - 18200) * 0.19;
  if (income <= 120000) return 5092 + (income - 45000) * 0.325;
  if (income <= 180000) return 29467 + (income - 120000) * 0.37;
  return 51667 + (income - 180000) * 0.45;
}

function calculateTax(region, income) {
  switch (region) {
    case "India": return calculateIndiaTax(income);
    case "United States": return calculateUSTax(income);
    case "United Kingdom": return calculateUKTax(income);
    case "Australia": return calculateAustraliaTax(income);
    default: return income * 0.25;
  }
}


export default function TaxEstimator() {
  const [region, setRegion] = useState("India");
  const [status, setStatus] = useState("Single");
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [existingRecord, setExistingRecord] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const incomeNum = isNaN(parseFloat(income)) ? 0 : parseFloat(income);
  const deductionsNum = isNaN(parseFloat(deductions)) ? 0 : parseFloat(deductions);
  const taxableIncome = Math.max(incomeNum - deductionsNum, 0);
  const estimatedTax = calculateTax(region, taxableIncome);
  const effectiveRate =
    taxableIncome > 0 ? ((estimatedTax / taxableIncome) * 100).toFixed(1) : 0;

  const token = localStorage.getItem("token");

  const handleRecord = async () => {
    if (!token) {
      setNotification({ type: "error", message: "User not authenticated" });
      return;
    }
    try {
      const res = await fetch(`${API}/taxRoutes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch records");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setExistingRecord(data[0]); 
        setShowEditModal(true);
        return;
      }
    } catch (err) {
      console.error("Error checking records:", err);
      setNotification({ type: "error", message: "Error checking existing records" });
      return;
    }
    setShowModal(true);
  };

  const confirmRecord = async (update = false) => {
    try {
      const payload = {
        annualIncome: incomeNum,
        deductions: deductionsNum,
        taxableIncome,
        estimatedQuarterlyTaxes: estimatedTax / 4,
        estimatedTax,
        region,
        status,
      };

      const url = update && existingRecord?._id
        ? `${API}/taxRoutes/${existingRecord._id}`
        : `${API}/taxRoutes`;
      const method = update ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to record income");

      setShowModal(false);
      setShowEditModal(false);
      setNotification({
        type: "success",
        message: update ? "Income updated successfully!" : "Income recorded successfully!",
      });
      setExistingRecord(payload);
    } catch (error) {
      console.error(error);
      setNotification({ type: "error", message: "Error recording income. Try again." });
    }
  };

  const closeModal = () => setShowModal(false);
  const closeEditModal = () => setShowEditModal(false);
  const closeNotification = () => setNotification(null);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">

      <h1 className="text-2xl font-bold text-gray-800">Tax Estimation</h1>
      <p className="text-gray-500">
        Estimate your Tax Liabilities based on your financial data and chosen profile.
      </p>

      {/* Tax Profile */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Your Tax Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tax Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="mt-1 w-full border px-3 py-2 rounded-md"
            >
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Australia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Filing Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 w-full border px-3 py-2 rounded-md"
            >
              <option>Single</option>
              <option>Married</option>
              <option>Business</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Enter Your Financials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Annual Income (₹)</label>
            <input
              type="number"
              inputMode="numeric"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="e.g. 600000"
              className="mt-1 w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Total Deductions (₹)</label>
            <input
              type="number"
              inputMode="numeric"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              placeholder="e.g. 150000"
              className="mt-1 w-full border px-3 py-2 rounded-md"
            />
          </div>
        </div>

        {/* Record Button */}
        <button
          onClick={handleRecord}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Record
        </button>
      </div>


      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center relative">
            <FaTimes
              className="absolute top-3 right-3 cursor-pointer text-gray-500"
              onClick={closeModal}
            />
            <h3 className="text-lg font-semibold mb-4">Confirmation</h3>
            <p className="mb-6">Record this as my annual income?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmRecord(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}


      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center relative">
            <FaTimes
              className="absolute top-3 right-3 cursor-pointer text-gray-500"
              onClick={closeEditModal}
            />
            <h3 className="text-lg font-semibold mb-4">Existing Record Found</h3>
            <p className="mb-6">
              You already have an annual income recorded. Do you want to change
              that into this or cancel?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmRecord(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 p-4 rounded shadow-md text-white ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } flex items-center gap-2 z-50`}
        >
          <FaTimes className="cursor-pointer" onClick={closeNotification} />
          {notification.message}
        </div>
      )}


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          icon={<FaUniversity className="text-blue-500 text-2xl" />}
          title="Estimated Quarterly Taxes"
          value={`₹${(estimatedTax / 4).toLocaleString("en-IN")}`}
          subtitle="Based on your current income and deductions."
        />
        <SummaryCard
          icon={<FiPercent className="text-indigo-500 text-2xl" />}
          title="Effective Tax Rate"
          value={`${effectiveRate}%`}
          subtitle="Average rate applied on your taxable income."
        />
        <SummaryCard
          icon={<BsFillFileEarmarkTextFill className="text-green-500 text-2xl" />}
          title="Total Deductions"
          value={`₹${deductionsNum.toLocaleString("en-IN")}`}
          subtitle="Expenses reducing your taxable income."
        />
        <SummaryCard
          icon={<FaReceipt className="text-red-500 text-2xl" />}
          title="Taxable Income"
          value={`₹${taxableIncome.toLocaleString("en-IN")}`}
          subtitle="Income subject to tax after deductions."
        />
      </div>
    </div>
  );
}

// Reusabl
function SummaryCard({ icon, title, value, subtitle }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start">
      <div className="mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

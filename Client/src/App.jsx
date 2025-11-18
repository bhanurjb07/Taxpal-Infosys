import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Forgot from "./pages/Forgot.jsx";
import Reset from "./pages/Reset.jsx";
import Features from "./pages/Features.jsx";
import Support from "./pages/Support.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Logs from "./pages/Logs.jsx";
import Budgeting from "./pages/Budgeting.jsx";
import TaxEstimator from "./pages/TaxEstimator.jsx";
import Report from "./pages/Report.jsx";
import Category from "./pages/Category.jsx";


import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );


  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("income");
  const [categories, setCategories] = useState([
    "Salary",
    "Food",
    "Transport",
    "Rent",
  ]);

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    setIsAuthenticated(false);
    window.dispatchEvent(new Event("storage"));
  };

  const handleAuthError = () => {
    handleLogout();
  };

  const openAddIncomeModal = () => {
    setModalType("income");
    setShowModal(true);
  };

  const openAddExpenseModal = () => {
    setModalType("expense");
    setShowModal(true);
  };


  const TransactionModal = () => {
    const [form, setForm] = useState({
      date: "",
      description: "",
      category: "",
      amount: "",
      notes: "",
    });
    const [categoryMode, setCategoryMode] = useState("select");
    const [newCategory, setNewCategory] = useState("");

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
      if (e.target.value === "_new_") {
        setCategoryMode("new");
        setForm({ ...form, category: "" });
      } else {
        setCategoryMode("select");
        setForm({ ...form, category: e.target.value });
      }
    };

    const capitalize = (str) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const amount = Number(form.amount);
      const rawCategory = categoryMode === "new" ? newCategory : form.category;
      const categoryToUse = capitalize(rawCategory.trim());
      const token = localStorage.getItem("token");

      try {
        await fetch("http://localhost:5001/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            amount,
            category: categoryToUse,
            type: modalType === "income" ? "Income" : "Expense",
          }),
        });
        setShowModal(false);
        setForm({ date: "", description: "", category: "", amount: "", notes: "" });
        setCategoryMode("select");
        setNewCategory("");
      } catch (err) {
        alert("Failed to add transaction");
      }
    };

    return (
      <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black bg-opacity-30">
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold">
                  {modalType === "income"
                    ? "Record New Income"
                    : "Record New Expense"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Add details about your {modalType} to track your finances better.
                </p>
              </div>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-700">
                Description
                <input
                  type="text"
                  name="description"
                  placeholder="e.g. Web Design Project"
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="mt-1 border px-3 py-2 rounded w-full"
                />
              </label>

              <label className="text-sm font-medium text-gray-700">
                Amount
                <input
                  type="number"
                  name="amount"
                  placeholder="₹ 0.00"
                  value={form.amount}
                  onChange={handleChange}
                  required
                  className="mt-1 border px-3 py-2 rounded w-full"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm font-medium text-gray-700">
                  Category
                  {categoryMode === "select" ? (
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleCategoryChange}
                      required
                      className="mt-1 border px-3 py-2 rounded w-full"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="_new_">Add new category</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      name="newCategory"
                      placeholder="New category"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      required
                      className="mt-1 border px-3 py-2 rounded w-full"
                    />
                  )}
                </label>

                <label className="text-sm font-medium text-gray-700">
                  Date
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    max={new Date().toISOString().split("T")[0]}
                    className="mt-1 border px-3 py-2 rounded w-full"
                  />
                </label>
              </div>

              <label className="text-sm font-medium text-gray-700">
                Notes (Optional)
                <textarea
                  name="notes"
                  placeholder="Add any additional details..."
                  value={form.notes || ""}
                  onChange={handleChange}
                  className="mt-1 border px-3 py-2 rounded w-full"
                  rows={3}
                />
              </label>

              <div className="flex gap-2 mt-2 justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

 
  const PrivateLayout = ({ children }) => (
    <div className="flex min-h-screen bg-gray-100 pt-16">
      <Sidebar
        onAuthError={handleAuthError}
        openAddIncomeModal={openAddIncomeModal}
        openAddExpenseModal={openAddExpenseModal}
        categories={categories}
        refreshTransactions={() => {}}
      />
      <main className="flex-1 ml-56 p-6">{children}</main>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />}
        />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/features" element={<Features />} />

        <Route path="/support" element={<Support />} />

        {/* Private routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <PrivateLayout>
                <Dashboard onAuthError={handleAuthError} />
              </PrivateLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/logs"
          element={
            isAuthenticated ? (
              <PrivateLayout>
                <Logs onAuthError={handleAuthError} />
              </PrivateLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/budgeting"
          element={
            isAuthenticated ? (
              <PrivateLayout>
                <Budgeting onAuthError={handleAuthError} />
              </PrivateLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/tax-estimator"
          element={
            isAuthenticated ? (
              <PrivateLayout>
                <TaxEstimator onAuthError={handleAuthError} />
              </PrivateLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/category"
          element={
            isAuthenticated ? (
              <PrivateLayout>
                <Category onAuthError={handleAuthError} />
              </PrivateLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/report"
          element={
            isAuthenticated ? (
              <PrivateLayout>
                <Report onAuthError={handleAuthError} />
              </PrivateLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />}
        />
      </Routes>

      {showModal && <TransactionModal />}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

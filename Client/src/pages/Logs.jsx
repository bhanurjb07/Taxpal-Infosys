import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const TransactionOverview = ({
  categories,
  filterDate,
  setFilterDate,
  filterCategory,
  setFilterCategory,
  filterType,
  setFilterType,
  onApplyFilters,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
      <div>
        <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          id="dateRange"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          id="category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option>All categories</option>
          {categories.map((cat, idx) => (
            <option key={idx}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
        <select
          id="type"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option>All</option>
          <option>Income</option>
          <option>Expense</option>
        </select>
      </div>
      <button
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
        onClick={onApplyFilters}
      >
        Apply Filters
      </button>
    </div>
  </div>
);

const RecentTransactionsTable = ({ transactions, onDelete, onEdit }) => {
  const formatCurrency = (amount) => {
    const isNegative = amount < 0;
    const formatted = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(amount));
    return isNegative ? `-${formatted}` : formatted;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(transactions) && transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.type}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${transaction.type === "Expense" ? "text-red-600" : "text-green-600"}`}>
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2">
                    <button className="p-1 rounded-full hover:bg-gray-200" onClick={() => onEdit(transaction)}>
                      <EditIcon />
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-200" onClick={() => onDelete(transaction)}>
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-4">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Logs() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("All categories");
  const [filterType, setFilterType] = useState("All");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editTransaction, setEditTransaction] = useState(null);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await fetch("http://localhost:5001/transactions", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`Failed: ${response.status}`);
      const data = await response.json();
      setTransactions(data);
      setCategories([...new Set(data.map((t) => t.category))]);
      setFilteredTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5001/transactions/${deleteConfirm._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      setDeleteConfirm(null);
      fetchTransactions();
    } catch {
      alert("Failed to delete transaction");
    }
  };

  const saveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5001/transactions/${editTransaction._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editTransaction),
      });
      toast.success("Successfully updated the details");
      setEditTransaction(null);
      fetchTransactions();
    } catch {
      alert("Failed to update transaction");
    }
  };

  const handleApplyFilters = () => {
    let filtered = transactions;
    if (filterDate) filtered = filtered.filter((t) => t.date === filterDate);
    if (filterCategory !== "All categories") filtered = filtered.filter((t) => t.category === filterCategory);
    if (filterType !== "All") filtered = filtered.filter((t) => t.type === filterType);
    setFilteredTransactions(filtered);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Transactions</h1>

      <TransactionOverview
        categories={categories}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterType={filterType}
        setFilterType={setFilterType}
        onApplyFilters={handleApplyFilters}
      />

      <RecentTransactionsTable
        transactions={filteredTransactions}
        onDelete={(t) => setDeleteConfirm(t)}
        onEdit={(t) => setEditTransaction(t)}
      />

      {deleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this transaction?</p>
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {editTransaction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Edit Transaction</h2>
            <div className="space-y-3">
              <input type="text" className="w-full border px-3 py-2 rounded" value={editTransaction.description}
                onChange={(e) => setEditTransaction({ ...editTransaction, description: e.target.value })} />
              <input type="number" className="w-full border px-3 py-2 rounded" value={editTransaction.amount}
                onChange={(e) => setEditTransaction({ ...editTransaction, amount: Number(e.target.value) })} />
              <input type="text" className="w-full border px-3 py-2 rounded" value={editTransaction.category}
                onChange={(e) => setEditTransaction({ ...editTransaction, category: e.target.value })} />
              <input type="date" className="w-full border px-3 py-2 rounded" value={editTransaction.date}
                onChange={(e) => setEditTransaction({ ...editTransaction, date: e.target.value })} />
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400" onClick={() => setEditTransaction(null)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

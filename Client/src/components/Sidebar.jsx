import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaFileInvoice,
  FaBook,
  FaCalculator,
  FaChartBar,
} from "react-icons/fa";

export default function Sidebar({
  categories,
  openAddIncomeModal,
  openAddExpenseModal,
  onAuthError,
}) {
  const location = useLocation();

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/logs", label: "Transactions", icon: <FaFileInvoice /> },
    { to: "/budgeting", label: "Budget", icon: <FaBook /> },
    { to: "/tax-estimator", label: "Tax Estimation", icon: <FaCalculator /> },
    { to: "/report", label: "Financial Report", icon: <FaChartBar /> },
  ];

  return (
    <>
      <aside className="fixed top-16 left-0 h-full w-56 bg-white shadow-md pb-20 flex flex-col justify-between">
        <nav className="mt-6 flex flex-col gap-2 ">
          {links.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                location.pathname === to ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-4 flex flex-col gap-2">
          <button
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
            onClick={openAddIncomeModal}
          >
            Add Income
          </button>
          <button
            className="w-full bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150"
            onClick={openAddExpenseModal}
          >
            Add Expense
          </button>
        </div>
      </aside>
    </>
  );
}

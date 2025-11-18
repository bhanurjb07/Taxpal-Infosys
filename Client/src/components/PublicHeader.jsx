import { Link } from "react-router-dom";

export default function PublicHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-gray-800">TaxPal</span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-6">
          <Link
            to="/features"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Pricing
          </Link>
          <Link
            to="/support"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Support
          </Link>
        </nav>
      </div>
    </header>
  );
}

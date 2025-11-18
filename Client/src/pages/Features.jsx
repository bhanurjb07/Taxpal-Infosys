import React from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, BarChart2, Globe } from "lucide-react";

const features = [
  {
    icon: <CreditCard className="w-12 h-12 text-blue-600" />,
    title: "Automated Invoicing",
    desc: "Save time by automating invoices with recurring payments.",
  },
  {
    icon: <BarChart2 className="w-12 h-12 text-green-600" />,
    title: "Real-Time Analytics",
    desc: "Track your income and expenses with live data charts.",
  },
  {
    icon: <Globe className="w-12 h-12 text-purple-600" />,
    title: "Multi-Currency Support",
    desc: "Send and receive payments in 50+ currencies worldwide.",
  },
];

export default function Features() {
  const navigate = useNavigate();

  return (
    <section className="py-28 bg-white min-h-[90vh]">
      <h2 className="text-4xl font-bold text-center mb-14">Features</h2>

      {/*  Centered Grid */}
      <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="w-[280px] md:w-[300px] p-10 border rounded-3xl shadow-lg text-center flex flex-col items-center"
          >
            {f.icon}
            <h3 className="mt-6 font-semibold text-xl">{f.title}</h3>
            <p className="mt-4 text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>

      {/*  Back to Login button */}
      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Login
        </button>
      </div>
    </section>
  );
}

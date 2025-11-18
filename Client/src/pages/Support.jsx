import React from "react";
import { useNavigate } from "react-router-dom";

export default function Support() {
  const navigate = useNavigate();

  return (
    <section className="py-28 bg-white min-h-[90vh]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Support</h1>
        <p className="text-gray-600">
          Want any help? Reach out us{" "}
          <a
            href="mailto:taxpalteam1@gmail.com"
            className="text-blue-600 underline"
          >
            taxpalteam1@gmail.com
          </a>
          .
        </p>
      </div>


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

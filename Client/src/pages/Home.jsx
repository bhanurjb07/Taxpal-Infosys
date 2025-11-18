import Button  from "@/components/Button";
import { API } from "../api";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
  
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold leading-tight">
            Manage Your Finances <span className="text-blue-600">Smarter</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            TaxPal helps you track, save, and plan your taxes with ease.
            Get everything you need to stay on top of your finances.
          </p>
          <div className="mt-6 flex space-x-4">
            <Button className="px-6 py-3">Get Started</Button>
            <Button variant="outline" className="px-6 py-3">
              Learn More
            </Button>
          </div>
        </div>
        <img
          src="/dashboard.png"
          alt="Dashboard"
          className="w-full md:w-1/2 mt-10 md:mt-0"
        />
      </section>


      <section id="features" className="bg-gray-50 py-16 px-10">
        <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["Track Expenses", "Generate Reports", "Secure Login"].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{feature}</h3>
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          ))}
        </div>
      </section>


      <section id="pricing" className="py-16 px-10">
        <h2 className="text-3xl font-bold text-center mb-10">Pricing Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["Starter", "Pro", "Enterprise"].map((plan, idx) => (
            <div
              key={idx}
              className="p-6 border rounded-2xl text-center shadow hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold">{plan}</h3>
              <p className="mt-4 text-gray-600">₹ {idx * 20 + 10} / month</p>
              <Button className="mt-6 w-full">Choose Plan</Button>
            </div>
          ))}
        </div>
      </section>


      <footer className="mt-auto bg-gray-100 py-6 text-center text-gray-600">
        © {new Date().getFullYear()} TaxPal. All rights reserved.
      </footer>
    </div>
  );
}

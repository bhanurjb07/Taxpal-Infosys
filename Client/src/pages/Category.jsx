import { useState, useEffect } from "react";
import { FaUser, FaBell, FaList, FaEdit, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { User, Mail, Globe, DollarSign } from "lucide-react";


function ProfileSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    income: ""
  });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); 


  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        toast.error("No token found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5001/api/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        const data = await res.json();
        if (res.ok) {
          setForm({
            name: data.name || "",
            email: data.email || "",
            country: data.country || "",
            income: data.income || "",
          });
        } else {
          toast.error(data.message || "Failed to load profile");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


  const handleSave = async () => {
    if (!token) {
      toast.error("No token found. Please login again.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated!");
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border w-full max-w-lg">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border w-full max-auto">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl mb-2">
          {form.name ? form.name.charAt(0).toUpperCase() : "U"}
        </div>
        <h2 className="text-xl font-bold">{form.name || "Your Name"}</h2>
        <p className="text-gray-600 text-sm">{form.email}</p>
      </div>


      {/* Details Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <User size={16} /> Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <Mail size={16} /> Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <Globe size={16} /> Country
          </label>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

         <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <DollarSign size={16} /> Income
          </label>
          <input
            type="text"
            name="income"
            value={form.income}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        
      </div>


      <div className="mt-6 text-left">
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}


function NotificationsSection() {
  const [prefs, setPrefs] = useState({ email: true, sms: false, push: true });
  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5001/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok && data.notifications) {
          setPrefs(data.notifications);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load notifications");
      }
    };

    fetchNotifications();
  }, [token]);

  const toggle = (key) => setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));


  const handleSave = async () => {
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5001/api/user/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(prefs),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Notification settings saved!");
        console.log("Updated:", data);
      } else {
        toast.error(data.message || "Failed to save notifications");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save notifications");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow border w-full max-w-full">
      <h2 className="text-xl font-bold mb-2">Notification Settings</h2>
      <p className="text-gray-600 mb-4">Manage your notification preferences.</p>

      <div className="space-y-4">
        <label className="flex items-center justify-between">
          <span>Email notifications</span>
          <input
            type="checkbox"
            checked={prefs.email}
            onChange={() => toggle("email")}
          />
        </label>
        <label className="flex items-center justify-between">
          <span>SMS notifications</span>
          <input
            type="checkbox"
            checked={prefs.sms}
            onChange={() => toggle("sms")}
          />
        </label>
        <label className="flex items-center justify-between">
          <span>Push notifications</span>
          <input
            type="checkbox"
            checked={prefs.push}
            onChange={() => toggle("push")}
          />
        </label>
      </div>

      <button
        onClick={handleSave}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Notifications
      </button>
    </div>
  );
}


export default function Category() {
  const [activeTab, setActiveTab] = useState("category");
  const [activeSection, setActiveSection] = useState("income");

  const [incomeCategories, setIncomeCategories] = useState(() => {
    return JSON.parse(localStorage.getItem("incomeCategories")) || [
      { name: "Salary", color: "bg-green-500" },
      { name: "Business", color: "bg-blue-500" },
      { name: "Investments", color: "bg-purple-500" },
    ];
  });

  const [expenseCategories, setExpenseCategories] = useState(() => {
    return JSON.parse(localStorage.getItem("expenseCategories")) || [
      { name: "Food", color: "bg-red-500" },
      { name: "Rent", color: "bg-yellow-500" },
      { name: "Travel", color: "bg-orange-500" },
    ];
  });

  useEffect(() => {
    localStorage.setItem("incomeCategories", JSON.stringify(incomeCategories));
  }, [incomeCategories]);

  useEffect(() => {
    localStorage.setItem("expenseCategories", JSON.stringify(expenseCategories));
  }, [expenseCategories]);

  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newType, setNewType] = useState("income");
  const [editIndex, setEditIndex] = useState(null);
  const [editType, setEditType] = useState(null);

  const handleAddClick = () => {
    setNewCategory("");
    setNewType("income");
    setEditIndex(null);
    setEditType(null);
    setShowModal(true);
  };

  const handleEditClick = (cat, index, type) => {
    setNewCategory(cat.name);
    setNewType(type);
    setEditIndex(index);
    setEditType(type);
    setShowModal(true);
  };

  const handleSaveCategory = () => {
    if (!newCategory.trim()) return;

    const colorPalette = ["bg-pink-500", "bg-indigo-500", "bg-teal-500", "bg-cyan-500", "bg-lime-500"];
    const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];

    if (editIndex !== null) {
      if (editType === "income") {
        const updated = [...incomeCategories];
        updated[editIndex] = { ...updated[editIndex], name: newCategory };
        setIncomeCategories(updated);
      } else {
        const updated = [...expenseCategories];
        updated[editIndex] = { ...updated[editIndex], name: newCategory };
        setExpenseCategories(updated);
      }
    } else {
      if (newType === "income") {
        setIncomeCategories([...incomeCategories, { name: newCategory, color: randomColor }]);
      } else {
        setExpenseCategories([...expenseCategories, { name: newCategory, color: randomColor }]);
      }
    }

    setNewCategory("");
    setNewType("income");
    setEditIndex(null);
    setEditType(null);
    setShowModal(false);
  };
  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.id;
    } catch (e) {
      console.error("Invalid token");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-white shadow p-4 border-b">
        <h1 className="text-xl font-bold text-gray-700">Settings</h1>
        <p className="text-gray-500 text-sm">Manage your account settings and preferences</p>
      </div>

      <div className="flex w-full">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md border-r min-h-[calc(100vh-80px)] p-4">
          {[
            { key: "profile", icon: <FaUser />, label: "Profile" },
            { key: "notifications", icon: <FaBell />, label: "Notifications" },
            { key: "category", icon: <FaList />, label: "Category" },
          ].map((tab) => (
            <div
              key={tab.key}
              className={`flex items-center gap-3 p-3 mb-2 rounded cursor-pointer ${
                activeTab === tab.key ? "bg-gray-100 border-l-4 border-blue-600" : "hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon}
              <span className="text-gray-700">{tab.label}</span>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          {activeTab === "profile" && <ProfileSection />}
          {activeTab === "notifications" && <NotificationsSection userId={userId} />}

          {activeTab === "category" && (
            <div className="bg-white p-6 rounded shadow border w-full max-w-full">
              <h2 className="text-xl font-bold mb-4">Category Management</h2>

              {/* Tabs */}
              <div className="flex space-x-6 mb-4 border-b pb-2">
                <button
                  onClick={() => setActiveSection("income")}
                  className={`${
                    activeSection === "income" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"
                  }`}
                >
                  Income Categories
                </button>
                <button
                  onClick={() => setActiveSection("expenses")}
                  className={`${
                    activeSection === "expenses" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"
                  }`}
                >
                  Expenses Categories
                </button>
              </div>

              {/* Category List */}
              <div className="space-y-2">
                {(activeSection === "income" ? incomeCategories : expenseCategories).map((cat, i) => (
                  <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded border">
                    <div className="flex items-center space-x-2">
                      <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
                      <span>{cat.name}</span>
                    </div>
                    <div className="space-x-2">
                      <button onClick={() => handleEditClick(cat, i, activeSection)}>
                        <FaEdit className="text-black cursor-pointer" />
                      </button>
                      <button
                        onClick={() =>
                          activeSection === "income"
                            ? setIncomeCategories(incomeCategories.filter((_, idx) => idx !== i))
                            : setExpenseCategories(expenseCategories.filter((_, idx) => idx !== i))
                        }
                      >
                        <FaTimes className="text-black cursor-pointer" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Button */}
              <div className="mt-6">
                <button
                  onClick={handleAddClick}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  + Add New Category
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded shadow-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">
              {editIndex !== null ? "Edit Category" : "Add New Category"}
            </h3>

            <input
              type="text"
              placeholder="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            />

            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
              disabled={editIndex !== null}
            >
              <option value="income">Income</option>
              <option value="expenses">Expenses</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCategory}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import Papa from "papaparse";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Ladies() {
  const [activeTab, setActiveTab] = useState("overview");
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    Papa.parse("/sample-data/ladies_funds.csv", {
      download: true,
      header: true,
      complete: (res) => setFunds(res.data),
    });
  }, []);

  const tabs = ["overview", "members", "funds", "activities"];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Ladies Department</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "overview" && (
        <p className="text-gray-700">
          The Ladies Department focuses on empowering women through prayer
          meetings, charity initiatives, and fellowship programs.
        </p>
      )}

      {activeTab === "members" && (
        <ul className="list-disc pl-6 text-gray-700">
          <li>Mary Joseph – President</li>
          <li>Annie Mathew – Secretary</li>
          <li>Leena Varghese – Treasurer</li>
        </ul>
      )}

      {activeTab === "funds" && (
        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={funds}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === "activities" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Upcoming Activities</h2>
          <p className="text-gray-700">
            Weekly prayer meetings, charity visits, and community outreach
            programs.
          </p>
        </div>
      )}
    </div>
  );
}

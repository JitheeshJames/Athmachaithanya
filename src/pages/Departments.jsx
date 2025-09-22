import React from "react";

// You can add short description for each department here
const DEPARTMENTS = [
  { name: "Ladies", description: "Ladies ministry, supporting women and families." },
  { name: "Youth", description: "Youth group activities and events." },
  { name: "Brothers", description: "Men's ministry, brotherhood and service." },
  { name: "Service Team", description: "Church service and volunteers." },
  { name: "Sunday School", description: "Children's education and activities." },
  { name: "Church", description: "Overall church committees and functions." },
];

export default function Departments() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Departments</h2>

      {DEPARTMENTS.map((dept) => (
        <div
          key={dept.name}
          className="border rounded shadow-sm bg-white p-4 hover:bg-gray-50 cursor-pointer"
          onClick={() => (window.location.hash = `#departments/${dept.name}`)}
        >
          <h3 className="font-semibold text-lg">{dept.name}</h3>
          <p className="text-sm text-gray-600">{dept.description}</p>
        </div>
      ))}
    </div>
  );
}

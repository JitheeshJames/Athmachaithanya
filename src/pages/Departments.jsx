// src/pages/Departments.jsx
import { Link } from "react-router-dom";

const departments = [
  {
    name: "Ladies Department",
    path: "/departments/ladies",
    description: "Focusing on women’s spiritual growth, service, and charity activities.",
  },
  {
    name: "Youth Department",
    path: "/departments/youth",
    description: "Encouraging young members in leadership, worship, and community service.",
  },
  {
    name: "Brothers Department",
    path: "/departments/brothers",
    description: "Engaging men of the church in charity, support, and prayer activities.",
  },
  {
    name: "Service Team",
    path: "/departments/service",
    description: "The backbone team supporting church events and charity operations.",
  },
  {
    name: "Sunday School",
    path: "/departments/sunday-school",
    description: "Guiding children in faith, values, and community service.",
  },
  {
    name: "Church Department",
    path: "/departments/church",
    description: "Main administration, events, and overall operations of Athmachaithanya.",
  },
];

export default function Departments() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Our Departments</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Link
            key={dept.name}
            to={dept.path}
            className="block p-6 bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{dept.name}</h2>
            <p className="text-gray-600">{dept.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

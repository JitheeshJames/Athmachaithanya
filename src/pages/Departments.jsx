import React from "react";

const departments = [
  { id: "ladies", name: "Ladies", desc: "Empowering women through prayer, charity, and fellowship." },
  { id: "youth", name: "Youth", desc: "Building strong faith and leadership among the youth." },
  { id: "brothers", name: "Brothers", desc: "Men’s fellowship focused on service and spiritual growth." },
  { id: "serviceteam", name: "Service Team", desc: "Assisting church functions, events, and services." },
  { id: "sundayschool", name: "Sunday School", desc: "Nurturing children with Biblical values and teachings." },
  { id: "church", name: "Church", desc: "Main church body overseeing all activities and worship." },
];

export default function Departments() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Departments</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {departments.map((d) => (
          <a
            key={d.id}
            href={`#${d.id}`}
            className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{d.name}</h2>
            <p className="text-gray-600">{d.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

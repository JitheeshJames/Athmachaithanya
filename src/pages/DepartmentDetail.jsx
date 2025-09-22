import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DepartmentDetail({ deptName }) {
  const [members, setMembers] = useState([]);
  const [committee, setCommittee] = useState([]);
  const [funds, setFunds] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const basePath = `/sample-data/${deptName}/`;
    const loadCsv = async (file, setter) => {
      const res = await fetch(basePath + file);
      const text = await res.text();
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (r) => setter(r.data),
      });
    };
    loadCsv("members.csv", setMembers);
    loadCsv("committee.csv", setCommittee);
    loadCsv("funds.csv", setFunds);
    loadCsv("activities.csv", setActivities);
  }, [deptName]);

  // Example: prepare fund chart
  const fundChartData = funds.map((f) => ({ name: f.date, amount: parseFloat(f.amount || 0) }));

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">{deptName} Department</h2>

      <div>
        <h3 className="font-semibold">Members</h3>
        <ul className="list-disc ml-5">
          {members.map((m, idx) => (
            <li key={idx}>{m.name} — {m.role} ({m.email})</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">Committee</h3>
        <ul className="list-disc ml-5">
          {committee.map((c, idx) => (
            <li key={idx}>{c.name} — {c.role} ({c.contact})</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">Funds</h3>
        <ul className="list-disc ml-5">
          {funds.map((f, idx) => (
            <li key={idx}>{f.date}: {f.category} — ₹{f.amount} ({f.purpose})</li>
          ))}
        </ul>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={fundChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="font-semibold">Activities</h3>
        <ul className="list-disc ml-5">
          {activities.map((a, idx) => (
            <li key={idx}>{a.date}: {a.title} — {a.organizer}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Papa from "papaparse";

const DEPARTMENTS = [
  "Ladies",
  "Youth",
  "Brothers",
  "Service Team",
  "Sunday School",
  "Church",
];

// Helper to load CSV
async function loadCsv(path) {
  return new Promise((resolve, reject) => {
    Papa.parse(path, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (res) => resolve(res.data),
      error: (err) => reject(err),
    });
  });
}

export default function Departments() {
  const [deptData, setDeptData] = useState({}); // store all CSVs per department
  const [openDept, setOpenDept] = useState(null);

  useEffect(() => {
    DEPARTMENTS.forEach(async (dept) => {
      const basePath = `/pages/departments/${dept}/`;
      try {
        const [members, committee, funds, activities] = await Promise.all([
          loadCsv(`${basePath}members.csv`),
          loadCsv(`${basePath}committee.csv`),
          loadCsv(`${basePath}funds.csv`),
          loadCsv(`${basePath}activities.csv`),
        ]);

        setDeptData((prev) => ({
          ...prev,
          [dept]: { members, committee, funds, activities },
        }));
      } catch (err) {
        console.error(`Error loading CSV for ${dept}:`, err);
      }
    });
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Departments</h2>

      {DEPARTMENTS.map((dept) => (
        <div key={dept} className="border rounded shadow-sm bg-white">
          <button
            onClick={() => setOpenDept(openDept === dept ? null : dept)}
            className="w-full text-left p-3 font-semibold bg-gray-100 hover:bg-gray-200 rounded-t"
          >
            {dept}
          </button>

          {openDept === dept && (
            <div className="p-3 space-y-3">
              {/* Members */}
              <div>
                <h3 className="font-medium">Members</h3>
                <ul className="list-disc ml-5">
                  {deptData[dept]?.members?.map((m, idx) => (
                    <li key={idx}>{m.name} — {m.role} ({m.email})</li>
                  )) || <li>No members loaded</li>}
                </ul>
              </div>

              {/* Committee */}
              <div>
                <h3 className="font-medium">Committee</h3>
                <ul className="list-disc ml-5">
                  {deptData[dept]?.committee?.map((c, idx) => (
                    <li key={idx}>{c.name} — {c.role} ({c.contact})</li>
                  )) || <li>No committee loaded</li>}
                </ul>
              </div>

              {/* Funds */}
              <div>
                <h3 className="font-medium">Funds</h3>
                <ul className="list-disc ml-5">
                  {deptData[dept]?.funds?.map((f, idx) => (
                    <li key={idx}>{f.date}: {f.category} — ₹{f.amount} ({f.purpose})</li>
                  )) || <li>No funds loaded</li>}
                </ul>
              </div>

              {/* Activities */}
              <div>
                <h3 className="font-medium">Activities</h3>
                <ul className="list-disc ml-5">
                  {deptData[dept]?.activities?.map((a, idx) => (
                    <li key={idx}>{a.date}: {a.title} — {a.organizer} ({a.description})</li>
                  )) || <li>No activities loaded</li>}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

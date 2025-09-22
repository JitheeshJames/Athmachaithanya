import React, { useState, useEffect } from "react";
import Papa from "papaparse";

/**
 * Departments.jsx
 * - Replace/Place in: src/components/Departments.jsx
 * - Works with CSV files uploaded from the UI (members, committee, funds, activities, agenda)
 *
 * Departments: Ladies, Youth, Brothers, Service Team, Sunday School, Church
 */

const DEPARTMENTS = [
  "Ladies",
  "Youth",
  "Brothers",
  "Service Team",
  "Sunday School",
  "Church",
];

function daysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}
function startDateForPeriod(period) {
  const now = new Date();
  if (period === "day") return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (period === "week") return daysAgo(7);
  if (period === "month") return daysAgo(30);
  return new Date(0);
}

function downloadFile(filename, text) {
  const a = document.createElement("a");
  const blob = new Blob([text], { type: "text/csv" });
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function Departments() {
  const [members, setMembers] = useState([]); // members CSV rows
  const [committee, setCommittee] = useState([]); // committee CSV rows
  const [funds, setFunds] = useState([]); // funds CSV rows
  const [activities, setActivities] = useState([]); // activities CSV rows
  const [agenda, setAgenda] = useState([]); // agenda CSV rows

  const [selectedDept, setSelectedDept] = useState(DEPARTMENTS[0]);
  const [period, setPeriod] = useState("month"); // day | week | month | all
  const [q, setQ] = useState(""); // search query

  // Generic CSV loader
  function handleCsvUpload(e, setter) {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        setter(res.data);
      },
    });
  }

  // Derived filtered values
  const startDate = startDateForPeriod(period);

  function filterByDeptAndPeriod(rows, dept, dateField = "date") {
    if (!rows || !rows.length) return [];
    return rows.filter((r) => {
      const matchesDept =
        (r.department || r.Department || r.dept || "").toString().toLowerCase() ===
        dept.toLowerCase();
      if (!matchesDept) return false;
      if (!dateField || !r[dateField]) return true;
      const d = new Date(r[dateField]);
      if (isNaN(d)) return true; // keep rows without parsable date
      return d >= startDate;
    });
  }

  const membersForDept = (members || []).filter(
    (m) =>
      ((m.department || m.Department || "").toString().toLowerCase() === selectedDept.toLowerCase()) &&
      (q ? (m.name || m.Name || "").toString().toLowerCase().includes(q.toLowerCase()) : true)
  );

  const committeeForDept = (committee || []).filter(
    (c) => (c.department || c.Department || "").toString().toLowerCase() === selectedDept.toLowerCase()
  );

  const fundsForDept = filterByDeptAndPeriod(funds, selectedDept, "date");
  const activitiesForDept = filterByDeptAndPeriod(activities, selectedDept, "date");
  const agendaForDept = filterByDeptAndPeriod(agenda, selectedDept, "meeting_date");

  // totals
  const totalFundsReceived = fundsForDept.reduce((s, f) => s + (parseFloat(f.amount || f.amount_inr || 0) || 0), 0);

  function exportFilteredCSV(rows, filename = "export.csv") {
    if (!rows || !rows.length) return alert("No rows to export");
    const csv = Papa.unparse(rows);
    downloadFile(filename, csv);
  }

  return (
    <div id="departments" className="bg-white rounded-xl shadow p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h3 className="font-semibold text-lg">Departments</h3>

        <div className="flex gap-2 items-center">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="border rounded px-2 py-1">
            <option value="day">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
            <option value="all">All time</option>
          </select>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search member name"
            className="border rounded px-2 py-1"
          />
        </div>
      </div>

      {/* CSV upload controls */}
      <div className="grid md:grid-cols-2 gap-3 mb-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-slate-600">Upload members CSV</label>
          <input type="file" accept=".csv" onChange={(e) => handleCsvUpload(e, setMembers)} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-slate-600">Upload committee CSV</label>
          <input type="file" accept=".csv" onChange={(e) => handleCsvUpload(e, setCommittee)} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-slate-600">Upload funds CSV</label>
          <input type="file" accept=".csv" onChange={(e) => handleCsvUpload(e, setFunds)} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-slate-600">Upload activities CSV</label>
          <input type="file" accept=".csv" onChange={(e) => handleCsvUpload(e, setActivities)} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-slate-600">Upload agenda CSV</label>
          <input type="file" accept=".csv" onChange={(e) => handleCsvUpload(e, setAgenda)} />
        </div>
      </div>

      {/* summary & actions */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex gap-4">
          <div className="p-3 bg-gray-50 rounded">
            <div className="text-xs text-slate-500">Members</div>
            <div className="font-medium">{membersForDept.length}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <div className="text-xs text-slate-500">Committee</div>
            <div className="font-medium">{committeeForDept.length}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <div className="text-xs text-slate-500">Funds (filtered)</div>
            <div className="font-medium">₹ {totalFundsReceived.toLocaleString()}</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => exportFilteredCSV(membersForDept, `${selectedDept}_members.csv`)}
            className="px-3 py-1 rounded border text-sm"
          >
            Export Members
          </button>
          <button
            onClick={() => exportFilteredCSV(fundsForDept, `${selectedDept}_funds.csv`)}
            className="px-3 py-1 rounded border text-sm"
          >
            Export Funds
          </button>
          <button
            onClick={() => exportFilteredCSV(activitiesForDept, `${selectedDept}_activities.csv`)}
            className="px-3 py-1 rounded border text-sm"
          >
            Export Activities
          </button>
        </div>
      </div>

      {/* details */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Members */}
        <div className="md:col-span-1 bg-white border rounded p-3">
          <div className="font-semibold mb-2">Members</div>
          <div className="max-h-48 overflow-auto space-y-2">
            {membersForDept.length === 0 && <div className="text-xs text-slate-400">No members loaded</div>}
            {membersForDept.map((m, i) => (
              <div key={i} className="p-2 border rounded">
                <div className="text-sm font-medium">{m.name || m.Name || "—"}</div>
                <div className="text-xs text-slate-500">{m.role || m.Role || ""} • {m.email || m.Email || ""}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Committee & Agenda */}
        <div className="bg-white border rounded p-3">
          <div className="font-semibold mb-2">Committee</div>
          <div className="max-h-24 overflow-auto mb-3 space-y-2">
            {committeeForDept.length === 0 && <div className="text-xs text-slate-400">No committee data</div>}
            {committeeForDept.map((c, idx) => (
              <div key={idx} className="p-2 border rounded">
                <div className="text-sm font-medium">{c.name || c.Name || "—"}</div>
                <div className="text-xs text-slate-500">{c.role || c.Role || ""} • {c.contact || ""}</div>
              </div>
            ))}
          </div>

          <div className="font-semibold mb-2">Upcoming Agenda</div>
          <div className="max-h-28 overflow-auto space-y-2">
            {agendaForDept.length === 0 && <div className="text-xs text-slate-400">No agenda</div>}
            {agendaForDept.map((a, idx) => (
              <div key={idx} className="p-2 border rounded">
                <div className="text-sm">{a.agenda_item || a.Agenda || "—"}</div>
                <div className="text-xs text-slate-500">{a.meeting_date || a.Meeting_Date || ""} • {a.assigned_to || ""}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Funds & Activities */}
        <div className="bg-white border rounded p-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Funds & Activities</div>
            <div className="text-xs text-slate-500">Period: {period}</div>
          </div>

          <div className="mt-3">
            <div className="text-xs text-slate-500">Funds (filtered)</div>
            <div className="max-h-36 overflow-auto mt-2 space-y-2">
              {fundsForDept.length === 0 && <div className="text-xs text-slate-400">No fund records</div>}
              {fundsForDept.map((f, idx) => (
                <div key={idx} className="p-2 border rounded flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium">{f.category || f.Category || "Donation"}</div>
                    <div className="text-xs text-slate-500">{f.purpose || f.Purpose || ""} • {f.date || f.Date || ""}</div>
                  </div>
                  <div className="font-medium">₹ {parseFloat(f.amount || f.Amount || 0).toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-sm font-medium">Total: ₹ {totalFundsReceived.toLocaleString()}</div>
          </div>

          <div className="mt-4">
            <div className="text-xs text-slate-500">Activities (filtered)</div>
            <div className="max-h-28 overflow-auto mt-2 space-y-2">
              {activitiesForDept.length === 0 && <div className="text-xs text-slate-400">No activities</div>}
              {activitiesForDept.map((act, idx) => (
                <div key={idx} className="p-2 border rounded">
                  <div className="text-sm font-medium">{act.title || act.Title || act.activity || "—"}</div>
                  <div className="text-xs text-slate-500">{act.date || act.Date || ""} • {act.organizer || act.Organizer || ""}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

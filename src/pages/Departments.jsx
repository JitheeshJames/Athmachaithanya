import React, { useState } from "react";
import Papa from "papaparse";

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
  const [members, setMembers] = useState([]);
  const [committee, setCommittee] = useState([]);
  const [funds, setFunds] = useState([]);
  const [activities, setActivities] = useState([]);
  const [agenda, setAgenda] = useState([]);

  const [period, setPeriod] = useState("month"); 
  const [q, setQ] = useState(""); 

  function handleCsvUpload(e, setter) {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => setter(res.data),
    });
  }

  const startDate = startDateForPeriod(period);

  function filterByDeptAndPeriod(rows, dept, dateField = "date") {
    if (!rows?.length) return [];
    return rows.filter((r) => {
      const matchesDept =
        (r.department || r.Department || r.dept || "").toString().toLowerCase() ===
        dept.toLowerCase();
      if (!matchesDept) return false;
      if (!dateField || !r[dateField]) return true;
      const d = new Date(r[dateField]);
      if (isNaN(d)) return true;
      return d >= startDate;
    });
  }

  function exportFilteredCSV(rows, filename = "export.csv") {
    if (!rows?.length) return alert("No rows to export");
    const csv = Papa.unparse(rows);
    downloadFile(filename, csv);
  }

  return (
    <div id="departments" className="bg-white rounded-xl shadow p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <h3 className="font-semibold text-lg">Departments</h3>

        <div className="flex gap-2 items-center">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border rounded px-2 py-1"
          >
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

      {/* CSV Upload Controls */}
      <div className="grid md:grid-cols-2 gap-3 mb-8">
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

      {/* Render each department */}
      {DEPARTMENTS.map((dept) => {
        const membersForDept = (members || []).filter(
          (m) =>
            (m.department || m.Department || "")
              .toString()
              .toLowerCase() === dept.toLowerCase() &&
            (q ? (m.name || m.Name || "").toString().toLowerCase().includes(q.toLowerCase()) : true)
        );
        const committeeForDept = (committee || []).filter(
          (c) => (c.department || c.Department || "").toString().toLowerCase() === dept.toLowerCase()
        );
        const fundsForDept = filterByDeptAndPeriod(funds, dept, "date");
        const activitiesForDept = filterByDeptAndPeriod(activities, dept, "date");
        const agendaForDept = filterByDeptAndPeriod(agenda, dept, "meeting_date");

        const totalFundsReceived = fundsForDept.reduce(
          (s, f) => s + (parseFloat(f.amount || f.amount_inr || 0) || 0),
          0
        );

        return (
          <div key={dept} className="mb-10 border-t pt-6">
            <h4 className="text-xl font-bold mb-4">{dept}</h4>

            {/* Summary */}
            <div className="flex gap-4 mb-4">
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-xs text-slate-500">Members</div>
                <div className="font-medium">{membersForDept.length}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-xs text-slate-500">Committee</div>
                <div className="font-medium">{committeeForDept.length}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-xs text-slate-500">Funds</div>
                <div className="font-medium">₹ {totalFundsReceived.toLocaleString()}</div>
              </div>
            </div>

            {/* Export buttons */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => exportFilteredCSV(membersForDept, `${dept}_members.csv`)}
                className="px-3 py-1 rounded border text-sm"
              >
                Export Members
              </button>
              <button
                onClick={() => exportFilteredCSV(fundsForDept, `${dept}_funds.csv`)}
                className="px-3 py-1 rounded border text-sm"
              >
                Export Funds
              </button>
              <button
                onClick={() => exportFilteredCSV(activitiesForDept, `${dept}_activities.csv`)}
                className="px-3 py-1 rounded border text-sm"
              >
                Export Activities
              </button>
            </div>

            {/* Details */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Members */}
              <div className="bg-white border rounded p-3">
                <div className="font-semibold mb-2">Members</div>
                <div className="max-h-48 overflow-auto space-y-2">
                  {membersForDept.length === 0 && <div className="text-xs text-slate-400">No members</div>}
                  {membersForDept.map((m, i) => (
                    <div key={i} className="p-2 border rounded">
                      <div className="text-sm font-medium">{m.name || m.Name || "—"}</div>
                      <div className="text-xs text-slate-500">
                        {m.role || m.Role || ""} • {m.email || m.Email || ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Committee + Agenda */}
              <div className="bg-white border rounded p-3">
                <div className="font-semibold mb-2">Committee</div>
                <div className="max-h-24 overflow-auto mb-3 space-y-2">
                  {committeeForDept.length === 0 && <div className="text-xs text-slate-400">No committee</div>}
                  {committeeForDept.map((c, idx) => (
                    <div key={idx} className="p-2 border rounded">
                      <div className="text-sm font-medium">{c.name || c.Name || "—"}</div>
                      <div className="text-xs text-slate-500">
                        {c.role || c.Role || ""} • {c.contact || ""}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="font-semibold mb-2">Upcoming Agenda</div>
                <div className="max-h-28 overflow-auto space-y-2">
                  {agendaForDept.length === 0 && <div className="text-xs text-slate-400">No agenda</div>}
                  {agendaForDept.map((a, idx) => (
                    <div key={idx} className="p-2 border rounded">
                      <div className="text-sm">{a.agenda_item || a.Agenda || "—"}</div>
                      <div className="text-xs text-slate-500">
                        {a.meeting_date || a.Meeting_Date || ""} • {a.assigned_to || ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Funds + Activities */}
              <div className="bg-white border rounded p-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Funds & Activities</div>
                  <div className="text-xs text-slate-500">Period: {period}</div>
                </div>

                {/* Funds */}
                <div className="mt-3">
                  <div className="text-xs text-slate-500">Funds</div>
                  <div className="max-h-36 overflow-auto mt-2 space-y-2">
                    {fundsForDept.length === 0 && <div className="text-xs text-slate-400">No funds</div>}
                    {fundsForDept.map((f, idx) => (
                      <div key={idx} className="p-2 border rounded flex justify-between">
                        <div>
                          <div className="text-sm font-medium">{f.category || f.Category || "Donation"}</div>
                          <div className="text-xs text-slate-500">
                            {f.purpose || f.Purpose || ""} • {f.date || f.Date || ""}
                          </div>
                        </div>
                        <div className="font-medium">₹ {parseFloat(f.amount || f.Amount || 0).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-sm font-medium">
                    Total: ₹ {totalFundsReceived.toLocaleString()}
                  </div>
                </div>

                {/* Activities */}
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Activities</div>
                  <div className="max-h-28 overflow-auto mt-2 space-y-2">
                    {activitiesForDept.length === 0 && <div className="text-xs text-slate-400">No activities</div>}
                    {activitiesForDept.map((act, idx) => (
                      <div key={idx} className="p-2 border rounded">
                        <div className="text-sm font-medium">{act.title || act.Title || act.activity || "—"}</div>
                        <div className="text-xs text-slate-500">
                          {act.date || act.Date || ""} • {act.organizer || act.Organizer || ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
            }

"use client";

import { useState } from "react";
const SAMPLE_CLIENTS = [
  { id: 1, name: "Hartwell Bakery", contact: "Susan Hartwell", email: "susan@hartwellbakery.com", phone: "(512) 334-7821", status: "active", value: 4200, lastContact: "2026-06-22", tags: ["recurring", "priority"] },
  { id: 2, name: "Riverbend Landscaping", contact: "Marco Delgado", email: "marco@riverbend.com", phone: "(737) 891-2240", status: "lead", value: 1800, lastContact: "2026-06-25", tags: ["new"] },
  { id: 3, name: "Pinnacle Gym", contact: "Tara Okonkwo", email: "tara@pinnaclegym.com", phone: "(512) 774-0033", status: "active", value: 9600, lastContact: "2026-06-18", tags: ["recurring", "high-value"] },
  { id: 4, name: "Mesa Coffee Roasters", contact: "Jin Park", email: "jin@mesacoffee.com", phone: "(512) 229-4417", status: "inactive", value: 650, lastContact: "2026-04-10", tags: [] },
  { id: 5, name: "Clearwater Plumbing", contact: "Dave Trevino", email: "dave@clearwaterplumb.com", phone: "(830) 442-9901", status: "lead", value: 2400, lastContact: "2026-06-27", tags: ["new", "priority"] },
  { id: 6, name: "Solano Auto Detail", contact: "Rita Solano", email: "rita@solanoauto.com", phone: "(512) 558-3344", status: "active", value: 3100, lastContact: "2026-06-20", tags: ["recurring"] },
];

const SAMPLE_JOBS = [
  { id: 1, clientId: 1, title: "Monthly website update", status: "in_progress", due: "2026-07-05", amount: 350 },
  { id: 2, clientId: 3, title: "New client portal setup", status: "scheduled", due: "2026-07-10", amount: 1200 },
  { id: 3, clientId: 5, title: "Lead intake form build", status: "scheduled", due: "2026-07-08", amount: 800 },
  { id: 4, clientId: 6, title: "Booking system fix", status: "completed", due: "2026-06-28", amount: 275 },
  { id: 5, clientId: 2, title: "Landing page redesign", status: "quoted", due: "2026-07-15", amount: 1800 },
];

const STATUS_CONFIG = {
  active:    { label: "Active",    color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  lead:      { label: "Lead",      color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  inactive:  { label: "Inactive",  color: "#6b7280", bg: "rgba(107,114,128,0.12)" },
};

const JOB_STATUS_CONFIG = {
  in_progress: { label: "In Progress", color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  scheduled:   { label: "Scheduled",   color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
  completed:   { label: "Completed",   color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  quoted:      { label: "Quoted",      color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
};

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "⬡" },
  { id: "clients",   label: "Clients",   icon: "◈" },
  { id: "jobs",      label: "Jobs",      icon: "◇" },
];

function Badge({ status, config }) {
  const cfg = config[status] || { label: status, color: "#6b7280", bg: "rgba(107,114,128,0.12)" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
      letterSpacing: "0.04em", textTransform: "uppercase",
      color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}33`
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.color, display: "inline-block" }} />
      {cfg.label}
    </span>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: "#111318", border: "1px solid #1e2028",
      borderRadius: 14, padding: "22px 24px",
      display: "flex", flexDirection: "column", gap: 6,
      position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${accent}, transparent)`
      }} />
      <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
      <span style={{ fontSize: 28, fontWeight: 700, color: "#f4f4f5", fontFamily: "'DM Mono', monospace" }}>{value}</span>
      {sub && <span style={{ fontSize: 12, color: "#6b7280" }}>{sub}</span>}
    </div>
  );
}

function Dashboard({ clients, jobs }) {
  const active = clients.filter(c => c.status === "active").length;
  const leads = clients.filter(c => c.status === "lead").length;
  const totalValue = clients.reduce((s, c) => s + c.value, 0);
  const openJobs = jobs.filter(j => j.status !== "completed").length;
  const recentJobs = [...jobs].sort((a,b) => new Date(b.due) - new Date(a.due)).slice(0, 4);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f4f4f5", margin: 0 }}>Good morning</h2>
        <p style={{ color: "#6b7280", margin: "4px 0 0", fontSize: 14 }}>Here is where things stand today.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        <StatCard label="Active Clients" value={active} accent="#3b82f6" sub={`${leads} leads in pipeline`} />
        <StatCard label="Open Jobs" value={openJobs} accent="#8b5cf6" sub="across all clients" />
        <StatCard label="Client Lifetime Value" value={`$${totalValue.toLocaleString()}`} accent="#22c55e" sub="total across all accounts" />
        <StatCard label="Total Clients" value={clients.length} accent="#f59e0b" sub="active, leads and inactive" />
      </div>
      <div style={{ background: "#111318", border: "1px solid #1e2028", borderRadius: 14, padding: 24 }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 18px" }}>Upcoming Jobs</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {recentJobs.map(job => {
            const client = clients.find(c => c.id === job.clientId);
            return (
              <div key={job.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 14px", background: "#0d0f14", borderRadius: 10, border: "1px solid #1a1d24"
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#e4e4e7" }}>{job.title}</span>
                  <span style={{ fontSize: 12, color: "#6b7280" }}>{client?.name} · Due {job.due}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Badge status={job.status} config={JOB_STATUS_CONFIG} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#f4f4f5", fontFamily: "'DM Mono', monospace" }}>${job.amount}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ClientRow({ client, onClick, selected }) {
  return (
    <div onClick={onClick} style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 16px", borderRadius: 10, cursor: "pointer",
      background: selected ? "#161920" : "transparent",
      border: `1px solid ${selected ? "#2a2d38" : "transparent"}`,
      transition: "all 0.15s ease"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `hsl(${(client.id * 67) % 360}, 40%, 20%)`,
          border: `1px solid hsl(${(client.id * 67) % 360}, 50%, 30%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: `hsl(${(client.id * 67) % 360}, 70%, 70%)`
        }}>
          {client.name[0]}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e4e4e7" }}>{client.name}</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>{client.contact}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Badge status={client.status} config={STATUS_CONFIG} />
        <span style={{ fontSize: 13, fontWeight: 700, color: "#f4f4f5", fontFamily: "'DM Mono', monospace", minWidth: 60, textAlign: "right" }}>
          ${client.value.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function ClientDetail({ client, jobs }) {
  const clientJobs = jobs.filter(j => j.clientId === client.id);
  return (
    <div style={{
      background: "#111318", border: "1px solid #1e2028",
      borderRadius: 14, padding: 24, display: "flex", flexDirection: "column", gap: 20
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: `hsl(${(client.id * 67) % 360}, 40%, 20%)`,
            border: `1px solid hsl(${(client.id * 67) % 360}, 50%, 30%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 700, color: `hsl(${(client.id * 67) % 360}, 70%, 70%)`
          }}>
            {client.name[0]}
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#f4f4f5" }}>{client.name}</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>{client.contact}</div>
          </div>
        </div>
        <Badge status={client.status} config={STATUS_CONFIG} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { label: "Email", value: client.email },
          { label: "Phone", value: client.phone },
          { label: "Lifetime Value", value: `$${client.value.toLocaleString()}` },
          { label: "Last Contact", value: client.lastContact },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1a1d24" }}>
            <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>{label}</span>
            <span style={{ fontSize: 13, color: "#e4e4e7", fontFamily: label === "Lifetime Value" ? "'DM Mono', monospace" : "inherit" }}>{value}</span>
          </div>
        ))}
      </div>
      {clientJobs.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Jobs</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {clientJobs.map(job => (
              <div key={job.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 12px", background: "#0d0f14", borderRadius: 8, border: "1px solid #1a1d24"
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#e4e4e7" }}>{job.title}</div>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>Due {job.due}</div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <Badge status={job.status} config={JOB_STATUS_CONFIG} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#f4f4f5", fontFamily: "'DM Mono', monospace" }}>${job.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {client.tags?.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {client.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 11, padding: "3px 10px", borderRadius: 20,
              background: "#1a1d24", color: "#9ca3af", border: "1px solid #2a2d38", fontWeight: 500
            }}>#{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function ClientsView({ clients, jobs }) {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = clients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.contact.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.status === filter;
    return matchSearch && matchFilter;
  });

  const selectedClient = clients.find(c => c.id === selected);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f4f4f5", margin: 0 }}>Clients</h2>
        <p style={{ color: "#6b7280", margin: "4px 0 0", fontSize: 14 }}>{clients.length} total</p>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..."
          style={{ flex: 1, background: "#111318", border: "1px solid #1e2028", borderRadius: 10, padding: "10px 14px", color: "#e4e4e7", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
        <select value={filter} onChange={e => setFilter(e.target.value)}
          style={{ background: "#111318", border: "1px solid #1e2028", borderRadius: 10, padding: "10px 14px", color: "#9ca3af", fontSize: 13, outline: "none", fontFamily: "inherit", cursor: "pointer" }}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="lead">Leads</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {filtered.map(client => (
          <ClientRow key={client.id} client={client} selected={selected === client.id}
            onClick={() => setSelected(selected === client.id ? null : client.id)} />
        ))}
      </div>
      {selectedClient && <ClientDetail client={selectedClient} jobs={jobs} />}
    </div>
  );
}

function JobsView({ jobs, clients }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? jobs : jobs.filter(j => j.status === filter);
  const sorted = [...filtered].sort((a, b) => new Date(a.due) - new Date(b.due));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f4f4f5", margin: 0 }}>Jobs</h2>
        <p style={{ color: "#6b7280", margin: "4px 0 0", fontSize: 14 }}>{jobs.length} total</p>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["all", "scheduled", "in_progress", "quoted", "completed"].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: "7px 14px", borderRadius: 20, border: "1px solid",
            borderColor: filter === s ? "#3b82f6" : "#1e2028",
            background: filter === s ? "rgba(59,130,246,0.12)" : "#111318",
            color: filter === s ? "#3b82f6" : "#6b7280",
            fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize",
            letterSpacing: "0.03em", fontFamily: "inherit"
          }}>
            {s === "all" ? "All" : JOB_STATUS_CONFIG[s]?.label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sorted.map(job => {
          const client = clients.find(c => c.id === job.clientId);
          return (
            <div key={job.id} style={{
              background: "#111318", border: "1px solid #1e2028", borderRadius: 12, padding: "16px 18px",
              display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#e4e4e7" }}>{job.title}</span>
                <span style={{ fontSize: 12, color: "#6b7280" }}>{client?.name} · Due {job.due}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Badge status={job.status} config={JOB_STATUS_CONFIG} />
                <span style={{ fontSize: 15, fontWeight: 700, color: "#f4f4f5", fontFamily: "'DM Mono', monospace", minWidth: 64, textAlign: "right" }}>
                  ${job.amount}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CRMDemo() {
  const [view, setView] = useState("dashboard");
  const [clients] = useState(SAMPLE_CLIENTS);
  const [jobs] = useState(SAMPLE_JOBS);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0c10", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #4b5563; }
        select option { background: #111318; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a2d38; border-radius: 3px; }
      `}</style>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 24px", borderBottom: "1px solid #1e2028",
        background: "#0d0f14", position: "sticky", top: 0, zIndex: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 800, color: "#fff"
          }}>C</div>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#f4f4f5", letterSpacing: "-0.02em" }}>ClientBase</span>
          <span style={{
            fontSize: 10, padding: "2px 7px", borderRadius: 20,
            background: "rgba(59,130,246,0.15)", color: "#3b82f6",
            border: "1px solid rgba(59,130,246,0.3)", fontWeight: 600, letterSpacing: "0.05em"
          }}>DEMO</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 4, padding: "12px 24px", borderBottom: "1px solid #1e2028", background: "#0d0f14" }}>
        {NAV_ITEMS.map(item => (
          <button key={item.id} onClick={() => setView(item.id)} style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer",
            background: view === item.id ? "#161920" : "transparent",
            color: view === item.id ? "#f4f4f5" : "#6b7280",
            fontSize: 13, fontWeight: 600, fontFamily: "inherit",
            borderBottom: view === item.id ? "2px solid #3b82f6" : "2px solid transparent",
            transition: "all 0.15s ease"
          }}>
            <span style={{ fontSize: 12 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, padding: "24px", maxWidth: 720, width: "100%", margin: "0 auto" }}>
        {view === "dashboard" && <Dashboard clients={clients} jobs={jobs} />}
        {view === "clients" && <ClientsView clients={clients} jobs={jobs} />}
        {view === "jobs" && <JobsView jobs={jobs} clients={clients} />}
      </div>
    </div>
  );
}

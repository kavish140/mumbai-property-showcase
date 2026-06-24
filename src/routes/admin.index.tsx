import { createFileRoute } from "@tanstack/react-router";
import { Users, Building, Home, CheckCircle } from "lucide-react";
import { useProperties } from "@/hooks/use-properties";
import { useLeads } from "@/hooks/use-leads";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { properties, isLoading: propsLoading } = useProperties();
  const { leads, isLoading: leadsLoading } = useLeads();

  const totalProps = properties.length;
  const availProps = properties.filter((p) => p.status === "Available").length;
  const soldProps = properties.filter((p) => p.status === "Sold").length;
  const totalLeads = leads.length;

  const recentLeads = leads.slice(0, 5);

  const stats = [
    { label: "Total Properties", value: totalProps, icon: Building },
    { label: "Available", value: availProps, icon: Home },
    { label: "Sold", value: soldProps, icon: CheckCircle },
    { label: "Total Leads", value: totalLeads, icon: Users },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back. Here's an overview of your real estate business.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <s.icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">{s.label}</div>
              <div className="font-display text-2xl font-bold">
                {propsLoading || leadsLoading ? "-" : s.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="border-b border-border p-6">
          <h2 className="font-display text-lg font-bold">Recent Leads</h2>
        </div>
        <div className="divide-y divide-border">
          {leadsLoading ? (
            <div className="p-6 text-center text-sm text-muted-foreground">Loading leads...</div>
          ) : recentLeads.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No leads received yet.
            </div>
          ) : (
            recentLeads.map((l) => (
              <div key={l.id} className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-semibold">{l.name}</div>
                  <div className="text-sm text-muted-foreground">{l.email} {l.phone ? `· ${l.phone}` : ''}</div>
                  <div className="mt-1 text-sm">{l.message}</div>
                </div>
                <div className="mt-3 sm:mt-0">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      l.status === "New"
                        ? "bg-blue-100 text-blue-800"
                        : l.status === "Contacted"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {l.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

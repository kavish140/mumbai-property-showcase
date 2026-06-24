import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { Trash2, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLeads } from "@/hooks/use-leads";
import type { LeadStatus } from "@/types/lead";

export const Route = createFileRoute("/admin/leads")({
  head: () => ({
    meta: [{ title: "Leads · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: LeadsPage,
});

function LeadsPage() {
  const { leads, isLoading, updateLeadStatus, deleteLead } = useLeads();

  async function handleStatusChange(id: string, status: LeadStatus) {
    try {
      await updateLeadStatus(id, status);
      toast.success("Lead status updated");
    } catch (error) {
      toast.error("Failed to update status");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteLead(id);
      toast.success("Lead deleted");
    } catch (error) {
      toast.error("Failed to delete lead");
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Leads</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {leads.length} total inquiries from the website
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="w-40">Status</TableHead>
              <TableHead className="w-16 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-16 text-center text-sm text-muted-foreground">
                  Loading leads...
                </TableCell>
              </TableRow>
            ) : leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-16 text-center text-sm text-muted-foreground">
                  No leads received yet.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((l) => (
                <TableRow key={l.id} className="hover:bg-muted/30">
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {format(new Date(l.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{l.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3.5 w-3.5" />
                        <a href={`mailto:${l.email}`} className="hover:text-foreground hover:underline">
                          {l.email}
                        </a>
                      </div>
                      {l.phone && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3.5 w-3.5" />
                          <a href={`tel:${l.phone}`} className="hover:text-foreground hover:underline">
                            {l.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="max-w-xs whitespace-normal break-words text-sm text-muted-foreground">
                      {l.message}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={l.status}
                      onValueChange={(val) => handleStatusChange(l.id, val as LeadStatus)}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Contacted">Contacted</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(l.id)}
                      aria-label="Delete"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

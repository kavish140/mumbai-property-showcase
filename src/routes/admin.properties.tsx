import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useProperties } from "@/hooks/use-properties";
import { formatINR, type Property, type PropertyStatus } from "@/types/property";
import { PropertyDialog } from "@/components/admin/PropertyDialog";

export const Route = createFileRoute("/admin/properties")({
  head: () => ({
    meta: [
      { title: "Properties · Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: PropertiesPage,
});

const statusStyle: Record<PropertyStatus, string> = {
  Available: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  Pending: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  Sold: "bg-muted text-muted-foreground border-border",
};

function PropertiesPage() {
  const { properties, addProperty, updateProperty, deleteProperty } = useProperties();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Property | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function openAdd() { setEditing(null); setDialogOpen(true); }
  function openEdit(p: Property) { setEditing(p); setDialogOpen(true); }

  async function handleSave(data: Omit<Property, "id">) {
    try {
      if (editing) {
        await updateProperty(editing.id, data);
        toast.success("Property updated");
      } else {
        await addProperty(data);
        toast.success("Property added");
      }
      setDialogOpen(false);
      setEditing(null);
    } catch (err) {
      toast.error("Failed to save property");
    }
  }

  async function confirmDelete() {
    if (!deletingId) return;
    try {
      await deleteProperty(deletingId);
      toast.success("Property deleted");
    } catch (err) {
      toast.error("Failed to delete property");
    }
    setDeletingId(null);
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Properties</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {properties.length} listings · changes persist in your browser
          </p>
        </div>
        <Button onClick={openAdd} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Add Property
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-20">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-28 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((p) => (
              <TableRow key={p.id} className="hover:bg-muted/30">
                <TableCell>
                  <img src={p.imageUrl} alt="" className="h-12 w-16 rounded-md object-cover" loading="lazy" />
                </TableCell>
                <TableCell>
                  <div className="font-medium text-foreground">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{p.type} · {p.bedrooms > 0 ? `${p.bedrooms} bd · ` : ""}{p.areaSqft.toLocaleString()} sqft</div>
                </TableCell>
                <TableCell className="text-muted-foreground">{p.location}</TableCell>
                <TableCell className="text-right font-medium">{formatINR(p.price)}</TableCell>
                <TableCell>
                  <Badge className={`border ${statusStyle[p.status]}`}>{p.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(p)} aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingId(p.id)}
                      aria-label="Delete"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {properties.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-16 text-center text-sm text-muted-foreground">
                  No properties yet. Click "Add Property" to create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PropertyDialog
        open={dialogOpen}
        onOpenChange={(o) => { setDialogOpen(o); if (!o) setEditing(null); }}
        editing={editing}
        onSave={handleSave}
      />

      <AlertDialog open={!!deletingId} onOpenChange={(o) => !o && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this property?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the listing from your admin. The action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

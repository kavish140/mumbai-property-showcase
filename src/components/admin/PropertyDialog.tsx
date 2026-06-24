import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Property, PropertyStatus, PropertyType } from "@/types/property";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: Property | null;
  onSave: (data: Omit<Property, "id">) => void;
}

const empty: Omit<Property, "id"> = {
  title: "",
  location: "",
  price: 0,
  type: "Residential",
  status: "Available",
  bedrooms: 0,
  bathrooms: 0,
  areaSqft: 0,
  description: "",
  imageUrl: "",
  youtubeUrl: "",
};

export function PropertyDialog({ open, onOpenChange, editing, onSave }: Props) {
  const [form, setForm] = useState<Omit<Property, "id">>(empty);

  useEffect(() => {
    if (open) setForm(editing ? { ...editing } : empty);
  }, [open, editing]);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.location.trim() || !form.imageUrl.trim()) {
      toast.error("Title, location, and image URL are required.");
      return;
    }
    if (form.price <= 0 || form.areaSqft <= 0) {
      toast.error("Price and area must be greater than zero.");
      return;
    }
    if (form.bedrooms < 0 || form.bathrooms < 0) {
      toast.error("Bedrooms and bathrooms cannot be negative.");
      return;
    }
    onSave(form);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {editing ? "Edit property" : "Add new property"}
          </DialogTitle>
          <DialogDescription>
            {editing
              ? "Update the listing details below."
              : "Fill in the listing details. All fields except bedrooms (for commercial) are required."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="grid gap-4 py-2 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Sea-View Penthouse"
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Location</Label>
            <Input
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="Bandra West, Mumbai"
            />
          </div>
          <div>
            <Label>Price (₹)</Label>
            <Input
              type="number"
              min={0}
              value={form.price || ""}
              onChange={(e) => update("price", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Area (sqft)</Label>
            <Input
              type="number"
              min={0}
              value={form.areaSqft || ""}
              onChange={(e) => update("areaSqft", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Type</Label>
            <Select value={form.type} onValueChange={(v) => update("type", v as PropertyType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Residential">Residential</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
                <SelectItem value="Luxury">Luxury</SelectItem>
                <SelectItem value="Land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => update("status", v as PropertyStatus)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Bedrooms</Label>
            <Input
              type="number"
              min={0}
              value={form.bedrooms}
              onChange={(e) => update("bedrooms", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Bathrooms</Label>
            <Input
              type="number"
              min={0}
              value={form.bathrooms}
              onChange={(e) => update("bathrooms", Number(e.target.value))}
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Image URL</Label>
            <Input
              value={form.imageUrl}
              onChange={(e) => update("imageUrl", e.target.value)}
              placeholder="https://images.unsplash.com/…"
            />
          </div>
          <div className="sm:col-span-2">
            <Label>YouTube Video URL (Optional)</Label>
            <Input
              value={form.youtubeUrl || ""}
              onChange={(e) => update("youtubeUrl", e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Description</Label>
            <Textarea
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Short description for the listing card…"
            />
          </div>

          <DialogFooter className="sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {editing ? "Save changes" : "Add property"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{children}</label>
  );
}

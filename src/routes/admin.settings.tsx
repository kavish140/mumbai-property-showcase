import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSettings } from "@/hooks/use-settings";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [{ title: "Settings · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { settings, isLoading, updateSetting } = useSettings();
  const [saving, setSaving] = useState<string | null>(null);
  
  // Group settings for layout
  const groups = settings.reduce((acc, curr) => {
    const g = curr.group || "other";
    if (!acc[g]) acc[g] = [];
    acc[g].push(curr);
    return acc;
  }, {} as Record<string, typeof settings>);

  const handleSave = async (key: string, value: string) => {
    setSaving(key);
    try {
      await updateSetting(key, value);
      toast.success("Setting updated successfully.");
    } catch (error) {
      toast.error("Failed to update setting.");
    } finally {
      setSaving(null);
    }
  };

  const groupTitles: Record<string, string> = {
    company: "Company Information",
    contact: "Contact Details",
    social: "Social Media Links",
    other: "Other Settings",
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20">
      <div>
        <h1 className="font-display text-3xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your public website information and preferences.
        </p>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-sm text-muted-foreground">Loading settings...</div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groups).map(([group, groupSettings]) => (
            <div key={group} className="rounded-xl border border-border bg-card shadow-sm">
              <div className="border-b border-border bg-muted/30 px-6 py-4">
                <h2 className="font-display text-lg font-bold">{groupTitles[group] || group}</h2>
              </div>
              <div className="divide-y divide-border">
                {groupSettings.map((s) => (
                  <SettingRow key={s.key} setting={s} onSave={handleSave} isSaving={saving === s.key} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SettingRow({
  setting,
  onSave,
  isSaving,
}: {
  setting: { key: string; value: string; label: string | null };
  onSave: (k: string, v: string) => void;
  isSaving: boolean;
}) {
  const [val, setVal] = useState(setting.value);
  const isDirty = val !== setting.value;

  return (
    <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="sm:w-1/3">
        <Label htmlFor={setting.key} className="text-sm font-medium">
          {setting.label || setting.key}
        </Label>
        <p className="mt-1 text-xs text-muted-foreground font-mono">{setting.key}</p>
      </div>
      <div className="flex flex-1 items-center gap-3">
        <Input
          id={setting.key}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="flex-1"
        />
        <Button
          onClick={() => onSave(setting.key, val)}
          disabled={!isDirty || isSaving}
          size="sm"
          className={isDirty ? "bg-primary" : "bg-muted text-muted-foreground opacity-50"}
        >
          {isSaving ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save</>}
        </Button>
      </div>
    </div>
  );
}

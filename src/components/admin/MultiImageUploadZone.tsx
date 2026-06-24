import { useRef, useState, useCallback, useEffect, type DragEvent } from "react";
import { UploadCloud, X, Loader2, Plus, GripVertical } from "lucide-react";
import { toast } from "sonner";
import { uploadPropertyImage } from "@/lib/supabase";

interface Props {
  value: string[]; // array of image URLs
  onChange: (urls: string[]) => void;
  disabled?: boolean;
}

const ACCEPTED = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

export function MultiImageUploadZone({ value = [], onChange, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingCount, setUploadingCount] = useState(0);

  // ── upload helper ──────────────────────────────────────────
  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const validFiles = Array.from(files).filter((file) => {
        if (!ACCEPTED.includes(file.type)) {
          toast.error(`Invalid file type: ${file.name}`);
          return false;
        }
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`File too large: ${file.name}`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      setUploadingCount((c) => c + validFiles.length);

      const newUrls: string[] = [];
      for (const file of validFiles) {
        try {
          const url = await uploadPropertyImage(file);
          newUrls.push(url);
        } catch (err: unknown) {
          toast.error(`Failed to upload ${file.name}: ${err instanceof Error ? err.message : "Unknown error"}`);
        }
      }

      setUploadingCount((c) => Math.max(0, c - validFiles.length));

      if (newUrls.length > 0) {
        onChange([...value, ...newUrls]);
        toast.success(`Uploaded ${newUrls.length} image(s)`);
      }
    },
    [onChange, value]
  );

  // ── drag handlers ──────────────────────────────────────────
  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }
  function onDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }
  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }

  // ── paste handler (window-level so it catches Ctrl+V) ──────
  useEffect(() => {
    function onPaste(e: globalThis.ClipboardEvent) {
      const items = Array.from(e.clipboardData?.items ?? []);
      const imageItems = items.filter((i) => i.kind === "file" && i.type.startsWith("image/"));
      const files = imageItems.map((i) => i.getAsFile()).filter((f): f is File => f !== null);
      if (files.length > 0) handleFiles(files);
    }
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [handleFiles]);

  // ── remove image ───────────────────────────────────────────
  function removeImage(indexToRemove: number, e: React.MouseEvent) {
    e.stopPropagation();
    onChange(value.filter((_, idx) => idx !== indexToRemove));
  }

  return (
    <div className="space-y-3">
      {/* Grid of uploaded images */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {value.map((url, idx) => (
          <div key={idx} className="group relative aspect-video overflow-hidden rounded-lg border border-border bg-muted">
            <img src={url} alt={`Gallery image ${idx + 1}`} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
            
            <button
              type="button"
              onClick={(e) => removeImage(idx, e)}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive/90 text-white opacity-0 transition-opacity hover:bg-destructive group-hover:opacity-100"
            >
              <X className="h-3 w-3" />
            </button>
            <div className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
              {idx + 1}
            </div>
          </div>
        ))}

        {/* Add more button / Drop zone */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => !disabled && inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={[
            "relative flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-200 select-none overflow-hidden",
            isDragging
              ? "border-primary bg-primary/10 scale-[1.02]"
              : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/60",
            disabled ? "cursor-not-allowed opacity-60" : "",
          ].join(" ")}
        >
          {uploadingCount > 0 ? (
            <div className="flex flex-col items-center gap-1 text-primary">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-[10px] font-medium">Uploading {uploadingCount}…</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <Plus className="h-5 w-5" />
              <span className="text-[10px] font-medium">Add photos</span>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED.join(",")}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
          e.target.value = ''; // reset so the same file can be chosen again
        }}
      />
    </div>
  );
}

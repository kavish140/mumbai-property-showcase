import { useRef, useState, useCallback, useEffect, type DragEvent, type ClipboardEvent } from "react";
import { ImageIcon, UploadCloud, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { uploadPropertyImage } from "@/lib/supabase";

interface Props {
  value: string;          // current imageUrl
  onChange: (url: string) => void;
  disabled?: boolean;
}

const ACCEPTED = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

export function ImageUploadZone({ value, onChange, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // ── upload helper ──────────────────────────────────────────
  const handleFile = useCallback(
    async (file: File) => {
      if (!ACCEPTED.includes(file.type)) {
        toast.error("Only JPEG, PNG, WebP, and GIF images are supported.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image must be smaller than 10 MB.");
        return;
      }

      setIsUploading(true);
      try {
        const url = await uploadPropertyImage(file);
        onChange(url);
        toast.success("Image uploaded!");
      } catch (err: unknown) {
        toast.error(`Upload failed: ${err instanceof Error ? err.message : "Unknown error"}`);
      } finally {
        setIsUploading(false);
      }
    },
    [onChange]
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
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  // ── paste handler (window-level so it catches Ctrl+V anywhere in the dialog) ──
  useEffect(() => {
    function onPaste(e: globalThis.ClipboardEvent) {
      const items = Array.from(e.clipboardData?.items ?? []);
      const imageItem = items.find((i) => i.kind === "file" && i.type.startsWith("image/"));
      if (imageItem) {
        const file = imageItem.getAsFile();
        if (file) handleFile(file);
      }
    }
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [handleFile]);

  // ── clear ──────────────────────────────────────────────────
  function clear(e: React.MouseEvent) {
    e.stopPropagation();
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-2">
      {/* Drop zone / preview */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload image"
        onClick={() => !disabled && !isUploading && inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={[
          "relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-200 select-none overflow-hidden",
          isDragging
            ? "border-primary bg-primary/10 scale-[1.01]"
            : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/60",
          disabled ? "cursor-not-allowed opacity-60" : "",
        ].join(" ")}
      >
        {/* uploading spinner */}
        {isUploading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-background/80 backdrop-blur-sm">
            <Loader2 className="h-7 w-7 animate-spin text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Uploading…</span>
          </div>
        )}

        {value ? (
          // Preview
          <>
            <img
              src={value}
              alt="Property preview"
              className="h-full w-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <UploadCloud className="h-7 w-7 text-white" />
              <span className="text-sm font-semibold text-white">Replace image</span>
              <span className="text-xs text-white/80">Drag, click, or paste</span>
            </div>
            {/* Remove button */}
            <button
              type="button"
              onClick={clear}
              aria-label="Remove image"
              className="absolute top-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-destructive transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          // Empty state
          <div className="flex flex-col items-center gap-3 p-6 text-center pointer-events-none">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              {isDragging
                ? <UploadCloud className="h-6 w-6 text-primary animate-bounce" />
                : <ImageIcon className="h-6 w-6 text-primary" />
              }
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {isDragging ? "Drop it here!" : "Upload property photo"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Drag & drop · Click to browse · Ctrl+V to paste
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                JPEG, PNG, WebP — up to 10 MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {/* URL fallback input */}
      <div className="flex items-center gap-2">
        <span className="shrink-0 text-xs text-muted-foreground">Or paste URL:</span>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="h-8 w-full rounded-md border border-border bg-background px-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>
  );
}

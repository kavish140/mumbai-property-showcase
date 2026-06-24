import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/site/PublicLayout";
import { useEffect, useState } from "react";
import { getProperty } from "@/lib/supabase";
import type { Property } from "@/types/property";
import { Bath, BedDouble, MapPin, Square, ArrowLeft } from "lucide-react";
import { formatINR } from "@/types/property";

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export const Route = createFileRoute("/properties/$id")({
  component: PropertyDetailPage,
});

function PropertyDetailPage() {
  const { id } = Route.useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProperty(id).then((p) => {
      setProperty(p);
      setLoading(false);
    });
  }, [id]);

  const [activeMedia, setActiveMedia] = useState<{ type: "video" | "image"; url: string } | null>(null);

  // Set default active media when property loads
  useEffect(() => {
    if (property) {
      if (property.youtubeUrl) {
        setActiveMedia({ type: "video", url: property.youtubeUrl });
      } else {
        setActiveMedia({ type: "image", url: property.imageUrl });
      }
    }
  }, [property]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="py-24 text-center text-muted-foreground animate-pulse">
          Loading property details...
        </div>
      </PublicLayout>
    );
  }

  if (!property) {
    return (
      <PublicLayout>
        <div className="py-24 text-center">
          <h1 className="text-2xl font-bold">Property not found.</h1>
          <Link to="/properties" className="mt-4 inline-block text-accent hover:underline">
            ← Back to all properties
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const allImages = [property.imageUrl, ...(property.gallery || [])];

  return (
    <PublicLayout>
      <div className="container py-24">
        <Link
          to="/properties"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to properties
        </Link>

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            {/* Main Viewer */}
            {activeMedia?.type === "video" ? (
              <div className="w-full overflow-hidden rounded-2xl shadow-card aspect-video relative">
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(activeMedia.url)}`}
                  title={property.title}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <img
                src={activeMedia?.url || property.imageUrl}
                alt={property.title}
                className="w-full rounded-2xl object-cover aspect-[4/3] shadow-card"
              />
            )}

            {/* Thumbnail Strip */}
            {(property.youtubeUrl || allImages.length > 1) && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {property.youtubeUrl && (
                  <button
                    type="button"
                    onClick={() => setActiveMedia({ type: "video", url: property.youtubeUrl! })}
                    className={`relative shrink-0 overflow-hidden rounded-lg border-2 transition-all w-24 h-24 ${
                      activeMedia?.type === "video" ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white pl-1">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                    <img src={property.imageUrl} alt="Video thumbnail" className="w-full h-full object-cover" />
                  </button>
                )}
                {allImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveMedia({ type: "image", url: imgUrl })}
                    className={`shrink-0 overflow-hidden rounded-lg border-2 transition-all w-24 h-24 ${
                      activeMedia?.type === "image" && activeMedia.url === imgUrl
                        ? "border-primary"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
              {property.status} • {property.type}
            </p>
            <h1 className="font-display text-3xl font-semibold md:text-4xl leading-tight">
              {property.title}
            </h1>
            <div className="mt-4 text-2xl font-semibold text-accent">
              {formatINR(property.price)}
            </div>
            <div className="mt-4 flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" /> {property.location}
            </div>

            <div className="mt-8 flex items-center gap-6 border-y border-border py-6 text-sm text-muted-foreground">
              {property.bedrooms > 0 && (
                <span className="flex flex-col gap-1 items-center">
                  <BedDouble className="h-6 w-6 text-foreground" />
                  <span>{property.bedrooms} beds</span>
                </span>
              )}
              <span className="flex flex-col gap-1 items-center">
                <Bath className="h-6 w-6 text-foreground" />
                <span>{property.bathrooms} baths</span>
              </span>
              <span className="flex flex-col gap-1 items-center">
                <Square className="h-6 w-6 text-foreground" />
                <span>{property.areaSqft.toLocaleString()} sqft</span>
              </span>
            </div>

            <div className="mt-8 prose prose-neutral dark:prose-invert">
              <h3>About this property</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

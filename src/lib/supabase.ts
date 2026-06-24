import { createClient } from "@supabase/supabase-js";
import type { Property } from "@/types/property";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching properties:", error);
    return [];
  }

  // Map the database fields (areaSqft, imageUrl) properly if needed, but since we used camelCase in quotes during table creation, it might just match.
  return data as Property[];
}

export async function getProperty(id: string): Promise<Property | null> {
  const { data, error } = await supabase.from("properties").select("*").eq("id", id).single();

  if (error) {
    console.error("Error fetching property:", error);
    return null;
  }

  return data as Property;
}

/**
 * Uploads an image file to Supabase Storage and returns the public URL.
 * Generates a unique filename to avoid collisions.
 */
export async function uploadPropertyImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("property-images")
    .upload(filename, file, { upsert: false, contentType: file.type });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("property-images").getPublicUrl(filename);
  return data.publicUrl;
}

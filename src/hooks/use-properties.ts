import { useState, useEffect } from "react";
import type { Property } from "@/types/property";
import { mockProperties } from "@/data/mockProperties";

const STORAGE_KEY = "re-admin-properties-v1";

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProperties(JSON.parse(raw) as Property[]);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(properties)); } catch {}
  }, [properties, hydrated]);

  return {
    properties,
    addProperty: (p: Omit<Property, "id">) =>
      setProperties((curr) => [{ ...p, id: `p_${Date.now()}` }, ...curr]),
    updateProperty: (id: string, p: Omit<Property, "id">) =>
      setProperties((curr) => curr.map((x) => (x.id === id ? { ...p, id } : x))),
    deleteProperty: (id: string) =>
      setProperties((curr) => curr.filter((x) => x.id !== id)),
  };
}

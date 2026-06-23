import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Property } from "@/types/property";
import { supabase } from "@/lib/supabase";

export function useProperties() {
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Property[];
    },
  });

  const addMutation = useMutation({
    mutationFn: async (p: Omit<Property, "id">) => {
      const { data, error } = await supabase.from("properties").insert([p]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...p }: Partial<Property> & { id: string }) => {
      const { data, error } = await supabase.from("properties").update(p).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("properties").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });

  return {
    properties,
    isLoading,
    addProperty: (p: Omit<Property, "id">) => addMutation.mutateAsync(p),
    updateProperty: (id: string, p: Omit<Property, "id">) => updateMutation.mutateAsync({ id, ...p }),
    deleteProperty: (id: string) => deleteMutation.mutateAsync(id),
  };
}

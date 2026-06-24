import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Lead } from "@/types/lead";
import { supabase } from "@/lib/supabase";

export function useLeads() {
  const queryClient = useQueryClient();

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Lead[];
    },
  });

  const addMutation = useMutation({
    mutationFn: async (l: Omit<Lead, "id" | "created_at" | "status">) => {
      const { data, error } = await supabase.from("leads").insert([l]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Lead["status"] }) => {
      const { data, error } = await supabase
        .from("leads")
        .update({ status })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  return {
    leads,
    isLoading,
    addLead: (l: Omit<Lead, "id" | "created_at" | "status">) => addMutation.mutateAsync(l),
    updateLeadStatus: (id: string, status: Lead["status"]) =>
      updateStatusMutation.mutateAsync({ id, status }),
    deleteLead: (id: string) => deleteMutation.mutateAsync(id),
  };
}

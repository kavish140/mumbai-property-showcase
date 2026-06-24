import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Setting } from "@/types/settings";
import { supabase } from "@/lib/supabase";

export function useSettings() {
  const queryClient = useQueryClient();

  const { data: settings = [], isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("settings").select("*").order("group");
      if (error) throw error;
      return data as Setting[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { data, error } = await supabase
        .from("settings")
        .update({ value })
        .eq("key", key)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  // Helper to get a specific setting value easily
  const getSetting = (key: string, fallback = "") => {
    return settings.find((s) => s.key === key)?.value ?? fallback;
  };

  return {
    settings,
    isLoading,
    getSetting,
    updateSetting: (key: string, value: string) => updateMutation.mutateAsync({ key, value }),
  };
}

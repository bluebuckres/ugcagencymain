"use server";

import { supabase } from "@/lib/supabase";
import type { Service } from "@/types/service";

export async function searchServices(
  query: string,
  niche: string | null
): Promise<Service[]> {
  if (!query.trim()) return [];

  const { data, error } = await supabase.rpc("search_services", {
    query,
    niche: niche ?? null,
  });

  if (error) {
    console.error("[searchServices]", error.message);
    return [];
  }

  return (data as Service[]) ?? [];
}

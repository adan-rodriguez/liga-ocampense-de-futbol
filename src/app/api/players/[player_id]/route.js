import { createClient } from "@/app/utils/supabase/server";

export async function GET(request, { params }) {
  const { player_id } = params;

  const supabase = createClient();

  const { data, error, status } = await supabase
    .from("players")
    .select()
    .eq("player_id", player_id)
    .maybeSingle();

  if (!data || error) {
    return new Response(
      JSON.stringify({ error: "Ocurrió un error. Regresa más tarde." }),
      {
        status: status,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      }
    );
  }

  return new Response(JSON.stringify({ data }), {
    status: status,
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}

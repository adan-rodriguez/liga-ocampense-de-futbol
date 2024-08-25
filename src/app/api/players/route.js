import { playerSchema } from "@/app/lib/schemas";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(request) {
  const url = new URL(request.url);

  const team = url.searchParams.get("team");

  const supabase = createClient();
  const { data, error, status } = await supabase
    .from("players")
    .select("player_id, firstname, lastname")
    .eq("team", team);

  if (error) {
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

export async function POST(request) {
  const body = await request.json();

  const { data: validateData, error: validateError } =
    playerSchema.safeParse(body);

  if (validateError) {
    return new Response(
      JSON.stringify({ error: "Los datos ingresados no se pudieron validar." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      }
    );
  }

  const supabase = createClient();

  const { error: teamError } = await supabase
    .from("teams")
    .select()
    .eq("team_id", validateData.team)
    .single();

  if (teamError) {
    return new Response(
      JSON.stringify({ error: "Los datos ingresados no se pudieron validar." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      }
    );
  }

  const { error, status } = await supabase.from("players").insert(validateData);

  if (error) {
    return new Response(
      JSON.stringify({ error: "Ocurrió un error. Regresa más tarde." }),
      {
        status: status,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      }
    );
  }

  return new Response(
    JSON.stringify({ message: "Jugador creado exitosamente" }),
    {
      status: status,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    }
  );
}

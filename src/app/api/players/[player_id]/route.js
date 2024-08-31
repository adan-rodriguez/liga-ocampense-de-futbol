import { playerSchema } from "@/app/lib/schemas";
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

export async function PUT(request, { params }) {
  const { player_id } = params;
  const body = await request.json();

  const { data, error: validateError } = playerSchema.safeParse(body);

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

  const { error, status } = await supabase
    .from("players")
    .update({
      firstname: data.firstname,
      lastname: data.lastname,
      team: data.team,
      birthdate: data.birthdate,
    })
    .eq("player_id", player_id);

  if (error) {
    return new Response(
      JSON.stringify({ error: "Ocurrió un error. Regresa mas tarde." }),
      {
        status: status,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );
  }

  return new Response(
    JSON.stringify({ message: "Jugador editado exitosamente." }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
}

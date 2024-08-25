import { matchSchema } from "@/app/lib/schemas";
import { createClient } from "@/app/utils/supabase/server";

export async function GET() {
  const supabase = createClient();

  const { data, error, status } = await supabase.from("matches").select();

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
    matchSchema.safeParse(body);

  if (validateError) {
    return new Response(
      JSON.stringify({ error: "Los datos ingresados no se pudieron validar." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      }
    );
  }

  // Ambos deben ser undefined o ambos arrays
  const bothUndefined =
    validateData.data_home_goals === undefined &&
    validateData.data_away_goals === undefined;

  const bothArrays =
    Array.isArray(validateData.data_home_goals) &&
    Array.isArray(validateData.data_away_goals);

  if (!bothUndefined && !bothArrays) {
    return new Response(
      JSON.stringify({ error: "Los datos ingresados no se pudieron validar." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      }
    );
  }

  // Validar que los IDs existen en la base de datos usando Supabase
  const supabase = createClient();

  const [homeResult, awayResult, tournamentResult] = await Promise.all([
    supabase.from("teams").select().eq("team_id", validateData.home).single(),

    supabase.from("teams").select().eq("team_id", validateData.away).single(),

    supabase
      .from("tournaments")
      .select()
      .eq("tournament_id", validateData.tournament)
      .single(),
  ]);

  // Verificar si hubo errores en las respuestas
  if (homeResult.error || awayResult.error || tournamentResult.error) {
    return new Response(
      JSON.stringify({ error: "Los datos ingresados no se pudieron validar." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      }
    );
  }

  // Si todo está bien, crear el partido en la tabla "matches"
  const { error, status } = await supabase.from("matches").insert(validateData);

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
    JSON.stringify({ message: "Partido creado exitosamente" }),
    {
      status: status,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    }
  );
}

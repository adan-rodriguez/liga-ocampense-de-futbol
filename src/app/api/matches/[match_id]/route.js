import { matchSchema } from "@/app/lib/schemas";
import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function GET(request, { params }) {
  const { match_id } = params;

  const supabase = createClient();

  const { data, error, status } = await supabase
    .from("matches")
    .select()
    .eq("match_id", match_id)
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

export async function PATCH(request, { params }) {
  const { match_id } = params;
  let body;

  try {
    body = await request.json();
  } catch (error) {
    return new Response(JSON.stringify({ error: "Solicitud incorrecta" }), {
      status: 400,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
  }

  const { data, error: validateError } = matchSchema.safeParse(body);

  if (validateError) {
    return new Response(JSON.stringify({ error: "Error de validación" }), {
      status: 400,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
  }

  // Ambos deben ser undefined o ambos arrays
  const bothUndefined =
    data.data_home_goals === undefined && data.data_away_goals === undefined;

  const bothArrays =
    Array.isArray(data.data_home_goals) && Array.isArray(data.data_away_goals);

  if (!bothUndefined && !bothArrays) {
    return new Response(JSON.stringify({ error: "Error de validación" }), {
      status: 400,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
  }

  const supabase = createClient();
  const { error, status } = await supabase
    .from("matches")
    .update({
      datetime: data.datetime,
      data_home_goals: data.data_home_goals,
      data_away_goals: data.data_away_goals,
    })
    .eq("match_id", Number(match_id));

  if (error) {
    return new Response(JSON.stringify({ error: "Error de bbdd" }), {
      status: status,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
  }

  revalidatePath("/");

  return new Response(JSON.stringify({ message: "Partido actualizado" }), {
    status: 200,
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}

export async function DELETE(request, { params }) {
  const { match_id } = params;

  const supabase = createClient();
  const { error } = await supabase
    .from("matches")
    .delete()
    .eq("match_id", match_id);

  if (error) {
    return new Response(JSON.stringify({ error: "Error de bbdd" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  }

  revalidatePath("/");

  return new Response(JSON.stringify({ message: "Partido eliminado" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}

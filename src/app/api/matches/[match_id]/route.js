import { matchSchema } from "@/app/lib/schemas";
import { createClient } from "@/app/utils/supabase/server";

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
    console.log(error);
    return new Response(JSON.stringify({ error: "Solicitud incorrecta" }), {
      status: 400,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
  }

  const { data, error: validateError } = matchSchema.safeParse(body);
  console.log({ data, validateError });

  if (validateError) {
    return new Response(JSON.stringify({ error: "Error de validación" }), {
      status: 400,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
  }

  const supabase = createClient();
  const { error, status } = await supabase
    .from("matches")
    .update(data)
    .eq("match_id", match_id);
  console.log({ error, status });

  if (error) {
    return new Response(JSON.stringify({ error: "Error de bbdd" }), {
      status: status,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
  }

  return new Response(JSON.stringify({ message: "Partido actualizado" }), {
    status: 204,
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}

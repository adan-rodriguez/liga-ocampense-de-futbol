// import { matches } from "../data/matches";

export async function getMatches() {
  // return { matches };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/matches`
    );
    const { data, error } = await response.json();
    return { matches: data, error };
  } catch (error) {
    return { error: "Ocurrió un error. Regresa más tarde." };
  }
}

export async function getMatch(match_id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/matches/${match_id}`
    );
    const { data, error } = await response.json();
    return { match: data, error };
  } catch (error) {
    return { error: "Ocurrió un error. Regresa más tarde." };
  }
}

export async function deleteMatch(match_id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/matches/${match_id}`,
      { method: "DELETE" }
    );
    const { error } = await response.json();
    return { error };
  } catch (error) {
    return { error: "Ocurrió un error. Regresa más tarde." };
  }
}

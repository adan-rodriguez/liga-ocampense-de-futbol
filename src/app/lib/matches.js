// import { matches } from "../data/matches";

export async function getMatches() {
  // return { matches };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/matches`,
      { next: { tags: ["matches"] } }
    );
    // const response = await fetch("http://localhost:3000/api/matches", {cache: "force-cache"});
    const { data, error } = await response.json();
    return { matches: data, error };
  } catch (error) {
    return { error: "Ocurrió un error. Regresa más tarde." };
  }
}

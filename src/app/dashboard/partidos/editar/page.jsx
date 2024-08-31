import { Match } from "@/app/components/matches/match";
import { getMatches } from "@/app/lib/matches";
import { DeleteBtn } from "./delete-btn";
import Link from "next/link";

export default async function EditMatchesPage() {
  const { matches, error } = await getMatches();

  if (error) return <p>Ocurrió un error. Regresa más tarde</p>;

  return matches.map((match) => (
    <div key={match.match_id}>
      <Match match={match} />
      <Link href={`/dashboard/partidos/editar/${match.match_id}`}>Editar</Link>
      <DeleteBtn match_id={match.match_id} />
    </div>
  ));
}

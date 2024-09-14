import { Match } from "@/app/components/matches/match";
import { getMatches } from "@/app/lib/matches";
import { DeleteBtn } from "./delete-btn";
import Link from "next/link";
import { EditIcon } from "@/app/components/icons";

export default async function EditMatchesPage() {
  const { matches, error } = await getMatches();

  if (error) return <p>Ocurrió un error. Regresa más tarde</p>;

  const sortedMatches = matches.sort(
    (a, b) => new Date(b.datetime) - new Date(a.datetime)
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {sortedMatches.map((match) => (
        <div style={{ position: "relative" }} key={match.match_id}>
          <Match match={match} />
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: "5px",
              right: "5px",
            }}
          >
            <Link href={`/dashboard/partidos/editar/${match.match_id}`}>
              <EditIcon />
            </Link>
            <DeleteBtn match_id={match.match_id} />
          </div>
        </div>
      ))}
    </div>
  );
}

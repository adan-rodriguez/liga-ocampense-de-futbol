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
    <div className="flex flex-col gap-4">
      {sortedMatches.map((match) => (
        <div className="relative" key={match.match_id}>
          <Match match={match} />
          <div className="flex absolute top-[5px] bottom-[5px]">
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

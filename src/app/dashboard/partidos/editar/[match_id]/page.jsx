import { MatchForm } from "@/app/dashboard/match-form";
import { teams } from "@/app/data/teams";
import { getMatch } from "@/app/lib/matches";

export default async function EditMatchPage({ params }) {
  const { match_id } = params;
  const { match } = await getMatch(match_id);
  console.log(match);

  return (
    <div>
      <MatchForm teams={teams} match={match} />
    </div>
  );
}

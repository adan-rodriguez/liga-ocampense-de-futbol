import { teams } from "@/app/data/teams";
import { MatchForm } from "../../match-form";

export default function AddMatchPage() {
  return (
    <div>
      <MatchForm teams={teams} />
    </div>
  );
}

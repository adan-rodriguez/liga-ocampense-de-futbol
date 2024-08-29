import { teams } from "@/app/data/teams";
import { PlayerForm } from "../../player-form";

export default function AddPlayerPage() {
  return (
    <div>
      <PlayerForm teams={teams} />
    </div>
  );
}
